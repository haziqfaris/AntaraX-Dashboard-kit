# Shared practice: what every product does the same way underneath

**Version 1.0, the standard (owner, 11 Nov 2026, Dashboard kit 1.14.0).** The shell ([app/SPEC.md](../app/SPEC.md)), AXLE ([axle/SPEC.md](../axle/SPEC.md)), getting in, acting and Astryx say how a product looks and behaves. This file holds the practice beneath them that several products had each worked out on their own: how email is sent, where legal text comes from, how a product stops building the same part twice, who sees money, how waiting and tours behave, how a product proves production is current, how AI usage is shown, and how it pins this kit. Each section names the product it was taken from; that product's code is the reference, and this text wins where they differ.

It applies to every AntaraX customer app and every AXLE. A REKA client project follows §2, §3, §7 and §9 too; the rest is AntaraX's.

## 1 AntaraX email (antarax-api docs/15)

Every product sends through AntaraX email (`email.antarax.ai`). The service owns the sender, the template and its look, checking every variable and link, idempotency, the provider, bounces and complaints, and the ledger. The product owns what happens, who should hear, people's preferences and unsubscribe, and the link in the email.

- **One call:** `POST /v1/emails` with the product's service key, an `Idempotency-Key`, a template id, one recipient and the template's variables. Never a From, a subject, HTML or a product in the body: each is refused. Copy the client (`packages/lapisan-email/src/client.ts`, one file, no imports) rather than writing one.
- **The templates** (docs/15 §15.4). Security: `auth.verify_email.v1`, `auth.sign_in.v1`, `auth.password_reset.v1`, `auth.password_changed.v1`, `auth.email_changed.v1`, `auth.confirm_email_change.v1`, `auth.invite.v1`. Service: `team.invitation.v1`, `onboarding.welcome.v1`, `system.action_required.v1`, `system.export_ready.v1`, `system.announcement.v1`. Activity, which people may turn off: `notice.v1`, `digest.v1`. A product never invents a template; it asks for one in antarax-api. A template that changes what it needs becomes `.v2`.
- **Read the answer.** A `201` is an outcome: `sent`, `suppressed` or `failed`. Only `sent` counts as emailed; `suppressed` and `failed` are final and never retried. A `503` is sent again with the same key (Tiko D-098).
- **Activity email carries an unsubscribe** (`unsubscribe_url`, the product's own one-click address), sent as `List-Unsubscribe` too. Security email never does.
- **Supabase Auth's own email** goes the same way: either Supabase sends it through `mail.antarax.ai` with the product's sender, or its send-email hook hands it to the service (`/v1/hooks/supabase/<product>`), or to the product's own worker, which checks the hook's signature and sends through the service (YaraOne `ops/src/auth-mail.js`). Supabase still makes and checks every code and link.
- **Senders and their house** (owner, 30 Oct and 1 Nov 2026). Each sender is a row of data with its own house: the From, the byline, the legal line, the mark and the band. An AntaraX product's email is "‹Product› by AntaraX". **A tool REKA owns** that sends through AntaraX email says "‹Tool› by REKA, powered by AntaraX", from REKA's own domain (`mail.reka.re`), with REKA's legal line: peREKA is the first. A client app REKA builds sends from REKA Tech's team (`mail.reka.tech`) and never through the AntaraX team. Senders are registered in R8 → Email (axle SPEC §10.14).
- **Never shown anywhere,** in a product or AXLE: an email's body, subject, links, codes, or a whole address. Addresses are masked (`n***@contoh.example`).
- **The one exception to "everything through AntaraX email":** monitoring alerts, which go by Grafana Cloud's own email so an alert still arrives when AntaraX email is the thing that is down (RESAM D-45, owner 2 Nov 2026; `reka-observability-kit`).

## 2 Legal text comes from REKA's legal repository

A product never writes its own terms, privacy notice or personal-data rules.

- **The text** lives in `haziqfaris/reka-legal-policies-web`, exported per product (`exports/<id>.json`). The product copies it with a sync script and pins it in `legal.lock.json`: the repository, the branch, the commit and the file's SHA-256. A test fails when the copied file and the lock disagree, so nobody edits the copy by hand. Reference: AX Frame `scripts/sync-legal.mjs`, `src/legal/legal.lock.json`, `src/lib/legal/legalLock.test.ts`; Angka, Tinara, antarax.ai and reka.re do the same.
- **Personal-data rules** are the legal repository's `procedures/personal-data-rules.md` (owner, 30 Oct 2026), with its shared test cases. A product or framework that masks personal data runs every case and passes them all (Cebis Loom `tests/rules/`, Heuristiks `profiles/reka/personal-data-rules.json`).
- To change the text, change the legal repository, then sync. `/legal/*` pages (app SPEC §4) show what was synced.

## 3 One part per job, one word per thing, one tone per meaning (YaraOne docs/24)

YaraOne's consistency audit (1 Nov 2026) found 22 copies of a dropdown and 5 status-to-colour maps, because each screen that needed a part wrote its own. The fix is a rule a script can check.

- **One part per job.** Menus, tabs and view switches, chips, icon and copy buttons, confirms, form fields, empty states and "Saved" each come from one shared component (with Astryx, from Astryx in the product's theme). A lint fails on a hand-made copy: a browser `confirm`, a native select, date, time, range or checkbox input, a pasted dropdown, an arbitrary shadow. A line with a real reason to differ says so (`parts-ok: <why>`). Reference: YaraOne `scripts/lint-parts.mjs` in `npm run verify`.
- **One word per thing.** The words on screen for the product's own things live in one file, and screens, emails, history lines and the guide take them from there. Reference: YaraOne `src/domain/words.ts` (request, dashboard, support, person, organisation, deal). The shared words are brand kit 13 §1; a product's file adds only its own. AX Frame's name test (`src/test/consistency.test.tsx`) and Yara's `check-literals.mjs` are the same idea.
- **One tone per meaning.** One module is the only place a status becomes a colour, and every state carries an icon and a word as well, so it survives greyscale. Reference: YaraOne `src/design/status.ts`. The tones are the kit's: ok, warn, fault, and neutral; "needs a look" and danger are never the same tone.

## 4 Who sees money

How money is written is brand kit 13 (currency first, grouped by currency, never silently converted, `US$` never a bare `$`). Who may see it is decided once per product, in one place, and enforced on the server:

- **The product names the roles that see money** in one constant, and every figure, table, chart and export reads it. A role without it sees counts, never amounts. Reference: Yara `MONEY_VISIBLE_ROLES` (owner and operations manager only; supervisors none; workers counts only, owner decision 10 Jul 2026).
- **Billing is owners only**: the plan, checkout, the portal, invoices and payment method (AX Frame `src/lib/billing/billingAuthority.ts`). The check is on the server; hiding a button is not the control.
- **Hidden is a dash, not a gap:** "–" with the reason, as AXLE does for the Finance right (axle SPEC §5.2), so a total never leaks through a sum, an alert or a CSV.

## 5 Waiting and AI thinking

App SPEC §12 and actions SPEC §3 say what waiting looks like: never a spinner, never a full rotation. These are the references to copy:

- **The inline loader:** AX Frame `src/components/Loader.tsx` (the four corners close in and open; reduced motion holds still and the words carry the state), and Tinara `components/ui/Loader.tsx`. A test can keep spinners out (AX Frame `src/test/loader.test.tsx`).
- **AI thinking:** AX Frame `src/components/AiThinking.tsx` (the sparkle morphing into the product's mark and back on a 6-second cycle; a still sparkle for reduced motion), always beside the action in words.
- **Never:** `Loader2`, `animate-spin`, Astryx's own spinners (astryx SPEC §5).

## 6 Guided tours

How a tour looks is the product's own (app SPEC §1). How it behaves is shared:

- **Each step points at an element with `data-tour="<anchor>"`.** A step whose anchor is missing is skipped, so renaming an anchor silently removes a step; a crawler that reports steps shown against steps expected, per tour and per role, is the check (Yara `scripts/crawl-tours.mjs`, `src/components/onboarding/Tour.tsx`).
- **It starts on its own the first time** a person opens the screen, then only when they ask ("Take the tour" in the page's help). Completion is kept per device; that is a convenience, not a record.
- **It dims the rest and moves between steps;** under reduced motion it moves without gliding. Every step can be closed, and Esc closes it.
- **When a screen or label changes, its tour and its guide change in the same piece of work.**

## 7 Is production serving main?

Hosting has failed to deploy without saying so more than once (Yara, three times). Every product proves it:

- **`GET /api/version`** answers the commit production serves, with no secret in it.
- **A check compares it with the repository's `main`** and fails when they differ (Yara `scripts/integrity.mjs`). Run it before saying a release is live, and weekly.
- AXLE's Overview shows the build (axle SPEC §8.1).

## 8 How AI usage is shown

AwanGan manages the AI; each product shows its own share (axle SPEC §10.6, Heuristiks REKA decision 0013).

- **To customers,** AI is use against the plan's allowance in plain units ("42 of 200 Assist answers this month"), with when it resets (app SPEC §13, Usage). Never tokens, cost, model or provider.
- **In AXLE,** from Lapisan's usage rows for product `ai`: calls, errors, time, cost by organisation, feature and model, budgets with alerts at 80% and 100%.
- **Every call is recorded, including the ones nobody used:** the tokens and model of a draft thrown away, and a call left pending when the page closed is closed as such, so AXLE's figures are real (Tiko D-097).

## 9 The kit lock

Every product pins this kit in `antarax-kit.lock` (app README, Pin the kit). A pin is only worth something if others can see the same kit:

- **The `version` is a release on this kit's `main`, and the `commit` is on `main`.** Building against a kit branch that has not merged leaves the product on rules nobody else follows (Tiko pinned 1.12.1 before it merged). `node tools/check-lock.mjs PRODUCT_PATH` fails on either, and on a `follows` entry the kit doesn't have; it reports, without failing, how far behind the product is.
- **Products also pin what they copy:** the brand kit tokens (the header of a copied `tokens.css`, or `brand-kit.lock`), Astryx (`"astryx": "0.7.13"`), the legal text (§2), the observability kit (`observability.lock`).
- **When the kit moves on,** read its CHANGELOG from the pinned version up, adopt it, and bump the lock in the same piece of work.

## 10 Checks run on the machine

GitHub Actions does not run on REKA's account, so every product runs its checks locally and records them: YaraOne's `npm run ship` (verify, push, then post the `verify` commit status), Cebis Loom's `scripts/check.sh`, AwanGan's `scripts/check-record.sh` with a dated record in `docs/checks/`. A pre-push hook that runs the checks, and refuses the push when what they need is down, keeps them from being skipped. RESAM holds this standard (owner, 11 Nov 2026); until it writes it, these three are the reference.

## 11 How to prove it

| Part | Proof |
|---|---|
| Email | A send of each template the product uses, with `dry_run: true`, renders; the product reads `status` and never retries `suppressed` or `failed` |
| Legal | The lock test passes; the synced file's SHA-256 matches the legal repository's export |
| Parts, words, tones | The parts lint passes in the product's verify; one words file; one status module |
| Money | Signed in as a role without money, no amount appears on any screen, in any export or in any alert |
| Waiting | No `Loader2` or `animate-spin` in the code; reduced motion holds every loader still |
| Tours | The tour crawler shows every step of every tour |
| Production | `/api/version` equals `main` |
| AI usage | A customer screen shows no tokens, cost or model; AXLE's AI usage matches Lapisan's rows |
| Lock | `node tools/check-lock.mjs` passes for the product |
