# AXLE Central: what the antarax-api docs say it must contain

Source: `haziqfaris/antarax-api` at commit `05ea388` (12 Oct 2026). All references are `file:line` in that repository unless marked "brand kit". AXLE Central is **planned, not built**: there is no AXLE user interface anywhere in the repo. What exists is the internal contract it will read through (AXLE Link) and the shared code it will run on.

## 1 What it is, and what it is not

| Point | Reference |
|---|---|
| One operator view across every AntaraX product, at `axle.antarax.ai` | `docs/07-operations-and-axle.md:17`, `registry/registry.json:22-24`, `README.md:5` |
| Its own host, never under the API host (`api.antarax.ai`): own cookies, firewall and rate rules; an admin surface is not advertised | `docs/07-operations-and-axle.md:17`, `docs/decisions/0009-lapisan-platform-name.md:10,23`, `docs/11-dos-and-donts.md:72` |
| Stage 2 item 15: "every product on one screen, links into product AXLEs", built in the same app as the AntaraX Hub | `docs/12-roadmap.md:39`, `docs/08-infrastructure.md:100` |
| It does **not** replace the product AXLEs. Each product keeps its own AXLE for depth; Central links back to them | `docs/07-operations-and-axle.md:17`, `docs/08-infrastructure.md:100`, `docs/11-dos-and-donts.md:71` |
| The AXLE upgrade (API section and shared staff roles in each product AXLE) runs alongside, with Central as its centre; its own plan lives in the Angka repository | `docs/12-roadmap.md:59-61` |
| Built from the same `@lapisan/core` and `@lapisan/postgres` packages the products vendor | `docs/08-infrastructure.md:124`, `docs/decisions/0011-lapisan-code-lives-here.md:16` |

### The product AXLEs it must link into today

| Product | AXLE address | Built on | API controls today |
|---|---|---|---|
| Angka and Lapis | `axle.angka.antarax.ai` | Next.js pages in the Angka app | Full AXLE → API section (the pattern) |
| Yara | `axle.yara.antarax.ai` | Next.js pages in the Yara app | Status API flag per company |
| YARA One | `axle.yo.antarax.ai` | Next.js, SECURITY DEFINER RPCs | None |
| Janka | `axle.janka.antarax.ai` | Separate Vite SPA, Appwrite `admin-api` | None |
| Frame | `frame-axle.antarax.ai` | Next.js `/admin` | Context API rate limit, tokens per workspace |

Reference: `docs/07-operations-and-axle.md:9-15`, also `docs/08-infrastructure.md:16`. Brand kit note: these become "AXLE · <product>" and, when the single console exists, `axle.antarax.ai` (brand kit `guide/13-shared-product-standards.md:30,105-112`).

## 2 How it gets its data: AXLE Link

Central never reads a product's database. Each product serves four signed internal endpoints (`docs/07-operations-and-axle.md:31-52`; contract in `packages/lapisan-core/src/link/contract.ts:11-91`):

| Endpoint | Returns | Shape reference |
|---|---|---|
| `GET /internal/axle/v1/tenants?updated_since=` | Tenants: id, product, label, owner email, plan (id, label, price, overage per call, currency), API on, stopped, stopped reason, created, updated | `docs/07-operations-and-axle.md:37`, `contract.ts:31-53` |
| `GET /internal/axle/v1/usage?since=&until=` | Usage totals by day, tenant, mode, route and unit: calls, errors, quantity. At most 92 days per read | `docs/07-operations-and-axle.md:38,49`, `contract.ts:21-22,55-67` |
| `GET /internal/axle/v1/health` | `ok` / `degraded` / `down`, a list of problems (`database_not_answering`, `jobs_stuck`, `errors_high`), plus any extra fields the product adds | `docs/07-operations-and-axle.md:39,48`, `contract.ts:69-82` |
| `POST /internal/axle/v1/switches` | Apply a switch decided centrally: scope `all`, a product, `product:<tenant>`, or `key:<id>`; off needs a reason callers read | `docs/07-operations-and-axle.md:40,49`, `contract.ts:84-91` |

Rules that shape the UI:

- A product's AXLE Link is absent (404) until it has a service key, and while an owner has switched it off. Central must show "not connected" per product, not an error (`docs/07-operations-and-axle.md:46`).
- A product may refuse central switches (403 `switches_refused`, "an owner turned that off in AXLE Settings"). Central needs a per-product "takes switches: yes/no" state (`docs/07-operations-and-axle.md:49`, `packages/lapisan-core/src/link/handlers.ts:40,105`).
- Every signed call lands in the product's audit trail as the service, with summaries such as "AXLE Central read health: degraded (jobs_stuck)" and "AXLE Central switched lapis off (reason)" (`docs/07-operations-and-axle.md:50`, `handlers.ts:69,88,98,122`).
- Products already shipping usage to the Hub may skip `/usage`, so usage may come from the Hub instead (`docs/07-operations-and-axle.md:42`).

## 3 Sections Central should hold

Each product AXLE gets the same **API section**; Lapis has it all except a lookup box and is the pattern to copy (`docs/07-operations-and-axle.md:19-29`, `docs/10-adding-a-product.md:42`). Central summarises these across products and deep-links to the product AXLE for the rest.

| Section | What an operator can do | Audited | Reference |
|---|---|---|---|
| Overview (every product on one screen) | Health of each product, tenants, usage, central switches at a glance | n/a | `docs/08-infrastructure.md:100`, `docs/12-roadmap.md:39` |
| Tenants (on screen: organisations) | Switch the API on or off; choose a plan; set limit overrides (`per_minute`, `per_day`, `per_month`, `hard`); stop with a reason callers see; notes | Yes | `docs/07-operations-and-axle.md:23`, `docs/06-metering-limits-billing.md:48` |
| Keys | See every key (prefix, mode, scopes, made by, last used); stop one; stop all of a tenant's | Yes | `docs/07-operations-and-axle.md:24`, `docs/04-keys-and-identity.md:84-85` |
| Switches | Off for everything, a product, a tenant, a key, each with a reason | Yes | `docs/07-operations-and-axle.md:25` |
| Calls | Calls, errors and p50/p95 time by day, by route, by tenant; latest failed calls with request ids | Read only | `docs/07-operations-and-axle.md:26` |
| Lookup | Find one call by request id | Read only | `docs/07-operations-and-axle.md:27`, `docs/09-products.md:34` |
| Health and errors | Each product's health; unknown errors from the product's error log | Read only | `docs/07-operations-and-axle.md:39,74` |
| Audit | Operator actions: who, what, before and after, why | Read only | `docs/07-operations-and-axle.md:75`, `docs/04-keys-and-identity.md:93` |
| Access requests (Lapisan Console) | List requests; approve with a plan, or decline with a reason; email the team's owners; show sandbox and partner tenants as such. Today this lives in Angka's AXLE | Yes | `docs/13-console.md:57,173`, `docs/decisions/0012-lapisan-console.md:10` |
| Connect apps | Partners' apps with suspend and revoke | Yes | `docs/10-adding-a-product.md:74`, `docs/09-products.md:38` |
| Accounts | Link tenants of different products into one AntaraX account, matched by owner email or company registration number | Yes | `docs/08-infrastructure.md:110` |
| Staff | Staff roles (admin and above) | Yes | `docs/07-operations-and-axle.md:63` |
| Billing (later) | Cross-product usage statements; one invoice per AntaraX account | n/a | `docs/12-roadmap.md:42` |

## 4 Operator tasks the screens must make fast

**When something goes wrong** (`docs/07-operations-and-axle.md:80-90`):

| Situation | First move | Then |
|---|---|---|
| One customer's system is flooding us | Switch off `key:<id>` with a reason | Contact the tenant; lower their per-minute rate |
| A bad release is corrupting writes | Switch off the product, reason "Paused while we fix a problem" | Roll back; switch on; check usage rows |
| A key leaked | Stop the key | Search usage by key id; tell the tenant |
| The database is down | Calls answer 500 (fail closed) | Status note; nothing to switch |
| Everything must stop | Switch off `all` | Every product's door answers 503 with the reason |

Every switch answers callers with the typed reason, so the reason field must be written for the customer (`docs/07-operations-and-axle.md:90`).

**Signals to watch** (`docs/07-operations-and-axle.md:68-76`): calls, errors and latency; one failed call by request id; unknown errors; operator actions; a tenant near its cap (usage against limits).

**Alerts to build** when the first live partner is on, email first (`docs/07-operations-and-axle.md:78`): error rate over 5 % for 5 minutes on any product; any tenant past 80 % of a daily cap; door p95 over 300 ms; usage writes failing.

**Going live for a design partner** (`docs/10-adding-a-product.md:50-52`): switch the API on in AXLE on the `pilot` plan, then watch errors, p95 and rate refusals for a week.

## 5 Cross-product needs

- **One staff role ladder**, each including the one before (`docs/07-operations-and-axle.md:54-64`; converge note `docs/09-products.md:87`):

| Role | Can |
|---|---|
| `viewer` | Read everything except secrets |
| `support` | Plus: look up calls, see a tenant's keys, add notes |
| `operator` | Plus: switches, stop keys, stop tenants, limit overrides |
| `admin` | Plus: plans, switching tenants on, staff roles |
| `owner` | Plus: platform secrets, deleting data |

- **Two people** for anything irreversible (deleting a tenant's data, rotating a platform secret) once there are more than two operators (`docs/07-operations-and-axle.md:66`).
- Staff act through AXLE, never with a customer's key; every change writes an audit row (`docs/04-keys-and-identity.md:93`).
- **Product filter everywhere**: plans stay product-specific, API plans follow `plans.ts`, feature flags stay product-specific, API on/off is `platform_tenants.api_enabled` everywhere (`docs/09-products.md:88-89`).
- **Data protection** shown or respected in the UI: API data stays in the product's own database in Singapore; usage rows hold ids, routes and numbers, never bodies; usage kept 13 months then reduced to daily totals; logs never hold keys or full bodies (`docs/07-operations-and-axle.md:92-99`).
- **One sign-in** for REKA staff across products, when the single console exists (brand kit `guide/13-shared-product-standards.md:112`).

## 6 Look and words (brand kit, for the design)

- Name "AXLE", product as context ("AXLE · Janka"); address `axle.antarax.ai`; dark only: ground `#071233`, raised `#0C1B47`, REKA orange `#FB9800` accent, Poppins and JetBrains Mono, the AntaraX A in the corner (brand kit `guide/13-shared-product-standards.md:105-112,136`).
- On screen, the customer account is an **organisation**, not a tenant (brand kit `guide/13-shared-product-standards.md:3,13`); the docs say "tenant" throughout, which is fine in code.
- The staff role `support` should not be confused with "REKA support", the customer-facing phrase for REKA people helping inside an organisation (brand kit `guide/13-shared-product-standards.md:20`).
- Customers never see AXLE's name. The Lapisan Console demo's "Demo mode: decide it as AXLE would" panel (`apps/console/app/t/[team]/[product]/live/page.tsx:47-55`) is demo-only and must stay so.

## 7 What exists in code today

| Piece | Where | State |
|---|---|---|
| AXLE Link contract and helpers | `packages/lapisan-core/src/link/contract.ts` | Built |
| AXLE Link handlers (tenants, usage, health, switches, audit summaries) | `packages/lapisan-core/src/link/handlers.ts` | Built |
| Service signature check (`AntaraX-Service-Signature`) | `packages/lapisan-core/src/service-auth.ts` (header comment: "THE HUB AND AXLE CENTRAL DO NOT EXIST YET") | Built |
| Angka's AXLE Link wiring | `haziqfaris/angka` `lib/axle/link` (off until `AX_SVC_KEY` is set) | Built, per `docs/09-products.md:37` |
| AXLE Central UI, Hub | none | Not started |
