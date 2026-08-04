#!/usr/bin/env bash
#
# Fix the vantiq.fictionally.org redirect loop by moving the Cloudflare zone off
# Flexible SSL.
#
# Why this is needed:
#   Flexible makes Cloudflare fetch from the origin over plain HTTP. GitHub Pages
#   has "Enforce HTTPS" on, so it answers HTTP with 301 -> https://. Cloudflare
#   hands that redirect to the browser, the browser retries HTTPS, Cloudflare
#   fetches over HTTP again. Loop. Full makes Cloudflare fetch over HTTPS, GitHub
#   returns 200, and the loop ends.
#
# Usage:
#   export CLOUDFLARE_API_TOKEN=...        # never committed, never echoed
#   ./scripts/fix-cloudflare-ssl.sh                 # dry run, shows what changes
#   ./scripts/fix-cloudflare-ssl.sh --apply         # sets mode to "full"
#   ./scripts/fix-cloudflare-ssl.sh --apply strict  # sets mode to "strict"
#
# Token scope required: Zone -> Zone Settings -> Edit  (on fictionally.org).
#   NOTE this is NOT the same as Zone:DNS:Edit. A DNS-only token will fail here
#   with "Actor is not authorized" — mint a token with Zone Settings:Edit, or
#   just flip it in the dashboard (SSL/TLS -> Overview).
#
# Idempotent: re-running when already correct is a no-op.

set -euo pipefail

ZONE="${CLOUDFLARE_ZONE:-fictionally.org}"
HOST="${TARGET_HOST:-vantiq.fictionally.org}"
API="https://api.cloudflare.com/client/v4"

APPLY=false
MODE="full"
for arg in "$@"; do
  case "$arg" in
    --apply) APPLY=true ;;
    full|strict) MODE="$arg" ;;
    *) echo "unknown argument: $arg" >&2; exit 2 ;;
  esac
done

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "error: CLOUDFLARE_API_TOKEN is not set." >&2
  echo "  export CLOUDFLARE_API_TOKEN=... then re-run." >&2
  exit 1
fi

auth=(-H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" -H "Content-Type: application/json")

say() { printf '%s\n' "$*"; }
fail() { printf 'error: %s\n' "$*" >&2; exit 1; }

# --- token is live -----------------------------------------------------------
verify=$(curl -sS "${auth[@]}" "$API/user/tokens/verify")
[ "$(jq -r '.success' <<<"$verify")" = "true" ] \
  || fail "token rejected: $(jq -r '.errors[0].message // "unknown"' <<<"$verify")"
say "token: $(jq -r '.result.status' <<<"$verify")"

# --- zone --------------------------------------------------------------------
zone_id="${CLOUDFLARE_ZONE_ID:-}"
if [ -z "$zone_id" ]; then
  zones=$(curl -sS "${auth[@]}" "$API/zones?name=$ZONE")
  zone_id=$(jq -r '.result[0].id // empty' <<<"$zones")
  [ -n "$zone_id" ] || fail "no zone '$ZONE' visible to this token. Set CLOUDFLARE_ZONE_ID, or give the token Zone:Zone:Read."
fi
say "zone:  $ZONE ($zone_id)"

# --- current state -----------------------------------------------------------
cur=$(curl -sS "${auth[@]}" "$API/zones/$zone_id/settings/ssl")
if [ "$(jq -r '.success' <<<"$cur")" != "true" ]; then
  fail "cannot read the SSL setting: $(jq -r '.errors[0].message // "unknown"' <<<"$cur")
  The token most likely lacks Zone Settings:Read/Edit. Mint one with that scope,
  or flip it in the dashboard: SSL/TLS -> Overview -> $MODE."
fi
current=$(jq -r '.result.value' <<<"$cur")
say "ssl mode currently: $current"

if [ "$current" = "$MODE" ]; then
  say "already '$MODE' — nothing to change."
else
  if [ "$APPLY" != "true" ]; then
    say ""
    say "DRY RUN — would change ssl mode: $current -> $MODE"
    say "re-run with --apply to make the change."
    exit 0
  fi
  resp=$(curl -sS -X PATCH "${auth[@]}" "$API/zones/$zone_id/settings/ssl" --data "{\"value\":\"$MODE\"}")
  [ "$(jq -r '.success' <<<"$resp")" = "true" ] \
    || fail "Cloudflare rejected the change: $(jq -r '.errors[0].message // "unknown"' <<<"$resp")
  If this says the actor is not authorized, the token lacks Zone Settings:Edit."
  say "ssl mode now: $(jq -r '.result.value' <<<"$resp")"
fi

# --- did it actually fix the site? -------------------------------------------
say ""
say "checking https://$HOST/ (edge caches can take a few seconds) ..."
for attempt in 1 2 3 4 5 6; do
  code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "https://$HOST/?cb=$attempt" || echo "000")
  if [ "$code" = "200" ]; then
    say "  HTTP $code — the loop is gone."
    title=$(curl -s --max-time 15 "https://$HOST/" | grep -o '<title>[^<]*</title>' || true)
    [ -n "$title" ] && say "  serving: $title"
    exit 0
  fi
  say "  attempt $attempt: HTTP $code"
  sleep 5
done

say ""
say "still not 200. Worth checking:"
say "  - Cloudflare 'Always Use HTTPS' / a Page Rule forcing HTTPS"
say "  - GitHub Pages: Settings -> Pages -> Source should be 'GitHub Actions'"
exit 1
