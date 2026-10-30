# How Dashboard Kit fits with the other REKA frameworks

Dashboard Kit owns AXLE staff consoles, the AntaraX app shell and the REKA client-project base. This page is generated the same way in every REKA framework: it says who governs what, what each framework owns, and how Dashboard Kit relates to each one. Checked on 30 October 2026.

## Who governs what

From RESAM's [repository map](https://github.com/haziqfaris/RESAM/blob/main/docs/repository-map.md) (AwanGan decision 0021, 25 October 2026). Gates, checks and decisions always stay in each product.

| When the work is about | It goes to |
|---|---|
| A client engagement or REKA product: steps, gates, documents, handover | Development Framework |
| Rules for any AI feature: AI cards, consequence floors, checks | Heuristiks |
| AntaraX's AI: provider keys, models, routing, call records, AI cost | AwanGan (client-owned work only with the client's written agreement) |
| The same AI on a client's own servers, offline | BumiNyata |
| API keys for callers, tenants, scopes, limits, usage rows | Lapisan, at api.antarax.ai |
| Data a business hands over: files in, clean tables out | Cebis Loom |
| Staff consoles (AXLE) and the AntaraX app shell | Dashboard Kit |
| How REKA or AntaraX looks and talks | REKA Brand Kit or AntaraX Brand Kit |
| Which framework governs what, and the shared registry | RESAM |

## Every framework, and how Dashboard Kit relates to it

| Framework | Owns | Dashboard Kit and it |
|---|---|---|
| [RESAM](https://github.com/haziqfaris/RESAM) | which framework governs what; the shared registry, module map and checklists | Dashboard Kit links to it; RESAM links to Dashboard Kit |
| [Development Framework](https://github.com/haziqfaris/reka-development-framework) | the lifecycle from first contact to handover: steps 01 to 09, 12 gates and their signers, job sizes, documents | Development Framework links to Dashboard Kit |
| [Heuristiks](https://github.com/haziqfaris/ai-framework-heuristiks) | the rules for every AI feature: AI cards, consequence floors, 23 layers, evaluation, the shared gateway and runtime | Dashboard Kit links to it; Heuristiks names Dashboard Kit |
| [AwanGan](https://github.com/haziqfaris/AntaraX-AwanGan) | AntaraX's AI control plane (provider keys, models, routing, call records, AI cost) and its cloud document AI | Dashboard Kit links to it; AwanGan pins Dashboard Kit |
| [BumiNyata](https://github.com/haziqfaris/AntaraX-BumiNyata) | the same AI installed on a client's own servers, offline | BumiNyata pins Dashboard Kit |
| [Lapisan](https://github.com/haziqfaris/antarax-api) | keys for API callers, tenants, scopes, limits and usage rows; the gateway at api.antarax.ai, Console and AntaraX email | Dashboard Kit links to it; Lapisan names Dashboard Kit |
| [Cebis Loom](https://github.com/haziqfaris/antarax-cebis-loom) | data a business hands over: files in, clean tables and a data dictionary out | Dashboard Kit links to it; Cebis Loom pins Dashboard Kit |
| [AntaraX Brand Kit](https://github.com/haziqfaris/AntaraX-brand-kit) | how AntaraX looks and talks: names, statuses, tokens, voice | Dashboard Kit pins it in a lock file; AntaraX Brand Kit links to Dashboard Kit |
| [REKA Brand Kit](https://github.com/haziqfaris/reka-brand-kit) | how REKA looks and talks: mark, orange, type, voice, copy rules | Dashboard Kit names it |
| [Mission Docs](https://github.com/haziqfaris/reka-mission-docs) | plain-language mission documents from problem to handover (candidate, not yet adopted) | Mission Docs names Dashboard Kit |
| [KITAR AI Framework](https://github.com/haboque/ai-framework-kitar) | AI routing, model registry and checks for the KITAR app only | Dashboard Kit names it |
| [Ripple (tool)](https://github.com/haziqfaris/ripple-workflow) | turns a client interview into a process map and a first FRS | Ripple (tool) pins Dashboard Kit |

## Kept in step

Gaps still open when the frameworks were rechecked on 30 October 2026:

- The GitHub default branch is still the 1.8.0 line; main (1.10.0) is the real line of work. Make main the default branch.
- The default branch still tells AXLE to keep AI provider keys; AwanGan decision 0021 moves them to AwanGan.

RESAM records every framework's version, stage and links in its [framework status](https://github.com/haziqfaris/RESAM/blob/main/docs/reference/framework-status.md), [connections](https://github.com/haziqfaris/RESAM/blob/main/docs/reference/connections.md) and [modules](https://github.com/haziqfaris/RESAM/blob/main/docs/reference/modules.md) pages. When this page and RESAM disagree, RESAM is updated first and this page follows.
