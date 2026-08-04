#!/usr/bin/env bash
#
# Fix the vantiq.fictionally.org redirect loop using DNS permissions alone.
#
# The loop is caused by Cloudflare sitting in the request path on Flexible SSL:
# it fetches the origin over plain HTTP, GitHub Pages answers 301 -> https://,
# and the browser goes round forever. Setting the record to DNS-only (grey cloud)
# removes Cloudflare from the path, so GitHub serves the domain directly over
# HTTPS with its own certificate — which is already issued and covers this host.
#
# Use this when the token has Zone:DNS:Edit but NOT Zone Settings:Edit, which is
# what fix-cloudflare-ssl.sh needs. Either fix works; this one needs less scope.
#
# It is also a prerequisite for the WSL Proxy plan, which requires a grey-clouded
# record so the pop can solve the ACME HTTP-01 challenge.
#
# Usage:
#   export CLOUDFLARE_API_TOKEN=...
#   ./scripts/cloudflare-unproxy.sh                  # dry run
#   ./scripts/cloudflare-unproxy.sh --apply          # grey-cloud, keep content
#   ./scripts/cloudflare-unproxy.sh --apply --target bwalia.github.io
#
# Trade-off: you lose Cloudflare's CDN, caching and DDoS shield in front of the
# site. GitHub Pages has its own CDN, so for a static marketing site this is a
# small loss. To get Cloudflare back later, re-proxy the record AND set SSL/TLS
# mode to Full in the same change — proxied + Flexible is what broke it.

set -euo pipefail

ZONE="${CLOUDFLARE_ZONE:-fictionally.org}"
HOST="${TARGET_HOST:-vantiq.fictionally.org}"
API="https://api.cloudflare.com/client/v4"

APPLY=false
TARGET=""
while [ $# -gt 0 ]; do
  case "$1" in
    --apply) APPLY=true ;;
    --target) shift; TARGET="${1:-}"; [ -n "$TARGET" ] || { echo "--target needs a value" >&2; exit 2; } ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
  shift
done

[ -n "${CLOUDFLARE_API_TOKEN:-}" ] || {
  echo "error: CLOUDFLARE_API_TOKEN is not set." >&2; exit 1; }

auth=(-H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json")
say() { printf '%s\n' "$*"; }
fail() { printf 'error: %s\n' "$*" >&2; exit 1; }

verify=$(curl -sS "${auth[@]}" "$API/user/tokens/verify")
[ "$(jq -r '.success' <<<"$verify")" = "true" ] \
  || fail "token rejected: $(jq -r '.errors[0].message // "unknown"' <<<"$verify")"
say "token: $(jq -r '.result.status' <<<"$verify")"

zone_id="${CLOUDFLARE_ZONE_ID:-}"
if [ -z "$zone_id" ]; then
  zone_id=$(curl -sS "${auth[@]}" "$API/zones?name=$ZONE" | jq -r '.result[0].id // empty')
  [ -n "$zone_id" ] || fail "no zone '$ZONE' visible to this token."
fi
say "zone:  $ZONE ($zone_id)"

recs=$(curl -sS "${auth[@]}" "$API/zones/$zone_id/dns_records?name=$HOST")
[ "$(jq -r '.success' <<<"$recs")" = "true" ] \
  || fail "cannot read DNS records: $(jq -r '.errors[0].message // "unknown"' <<<"$recs")
  This token lacks Zone:DNS:Read. Nothing here will work without it."

count=$(jq -r '.result | length' <<<"$recs")
[ "$count" != "0" ] || fail "no DNS record found for $HOST in $ZONE."

rec_id=$(jq -r '.result[0].id' <<<"$recs")
rec_type=$(jq -r '.result[0].type' <<<"$recs")
rec_content=$(jq -r '.result[0].content' <<<"$recs")
rec_proxied=$(jq -r '.result[0].proxied' <<<"$recs")
say "record: $rec_type $HOST -> $rec_content (proxied=$rec_proxied)"

new_content="${TARGET:-$rec_content}"

# Grey-clouding only helps if the record actually points at GitHub Pages.
case "$new_content" in
  *.github.io|185.199.10[89].153|185.199.11[01].153) ;;
  *)
    say ""
    say "warning: '$new_content' does not look like a GitHub Pages target."
    say "         Once the proxy is off, DNS goes straight there — so it must be"
    say "         github.io or a 185.199.10x.153 address, or the site will break."
    say "         Pass --target bwalia.github.io to point it correctly."
    ;;
esac

if [ "$rec_proxied" = "false" ] && [ "$new_content" = "$rec_content" ]; then
  say "already DNS-only and pointing at $rec_content — nothing to change."
else
  if [ "$APPLY" != "true" ]; then
    say ""
    say "DRY RUN — would change:"
    say "  proxied: $rec_proxied -> false"
    [ "$new_content" != "$rec_content" ] && say "  content: $rec_content -> $new_content"
    say "re-run with --apply to make the change."
    exit 0
  fi
  body=$(jq -cn --arg t "$rec_type" --arg n "$HOST" --arg c "$new_content" \
    '{type:$t, name:$n, content:$c, ttl:1, proxied:false}')
  resp=$(curl -sS -X PUT "${auth[@]}" "$API/zones/$zone_id/dns_records/$rec_id" --data "$body")
  [ "$(jq -r '.success' <<<"$resp")" = "true" ] \
    || fail "Cloudflare rejected the change: $(jq -r '.errors[0].message // "unknown"' <<<"$resp")
  If it says the actor is not authorized, the token lacks Zone:DNS:Edit."
  say "updated: $(jq -r '.result | "\(.type) \(.name) -> \(.content) proxied=\(.proxied)"' <<<"$resp")"
fi

say ""
say "waiting for DNS to move off Cloudflare, then checking the site ..."
for attempt in $(seq 1 12); do
  ips=$(dig +short "$HOST" 2>/dev/null | tr '\n' ' ')
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "https://$HOST/?cb=$attempt" || echo "000")
  say "  attempt $attempt: resolves to [${ips% }] HTTP $code"
  if [ "$code" = "200" ]; then
    title=$(curl -s --max-time 15 "https://$HOST/" | grep -o '<title>[^<]*</title>' || true)
    say ""
    say "the loop is gone."
    [ -n "$title" ] && say "serving: $title"
    exit 0
  fi
  sleep 10
done

say ""
say "not 200 yet. DNS can take a few minutes to propagate — re-run to re-check."
say "If it stays broken:"
say "  - confirm the record now points at bwalia.github.io (--target)"
say "  - GitHub: Settings -> Pages -> Source should be 'GitHub Actions'"
say "  - GitHub: the custom domain should still read $HOST"
exit 1
