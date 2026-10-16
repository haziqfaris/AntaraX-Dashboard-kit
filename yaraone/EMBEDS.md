# YaraOne embeds: what every product expects

**v0.1 · 16 Oct 2026 · waiting on YaraOne's build.** Decided by the owner on 16 Oct 2026. The parts marked **Resync** are settled when YaraOne's build is done, in a chat that reads this file and YaraOne's code together.

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
| **Who sees what** | A person sees their own requests; Owners and Admins see every request from their organisation | Staff see the product's tickets; the Support rung and up reply; Viewers read only (axle SPEC §5.2) |
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
- Its only mark is one line at the foot: "Requests are handled by REKA support with YaraOne." A client project may hide it.
- The back office in AXLE wears AXLE's light page and REKA orange actions, inside a dashed frame labelled "YaraOne · back office", so staff see where AXLE ends and YaraOne begins.

## The words

States the customer sees (YaraOne PRD §17.4): **Received · Reviewing · Need more information · Planned · In progress · Resolved · Closed.** Kinds: **Support request** and **Feedback**. Feedback promises no reply, but tells the person when it led to a change.

## What links back to AXLE

From a ticket in the back office, staff reach the product's own tools: **Start support session…** (axle SPEC §11; the ticket is its "ticket it answers"), **Troubleshoot** when the ticket carries an error reference or matches an incident, and **Organisation 360**. AXLE's Needs-a-person list counts tickets waiting on a reply.

## Resync: settled after YaraOne's build

1. How each module is embedded: a script that mounts it, an iframe, or a component package.
2. How it knows the person without a second sign-in: for example, a short-lived token the product signs per session, which YaraOne checks. Never the product's own session cookie, never a shared password.
3. How a reply reaches the person: the product's notifications panel (app SPEC §8) and email, and a count on Help.
4. Whether the back office's counts for AXLE come from an API call or the embed.
5. Attachments: size limits, where files live, how long they are kept.
6. The client projects' version: the same modules, with the project's own theme.
