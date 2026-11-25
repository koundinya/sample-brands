# Birch demo brand

A fictional footwear brand for phonebook-bench. Its website and ARD point to support hosted at `z3nbirch.zendesk.com`.

## Deploy on Render

Create a **new Static Site** from this repository. Keep the existing sample deployment separate.

| Setting | Value |
| --- | --- |
| Branch | `main` |
| Root directory | Leave blank |
| Build command | `node brands/birch/build.mjs` |
| Publish directory | `brands/birch/dist` |

Alternatively, create a new Blueprint from this branch's `render.yaml`.

No dependencies or credentials are needed. The build reads Render's assigned `RENDER_EXTERNAL_HOSTNAME` and writes it into the ARD brand domain and identifier. For a custom domain, set `BRAND_DOMAIN` to the hostname without a scheme or path.

After deployment, open:

- `/` for the brand website
- `/support.html` for support options and FAQs
- `/.well-known/ard.json` for the published service entry

Use the exact entry in the deployed ARD when enrolling Birch in OSD. Deploying this site does not register it with OSD. If a registry assigns a different identifier or changes fields, reconcile the published entry before verification.

## Local preview

```sh
BRAND_DOMAIN=birch.example node brands/birch/build.mjs
python3 -m http.server 8876 --bind 127.0.0.1 --directory brands/birch/dist
```

The example hostname is only for local build checks. Do not enroll it.

## Scope

The website describes synthetic support requests, not implemented refund processing. Confirm the Zendesk Help Centre, request form and MCP tools are ready before a benchmark run. Both agent setups can see the server-card and ARD links on the website.

No benchmark answers, customer data or credentials belong in this repository.
