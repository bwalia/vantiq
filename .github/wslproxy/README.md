# WSL Proxy domain registration

Declarative source of truth for the WSL Proxy vhost that fronts
`vanitq.fictionally.org`, plus the workflow that pushes it.

```
.github/wslproxy/
  data/
    rules/<env>/<rule-id>.json        # match + backends
    servers/<env>/host:<domain>.json  # one vhost per file, links to a rule by id
```

Modelled on the same layout in `monitoring-go` and `diy-tax-return-uk`.

## The chain

```
browser
  -> vanitq.fictionally.org        Cloudflare CNAME, DNS-only (grey cloud)
  -> pop0.wslproxy.com             terminates TLS via lua-resty-auto-ssl
  -> http://185.199.10x.153:80     with Host: vanitq.fictionally.org
  -> GitHub Pages                  serves the exported site
```

GitHub Pages routes by `Host`, which is why the server record carries a `Host`
header override. Without it Pages does not know which site the request is for.

## Two prerequisites the workflows cannot do for you

**1. GitHub Pages "Enforce HTTPS" must be OFF** — Settings → Pages, repo admin only.

Every WSL Proxy backend in the fleet is plaintext HTTP to port 80. With Enforce
HTTPS on, GitHub answers port 80 with `301 → https://…`, the browser comes back
through the proxy, and it loops forever. This is the same failure the site hit
behind Cloudflare in Flexible SSL mode — the cause is the HTTP hop, not the edge.

Measured against `185.199.108.153`:

| Request | Result |
| --- | --- |
| HTTP :80, `Host: vanitq.fictionally.org` | 301 (with Enforce HTTPS on) |
| HTTPS :443, SNI `vanitq.fictionally.org` | 200 |
| HTTPS :443, SNI `bwalia.github.io` | 301 → the custom domain |

The register workflow warns if the toggle is still on before you activate.

Trade-off worth naming: the pop → GitHub hop is then unencrypted across the public
internet. The visitor's connection is still TLS, terminated at the pop. For a
public marketing site the exposure is tampering, not disclosure. If the gateway
ever gains a TLS upstream (`proxy_pass https://` with `proxy_ssl_server_name on`
and SNI set to the host), switch the backends to `:443` and turn Enforce HTTPS
back on — that is strictly better, and no other file needs to change.

**2. The Cloudflare record must be DNS-only (grey cloud).** The pop solves ACME
HTTP-01 on port 80; orange-clouding hides the challenge and the certificate never
issues. `cloudflare-dns.yml` defaults `PROXIED` to false and warns if you override it.

## Required GitHub config

| Kind | Name | Purpose |
| --- | --- | --- |
| Variable | `WSLPROXY_GATEWAY_DOMAIN` | Control-plane API base URL (the `/api` vhost, not the public pop edge) |
| Variable | `WSLPROXY_ADMIN_EMAIL` | Admin email for login (optional; input can override) |
| Variable | `WSLPROXY_SSL_EMAIL` | Let's Encrypt contact address, injected at push time |
| Secret | `WSLPROXY_TOKEN` **or** `ADMIN_PASSWORD` | Auth — token used directly, else email + password login |
| Secret | `CLOUDFLARE_API_TOKEN` | DNS upsert. Needs Zone:DNS:Edit (+ Zone:Zone:Read if no zone id) |
| Secret | `CLOUDFLARE_ZONE_ID` | Optional; skips the zone lookup |

`ssl_email` is a placeholder in the committed JSON and injected from
`WSLPROXY_SSL_EMAIL` at push time, so no personal address lands in this public repo.

A **self-hosted runner** is required for the register workflow. The control plane
only answers on the operator's network — a GitHub-hosted runner times out on login
(curl exit 28).

## Cutover order

Do it in this order, or the site is down between steps:

1. **Turn off Enforce HTTPS** (admin). This also fixes the current Cloudflare
   redirect loop on its own, so the site starts working immediately.
2. Run **Register WSL Proxy Domains** with `DRY_RUN=true` — check the payload.
3. Re-run with `ACTIVATE_CONFIG=true` so the vhost is live and holding a
   certificate *before* any traffic is sent to it.
4. Run **->Cloudflare DNS** with `DRY_RUN=true`, then `DRY_RUN=false`, to move the
   record to `pop0.wslproxy.com`, grey cloud.
5. Verify: `curl -sI https://vanitq.fictionally.org/` → `200`, and the certificate
   issuer is Let's Encrypt rather than Cloudflare.

To roll back, point the Cloudflare record at `bwalia.github.io` (orange cloud, SSL
mode Full) and the site is back on the previous path.

## Adding another domain later

Copy `servers/prod/host:vanitq.fictionally.org.json`, set `id` / `server_name` /
the `Host` header to the new host, point `rules` at a rule id, add the server id to
that rule's `servers` array, commit, and run the workflow for that env.
