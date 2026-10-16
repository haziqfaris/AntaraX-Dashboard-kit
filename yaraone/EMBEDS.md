# YaraOne embeds: what every product expects

**v1.0 · 16 Oct 2026 · resynced with YaraOne.** Decided by the owner on 16 Oct 2026. The six points this file left open are settled in YaraOne's `docs/19_EMBEDDED_TICKETS_PLAN.md` (decisions 1 to 14), from YaraOne's code; they are summed up under **How it works** below. **Built:** not yet. YaraOne builds it in phases V (hosts and identity), W (front office) and X (back office); a product wires it in once phase W lands.

## The decision

- **YaraOne manages tickets and feedback, and nothing else.** Every support request and every piece of feedback from every AntaraX product and every REKA client project lives in YaraOne.
- **No product builds its own ticketing or feedback.** No ticket table, no feedback inbox, no support form that stores anything. The product shows YaraOne's modules and passes context.
- **Each product's AXLE runs the product**: organisations, plans, settings, support sessions, R8, Troubleshoot. YaraOne never configures a product.
- **YaraOne has its own dashboard**, where REKA's support team works across every product. The embeds are views of the same tickets, not copies.
- **Later:** an API (through Lapisan, `haziqfaris/antarax-api`) replaces or sits beside the embeds, and a shared AntaraX sign-in removes the need to pass identity.

## Two modules

| | Front office | Back office |
|---|---|---|
| **For** | The product's customers: the organisation's people | REKA staff, inside each product's AXLE |
| **Embedded in** | The customer app (app SPEC §10) | AXLE → Watch → Tickets, and the Tickets tab of Organisation 360 (axle SPEC §10.12) |
| **Does** | Get help (a support request) · Send feedback · Your requests: the list, where each one is, the thread, reply | See this product's tickets, filter, open one, reply to the customer, add an internal note, change the state the customer sees, assign |
| **Shows** | The customer thread only. Never internal notes, staff assignments or other organisations' requests | Both threads, clearly apart: the customer thread and the internal one |
| **Who sees what** | A Member or Viewer sees their own requests. Owners and Admins see every request from their organisation, and may reply and close; they never change status or priority | Staff see the product's tickets. Viewers read; the Support rung and up reply, add internal notes, change the state the customer sees and assign (axle SPEC §5.2) |
| **Signs in** | Never separately: the person is already signed in to the product | Never separately: the staff member is already signed in to AXLE |

## Where the front office opens

- Help → **Contact support** opens Get help.
- Help → **Send feedback** opens Send feedback.
- Help → **Your requests** opens the list.
- **Report this** on an error screen opens Get help with the error reference filled in.
- The foot of the Help centre (`/help`) opens Get help.

## What the product passes in

| Field | Example | Notes |
|---|---|---|
| `product` | `janka` | The id in antarax-api's registry; a client project's own id |
| `environment` | `production` | So a test request is never mixed with a real one |
| `organisation` | id and name | |
| `person` | id, name, email, role | Role in the product's words (Owner, Admin, Member, Viewer, or its own) |
| `page` | `/forecasting?site=klang`, and the page title | Filled in, editable by the person |
| `version` | `4.12.0` | |
| `error_ref` | `req_7f3a91c2` | Only from Report this |
| `screenshot` | an image | Only when the person ticks "Add a screenshot of this page" |
| `locale`, `time_zone` | `en-GB`, `Asia/Kuala_Lumpur` | |
| `theme` | action colour, ink, lines, surface, radius, font | The module wears the host's look (below) |

The back office gets the product, the staff member (name, rung, rights) and, from Organisation 360, the organisation to filter to.

## Look

- The front office **wears the host's look**: its colours, radius and font come from `theme`. In an AntaraX product that is the product's palette; in a client project, the project's own. It never brings AntaraX's or YaraOne's colours into a client's app.
- Its only mark is one line at the foot: **"Managed by REKA · Powered by YaraOne"** (owner, 16 Oct 2026): REKA runs the support, YaraOne is the tool it runs on. Plain text in the host's muted colour, never a logo. A client project may hide it. This line is the one place "Powered by" is allowed (brand kit 12).
- The back office in AXLE wears AXLE's light page and REKA orange actions, inside a dashed frame labelled "YaraOne · back office", so staff see where AXLE ends and YaraOne begins.

## The words

States the customer sees (YaraOne PRD §17.4): **Received · Reviewing · Need more information · Planned · In progress · Resolved · Closed.** Kinds: **Support request** and **Feedback**. Feedback promises no reply, but tells the person when it led to a change.

## What links back to AXLE

From a ticket in the back office, staff reach the product's own tools: **Start support session…** (axle SPEC §11; the ticket is its "ticket it answers"), **Troubleshoot** when the ticket carries an error reference or matches an incident, and **Organisation 360**. AXLE's Needs-a-person list counts tickets waiting on a reply.

## How it works (settled in YaraOne docs/19)

| Point | Settled |
|---|---|
| **1 · How it embeds** | A script that mounts an iframe: `<script src="https://yo.antarax.ai/embed.js" data-host="pk_…">`, then `YaraOne.open("help" \| "feedback" \| "requests", { token, context })`. Help's three items and Report this call it; nothing else in the product changes |
| **2 · Knowing the person** | **The host vouches, YaraOne checks.** The product's server signs a JWT (HS256, the host's secret, 10 minutes at most) with `product`, `environment`, `organisation` (id, name), `person` (id, name, email, role) and, for the back office, the staff member's rung and rights. YaraOne checks signature, audience, expiry and origin, then opens a session. No third-party cookies: the session is a bearer token kept in the iframe's memory, renewed from the host's token, passed by `postMessage` to YaraOne's origin only, never in an address |
| **Hosts** | Each product and environment (and each client project) is a **host** in YaraOne's AXLE (its "YaraOne only" box: Hosts): product id, environment, allowed origins, and a secret shown once and rotatable. The product keeps only the secret |
| **People** | A person the product vouches for becomes a YaraOne contact automatically, under their organisation's client; someone already added is matched by email. An organisation becomes a YaraOne client the first time it sends anything, keyed `‹product›:‹org id›`; a client project's one organisation maps to the client that already exists |
| **One set of rules** | A front-office session reads and writes through the same filtering and `portal_commit()` as YaraOne's own portal; a back-office session commits like YaraOne's desk. The embeds add no write path |
| **3 · Replies** | In Your requests; by email (unless the person switches it off); and as a count the host can show on Help, from a `postMessage` event |
| **4 · Counts for AXLE** | Tickets waiting on a reply, for Needs a person, come from a small read endpoint the host AXLE calls with its secret, not from the embed |
| **5 · Attachments** | 10 MB each, five per message, kept with the ticket in YaraOne's storage |
| **6 · Client projects** | The same modules, with the project's theme; the foot line may be hidden |
| **The back office** | YaraOne's desk, scoped to this product (and one organisation from Organisation 360): its views **Triage · Mine · Open · Waiting on client · Overdue · Resolved**, keyboard first, two clocks per ticket from its urgency (first reply, resolution), both threads apart |
| **REKA's own view** | YaraOne's desk across every product, with a Product filter |

## Later

An API through Lapisan (`haziqfaris/antarax-api`) beside the embeds, and a shared AntaraX sign-in that removes the token (YaraOne phase Y).

## Tests YaraOne will run

Another host's secret, an expired token, a wrong audience and a disallowed origin are each refused; a Member sees only their own requests and an Owner their organisation's; an Owner may reply and close and nothing else; an internal note never reaches the front office; a back-office Viewer changes nothing; a stand-in host on another origin sends a request and sees the reply, the same ticket is on YaraOne's desk and in the stand-in AXLE's Tickets, and the host's database holds no ticket.
