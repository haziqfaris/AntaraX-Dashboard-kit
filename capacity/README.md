# Capacity: knowing a limit before it is reached

Every AntaraX product and REKA client project describes what it runs on in **`capacity.json`** at its repository's root, and AXLE's **R8 → Capacity** is drawn from it (axle [SPEC §10.13](../axle/SPEC.md)). Decided by the owner on 16 Oct 2026, after a survey found that no product compared its own usage with its plans' limits, and free tiers pausing had taken production down three times.

**Generic by design.** Nothing here is about one vendor. A managed database, serverless functions, a VM in a local data centre, containers, object storage, an email or SMS sender, a sensor gateway: each is a **plan** with **resources**, each resource is one of the **classes** below, and each has a **limit**, a **measurement** and a **decision**. A new kind of infrastructure is a new resource, never a new page or a new standard.

| File | What it is |
|---|---|
| [`capacity.schema.json`](capacity.schema.json) | The shape of `capacity.json` |
| [`check.py`](check.py) | Checks a `capacity.json`. Plain Python, no packages |
| [`examples/janka.capacity.json`](examples/janka.capacity.json) | A product on managed cloud: Appwrite Free, Resend, two AI providers |
| [`examples/self-hosted.capacity.json`](examples/self-hosted.capacity.json) | A client project on one VM in a local data centre, with SES and S3 |

The figures in the examples are illustrative. A real `capacity.json` takes every limit from the provider's own plan page, and marks a plan `"confirmed": false` until someone has checked it there.

## The classes

| Class | Measures | Managed cloud, for example | Serverless, for example | Your own server, for example |
|---|---|---|---|---|
| `data` | Database size; the largest tables | Supabase, Neon, Appwrite, RDS: database size | Cloudflare D1, DynamoDB: storage | Postgres on the disk: `pg_database_size` |
| `files` | Stored bytes and objects | Supabase Storage, Appwrite Storage, S3, R2 | Blob stores | A folder on the disk (or share `data` when one disk holds both) |
| `transfer` | Bandwidth out | A plan's egress | Vercel, Netlify bandwidth | The host's monthly transfer |
| `requests` | Requests or invocations | Edge function invocations | Workers requests a day, Lambda invocations | Requests a minute at the proxy |
| `compute` | CPU time per request, or CPU and memory | Function CPU time | Workers CPU ms per request, Lambda GB-seconds | CPU and memory in busy hours |
| `connections` | Open connections, realtime clients, concurrency | Database connections, realtime peak | Concurrent executions | `pg_stat_activity`, sockets |
| `deployables` | Functions, workers, projects, sites | Functions per project | Workers per account, projects per team | Services on the machine |
| `jobs` | Runs, duration, backlog | Scheduled functions | Cron triggers, queues | Cron, a job queue |
| `messages` | Emails, SMS, push | Resend, SES, Postmark quotas | | |
| `ai` | Tokens and cost | Each AI provider; budgets as in axle SPEC §10.6 | | |
| `outside-apis` | Calls to any other provider | Maps, payments, Sheets, government APIs | | |
| `backups` | Size; time to restore | The plan's backups, or an export to object storage | | Dumps to another site; the last restore drill |

**Availability** is not a resource but always present: an outside check, every 15 minutes or less, of a page that touches the database, run from outside the product's own hosting. It is what notices a free tier pausing.

## Measuring

| `measure.how` | Means | Use it when |
|---|---|---|
| `provider-api` | The provider's usage endpoint, read nightly | The provider has one (most clouds do) |
| `query` | The product's own query or command: `pg_database_size`, a sum of file sizes, `df` | The provider has no usage API, or it is your own server |
| `log` | Counted from the product's own records: `ai_calls`, an email log, a job log | The product already writes each event |
| `manual` | Read by a person from a billing page, with the date | Nothing else is possible yet; the page shows how old it is |
| `none` | Not measured, with `why_not` | Honest until it is built; the page shows a dash and the reason |

A nightly job writes one snapshot per resource (value, unit, when, how) and keeps 400 days. The trend and the runway come from those snapshots. No monitoring vendor is needed; a product that has one points the snapshot at it.

## Thresholds and decisions

- **80%** of a limit, or a **runway under 30 days**: a Needs-an-operator item on R8 Overview and an email to the Admin rung. A product may warn earlier (`warn_at` lower, `runway_days` longer), never later.
- **100%**, or a plan pausing the product: an incident on R8 Full, a Troubleshoot item on Base.
- **Every resource names its decisions**, in order: `upgrade-plan`, `reduce-use` (compress, archive, page, cache), `change-architecture`, `move-provider`, each with what and, where known, the cost. AXLE says it; it never acts on its own.

## Adding it to a product

1. List every provider and plan the product runs on in `plans`, with the rules that can stop it (idle pause, non-commercial use, a function count). Confirm each in the provider's billing page.
2. Add a resource for every limit that can stop the product or cost money. At least one `data` or `files` resource.
3. Say how each is measured; `none` with a reason is allowed, a guess is not.
4. Write the decisions.
5. Run `python3 capacity/check.py capacity.json` from a copy of this kit.
6. Build the nightly snapshot, the outside check and R8 → Capacity (axle SPEC §10.13; mock `axle/mock/Capacity.dc.html`).
