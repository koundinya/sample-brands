# Birch Poppy discovery

The brand publishes a Poppy 1.0 document at `/.well-known/poppy.json` and a matching `application/poppy+json` ARD entry. The MCP entry is retained. Both describe the same existing signed-out Zendesk support API; this does not add sign-in or a Poppy conversation endpoint.

Build: `BRAND_DOMAIN=birch-demo.onrender.com node brands/birch/build.mjs`.

The Poppy entry must also be registered unchanged in OSD. The current Zendesk admin registration form does not expose resource type or URL, so that registration remains pending. Adding ARD alone does not add a searchable directory record.

Validation: JSON shape and matching brand/entry URLs checked locally. The installed Poppy kit targets draft 0.2 and rejects version 1.0 and signed-out APIs without auth. Those checks are incompatible with the current 1.0 spec, which permits signed-out APIs without an OAuth server. Do not change the version or invent an issuer to satisfy that old validator. Reference: https://personalagentprotocol.org/docs/1.0/spec sections 1.1 and 3.

A read-only Muse connection preflight is still needed for the cross-domain API before benchmark runs. No support submission is needed to check discovery.
