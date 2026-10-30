# Changelog

The Dashboard kit has one version for all its standards (owner, 16 Oct 2026). Products pin it in `antarax-kit.lock` ([app/README.md](app/README.md#pin-the-kit)). Each release is tagged `v<version>` on `main`.

- **Major:** a product built to the previous version no longer conforms (a place, an order or a size changes).
- **Minor:** something new to adopt, or a rule tightened with a recorded way out.
- **Patch:** wording, mocks and tools only.

Every change needs an owner decision, recorded in the brand kit's `guide/10-decisions-log.md`.

## 1.12.0 · 30 Oct 2026

Minor: something new to adopt in AXLE Central. AntaraX email 0.8.0 (antarax-api docs/15 §15.11, built 30 Oct 2026) has provider accounts ("teams"), senders registered as data and domains clients bring, managed only from AXLE Central; this designs its pages, as §15.11 "Still to come" asks.

- **axle/SPEC.md 1.7, §10.14 In AXLE Central**, four new parts:
  - **Teams** (`GET /internal/axle/v1/email/teams`): each team's sending domain, Ready or Not ready with the secret to add ("Add RESEND_KEY_REKA"), delivery reports, standby (`mailer.antarax.ai` or None), and today's emails against its day's cap with the security reserve. No key value ever appears;
  - **Senders** (`GET /internal/axle/v1/email/senders`): AntaraX's products In code and read only; senders Registered as data, with Edit;
  - **Register a sender** (`PUT /internal/axle/v1/email/senders/{service}`): service id, team, name, address (defaults to service@ the team's domain), origins, action and ground colours, reply-to, byline (optional), legal and support lines. The service's rules are the help text: address on the team's domain or a verified one; https origins only; reply-to a mailbox someone reads. After saving, "Put SVC_KEY_‹SERVICE› on the Worker";
  - **Client domains** (`GET` and `POST /internal/axle/v1/email/domains`, `POST …/domains/{name}/verify`): Add a domain (name and team) returns the DNS records (type, name, value, priority, status, each with Copy); Verify; Pending, Verified and Failed in words, never by colour alone. A team with no key, a team's own domain, another team's domain and the antarax team are refused in words.

  Only Admin registers senders and adds or verifies domains; Operator reads.
- **Mock:** `CentralEmail.dc.html` gains the three sections after The service, with `pe` on reka (`pe@mail.reka.re`, links on `https://pe.reka.re`) just saved, and `mail.client.example` on rekatech with a DKIM TXT, an MX and an SPF TXT. A new tweak, "The rekatech team", steps through no key yet, pending, verified and failed. The service card reads antarax-api 0.8.1. Canvas board 6200px tall.
- **Known gap, not changed here:** the Products figures (per-product limit of 1,000 and sends in the hundreds) predate the shared account cap of 0.7.6 (80 a day on Resend Free), so they disagree with the antarax team's "12 of 80". Figures are illustrative; bringing them in line is a later patch.

## 1.11.0 · 30 Oct 2026

Minor: a new page to adopt in AXLE Central (owner, 18 Oct 2026; drafted as 1.6.0 on its branch and renumbered when main, at 1.10.0, was merged in; brand kit guide/10, the email look decided on 18 Oct 2026). AntaraX email is live with AXLE Central's operator-only routes (antarax-api 0.7.5, docs/15 §15.10), so Central gets its Email page.

- **axle/SPEC.md 1.6, §10.14 In AXLE Central.** Email across every product, read through `/internal/axle/v1/email/` with Central's own key:
  - the sending line for the whole service;
  - **Needs a person** first: open alerts, worst first, each naming the product, in words, with since when, opening the list filtered to it;
  - a row per product: sent, delivered, bounced, spam, failed, delivery rate, its day's limit used, its alert in a word; Angka as "Deferred: sends its own email";
  - the last 7 days by status as filters, and every email across products with a product column and filter;
  - one email opened, with attempts and provider events, and a link into the product's AXLE;
  - **Is this address blocked?** across every product: **Lift the bounce** only here, Admin rung, the person's request as the reason, audited with the masked address; spam marks listed with their product and lifted in that product's AXLE;
  - the alerts, open and cleared in 7 days, also emailed hourly to the operators;
  - the service: production and staging, Resend, the sending domain, replies, delivery reports last heard.

  The old "AXLE Central (later)" bullet is replaced; product AXLEs are unchanged.
- **Mocks:**
  - new `axle/mock/CentralEmail.dc.html`, on the canvas beside Email. It imports the product sidebar and top bar, as no Central variant exists yet (the mock README says so);
  - `Email.dc.html`: main had already brought its colours to brand tokens (1.7.0); the selected row keeps the orange border with no side stripe (axle/README.md, Never).

Also in 1.11.0 (drafted as 1.5.1):

- `BRIEF.md`: Email is in what is decided, and the rendered email reference in where things are. AntaraX email is live (antarax-api 0.7.4) and every email now carries the brand kit's layout with the family's BaTech band (brand kit, decisions of 18 Oct 2026). Nothing for a product to change in its AXLE.

## 1.10.0 · 26 Oct 2026

Minor: a rule tightened for every product (owner, 26 Oct 2026; the lead adds it to brand kit guide/10). The owner saw a blue text link reading "Remove…" in a product and asked that an action always be a button and that no label end in "…".

- **The rule, in three specs:**
  - **app/SPEC.md 1.7, new §11b "Buttons and links":** an action is a button in one of the product's button styles (primary, secondary, ghost, destructive), 44px on touch; a link only goes somewhere and always has a real `href`; Remove and Delete are destructive buttons, never coloured link text; no button, menu item, link, tab or placeholder ends in "…" or "...". Text cut short by CSS, the "⋯" button, an ellipsis standing for something left out and a button's busy words ("Saving…") are not affected. Also in §16 Never and §17.
  - **axle/SPEC.md 1.5, new §14.2:** the same in AXLE's button styles, with its destructive button in a dense row (white, `--axle-fault-line`, `--axle-fault-text`). Also in §15 Words, §19 and §20 (23).
  - **project/SPEC.md v1.2, new §8a:** the same in shadcn/ui's terms: `link` only for navigation, Remove and Delete `destructive`. Also in §2 and §9.
  - **actions/SPEC.md 1.1:** §7 Words gains the labels row and points to the rule.
- **`tools/check-shell.mjs`** now also reports, anywhere on the page and in both menus, a control, tab, menu item or placeholder whose label ends in "…" or "...", and any `<a>` with nowhere to go (no `href`, `href="#"`, `javascript:`). Busy controls and CSS truncation are skipped.
- **The kit brought into line:**
  - app mocks: Lists ("Save view" is a menu item; Clear filters a button), Settings ("Delete"), Moments (End session and Mark all as read are buttons), Support (Choose files is a button), AppBar (Sign out is a `<button role="menuitem">`, drawn as before), and every Actions board (Undo, Restore, Cancel, Retry and Download are small outlined buttons, not link text). Renders and values tables updated.
  - AXLE mocks: Start support session is a button on Organisation 360 and Tickets; End session in the support banner is a button; Email's Clear filters is a button; the dots are gone from Find, Suspend, Lock, Transfer ownership, Rotate, Roll back, Run now, Pause, Suppress, Change, Add staff, Switch for ‹organisation›, Start maintenance, Pause AI work, Switch on or off everywhere and Record a restore drill.
  - project mocks: Start support session and Find in its AXLE; the kit's ghost button is no longer underlined; Choose files is a button.
  - `app/reference/`: `.ax-menu-link` is replaced by `.ax-ghost-button` (Switch organisation, Cancel, Clear filters); "Save view" is a plain menu item; the demo's navigation links have real fragments. A product that copied `.ax-menu-link` renames it.
  - `yaraone/EMBEDS.md`: "Start support session".

## 1.9.0 · 25 Oct 2026

Minor: a rule tightened with a recorded way out (owner, 25 Oct 2026; AwanGan decision 0021; brand kit guide/10). A product that still holds its own keys stays as it is, recorded watch only.

- **AGENTS.md, "AI, APIs and data":** who owns what. AI follows Heuristiks, and its keys, models and routing are AwanGan's; API keys, tenants, scopes and usage rows are Lapisan's; data a business hands over goes to Cebis Loom; RESAM maps which framework governs what. A client's own system comes through AwanGan only with its written agreement.
- **axle/SPEC.md 1.4, §10.6:** the AI pages show the product's own share of AwanGan.
  - **Models & keys** is read only: the product's keys (last four only) and each feature's route as AwanGan holds them, with Open Routing in AwanGan. Before the product comes through AwanGan, the keys it still holds, marked watch only. No test or rotate in the product; Test provider stays in R8 → Providers.
  - **AI usage** reads Lapisan's usage rows for product `ai`: calls, errors, latency, cost by organisation, feature and model; budgets with alerts at 80% and 100%.
  - **Live trace** puts the verdict first, then the five steps (Asked, Allowed, Answered, Checked, Decided). A prompt, input or answer appears only where the agreement keeps it, masked, and opening one is recorded.
  - §5.2, §7.3, §7.4, §10.6.1 and §10.11 follow; §19 updates the AI check and adds Live trace; §20 records the decision (21) and asks how AI usage reads while a product is watch only (22).
- **Mocks:** `ModelsKeys.dc.html` is read only, with a tweak for Through AwanGan or Watch only; `LiveTrace.dc.html` shows the five steps and the rule for bodies; `Providers.dc.html` and `Configuration.dc.html` point keys to AwanGan, and Configuration lists the gateway address and the AntaraX key for product `ai`.
- **BRIEF.md:** a row for AI, APIs and data and one for their owners; the versions brought up to date (app spec 1.6, AXLE spec 1.4, tokens 1.11.0).

## 1.8.0 · 18 Oct 2026

Minor: something new to adopt (owner, 18 Oct 2026; brand kit guide/10).

- **actions/SPEC.md v1.0, a new standard for acting:** what happens when a person presses a button, in every customer app and every AXLE.
  - **§1, the bare minimum:** AC-01 to AC-12. No browser pop-ups; buttons that name the action and the thing; a visible busy state with no double submit; a result for every action; written errors with Retry; "Discard changes?"; accessible dialogs; bulk actions that report each item.
  - **§2, three levels of confirmation:**
    - undoable: no question, Undo for 8 seconds, Trash for 30 days;
    - consequential: a dialog;
    - irreversible: type the name and ask again for the password or a code; in AXLE, a second person too; more than 50 at once types the count.
  - **§3, by how long it takes:** the button under 2 seconds, a progress dialog with a count or steps over 2 seconds, a background job with a jobs panel over 30 seconds, and a way out after 10 seconds.
  - **§4–§7:** the result, dialogs, unsaved changes, the words.
  - **§10:** what each product and AXLE does today, read from the code on 18 Oct 2026, including the actions that destroy something with no question and the places where the screen says one thing and the code does another.
  - **§11:** what each product changes, in order.
- **New pieces:**
  - `app/reference/`: `ConfirmDialog.jsx` (Level 2 and 3), `ProgressDialog.jsx` and `useAction.js`, with styles in `shell.css`;
  - `tools/check-actions.mjs`: finds browser pop-ups, OK/Yes buttons and raw error messages.
- **Mocks:** `app/mock/ActionsScreens.dc.html` draws 22 states. Eight boards, `Actions<Product>.dc.html`, show it in each product's colours with its own records; renders and values tables are included.
- **app/SPEC.md 1.6:** §11 points to the new standard. **axle/SPEC.md 1.3:** §14 points to it, and irreversible actions ask again for the password or a code.

## 1.7.0 · 18 Oct 2026

Minor: something new to adopt (owner, 18 Oct 2026; brand kit guide/10).

- **getting-in/SPEC.md v1.0, a new standard for getting in.** It covers signing in, passwords, sign-in links, two-step sign-in, sessions and account changes, for every customer app and every AXLE.
  - **§1, the bare minimum:** GI-01 to GI-20. It includes Forgot your password, Show (reachable by keyboard), passwords of 12 to 64 characters with a breach check and no composition rules, a strength meter in words, the Caps Lock warning, `autocomplete`, never revealing whether an account exists, and slowing down then pausing after failed attempts. Also:
    - two-step for Owners and Admins, and for staff;
    - Email me a sign-in link in customer apps, never in AXLE;
    - links that expire and work once;
    - asking again before sensitive changes;
    - `/account`, and emails when a password or address changes;
    - no one chooses another person's password;
    - Sign out on this device only;
    - a session that ends says why.
  - **What it holds:** every screen with its words, links and lifetimes, two-step and recovery, protection, the account page, the AntaraX email template for each email, the words, accessibility, and how to switch each rule on in Supabase, Appwrite or your own auth.
  - **§14:** what each product had on 18 Oct 2026, read from its code.
  - **§15:** what each product changes.
- **app/SPEC.md:** §6 points to the new standard, and §15.1 moves there.
- **axle/SPEC.md:** §5.1.1 points to it for everything beyond the page's look.
- **`app/reference/PasswordField.jsx`:** Show, Caps Lock, `autocomplete`, the 64-character and 72-byte limit, and the meter in words (pass zxcvbn-ts). Its styles are in `shell.css`.
- **`tools/check-signin.mjs`:** checks a running product's sign-in, reset and sign-up screens: Forgot your password, Show and its tab order, `autocomplete`, paste, Caps Lock, the sign-in link (and its absence in AXLE), Continue with Google, and the words. With `--submit`, it also reads the reset reply.
- **Mock:** `app/mock/GettingIn.dc.html` shows the screens a product most often lacks, with its render and values table.
- **Every screen, per product:** `app/mock/GettingIn‹Product›.dc.html` for Yara, YaraOne, AX Frame, Janka, PLExyz Grid, PLExyz Crowd, Angka and Tinara. Each draws, in its own palette and shape, every screen and email of §3 (25 to 29 per product): signing in, Email me a sign-in link and its email, Forgot your password and its emails, two-step, joining and leaving, Create an account where the product has sign-up, and Yara's workers. All come from one component, `GettingInScreens.dc.html`, and each has a render and a values table. YaraOne's palette (jade `#087F5B`) is now in the brand kit and synced here: `app/tokens.css` has its shell slots.
- **AXLE:** `axle/mock/SignInScreens.dc.html` holds every AXLE sign-in screen and email, on the AXLE canvas.
- **Fix:** the AXLE Sign in and Email mocks (1.5.0, 1.6.0) used colours that aren't brand tokens, so `sync-brand-kit.py --check` failed. They now use tokens; the Google G is drawn in one colour, as AX Frame draws it.

## 1.6.0 · 18 Oct 2026

Minor: something new to adopt (owner, 18 Oct 2026; brand kit guide/10).

- **axle/SPEC.md v1.2, §5.1.1: the sign-in page every AXLE shares.** It is built from AX Frame's: the navy ground with the dotted blueprint, one card, the AntaraX A and `AXLE`, and "‹Product› · REKA staff console". Staff sign in with Continue with Google (REKA's company accounts, with Google's 2-Step Verification required) or with email and password followed by a six-digit code. The one Sign in is **AntaraX blue `#0459F7`**, the only place in AXLE whose main action is not orange.

  From Yara's page the standard keeps:
  - **Wrong door:** someone who isn't staff is signed out at once and pointed to the product's own sign-in.
  - **Links:** Help, Privacy and Terms.

  The words are fixed:
  - Sign in, never Log in or Enter AXLE;
  - Authorised, never Authorized.
- **Also in the AXLE spec:**
  - §4's accent row names the exception;
  - §5.1 states both ways in and the wrong-door rule;
  - §19 has a Sign-in check;
  - §20 records the decision.
- **Mock:** new `axle/mock/SignIn.dc.html`, with tweaks for the product and the starting state (sign in, two-step, wrong door). It is the first board on the AXLE canvas.

## 1.5.0 · 17 Oct 2026

Minor: something new to adopt (owner, 17 Oct 2026; brand kit guide/10, "Every product sends email through AntaraX email"). Every product sends its email through AntaraX email (`email.antarax.ai`, antarax-api docs/15, decision 0014), behind a switch; Angka is deferred.

- **axle/SPEC.md v1.1, §10.14 Watch → Email.** This is a new standard page, shown once a product's switch is on. It is read from AntaraX email through the product's server and holds:
  - the sending line;
  - the last 7 days by status, as filters;
  - every email, with a masked address and its template's class;
  - one email opened, with its attempts and what the provider reported;
  - **Is this address blocked?** A spam mark can be lifted by Support, with the person's request as the reason; a shared bounce cannot be lifted here;
  - the templates, read only.

  Never a body, subject, link, code or whole address.
- **Also in AXLE:**
  - **Needs a person** counts sign-in and service emails that did not arrive.
  - **Organisation 360** gains an Email tab, and Branding no longer offers a sender name.
  - **Platform → Settings** no longer holds email templates or the sender.
  - **R8 → Providers** has one AntaraX email row; Test provider is a dry run.
  - **R8 → Capacity** has two `messages` resources.
  - **R8 → Configuration** shows the two settings as set or missing.
  - §19 has an Email check, and §20 records the decision.
- **app/SPEC.md v1.4, §8.**
  - Email comes from `<Product> <product@mail.antarax.ai>` and replies go to `support@go.antarax.ai`.
  - `/account` → **Emails you get** lists only activity emails, each with a switch that the email's one-click unsubscribe also turns off.
  - Security and service emails cannot be turned off.
  - A bouncing address is shown beside the email.
  - §17 has an Email check.
- **capacity/:**
  - The README gains "Email, through AntaraX email", the two plans and resources every product copies.
  - The Janka example uses them.
- **Mocks:**
  - new `axle/mock/Email.dc.html`;
  - the sidebar and phone drawer gain Watch → Email (the drawer's stale "Feedback" is now Tickets);
  - Organisation 360 gains its Email tab, and the sender line is fixed;
  - Capacity shows AntaraX email's day's limit and the shared Resend plan;
  - published to the AXLE canvas.

## 1.4.0 · 16 Oct 2026

The AI framework's finished work, brought into the kit. The framework is at 0.5.0, built in its own session; its `main` still awaits the fast-forward.

- **axle/SPEC.md §10.6.1, R8 → AI flow** gains what framework 0.4 and 0.5 add, from the manifest and call records only:
  - free first;
  - where answers came from (model, cache, shared);
  - traffic and turn-aways as a scaling signal;
  - rollouts with Roll back;
  - alerts, retrieval freshness, and where the AI runs.
  
  §19's AI flow check counts reused and shared answers. The AIFlow mock draws all of it in "How it runs".
- **app/SPEC.md §9:** AI anywhere in a customer app uses the shared pieces in brand kit 13 §6b, "AI in the interface", with a new §17 check.

## 1.3.0 · 16 Oct 2026

Minor: something new to adopt (owner, 16 Oct 2026; brand kit guide/10).

- **Named saved views on every long list** (`app/SPEC.md` §11a, v1.3). A person saves the list as it is (search, filters, sort, group and view) under a name and picks it again from a Views menu beside search; "All ‹records›" comes first and cannot be deleted. Per person, renamed or deleted from the same menu, never in Settings. This completes the owner's list baseline: search, filters, sort and saved views.
- **Updated to match:** the Lists mock, with its render and values table; `reference/ListToolbar` takes `savedViews`, and `reference/useListState.js` adds `useSavedViews`; the demo saves and picks views; Before you ship (`app/README.md`).
- **For products:** adopt saved views on each long list when you next pin the kit.

## 1.2.1 · 16 Oct 2026

Resync with YaraOne (`1949e49`: its roadmap, docs/22; the start of AX Frame's side, docs/21 §7).

- **Four plain steps in the front office** (`yaraone/EMBEDS.md`, The words). The customer follows Received · Looking into it · Working on it · Done. Each request has a plain label and one sentence, and "Needs your answer" marks the customer's turn. These are the words of YaraOne's built portal. The team and the AXLE back office keep the seven states.
- **Updated to match:** app/SPEC.md §10 and the Support mock, with its render and values table.
- **The first embed host** is one REKA client app, before any AntaraX product (YaraOne roadmap Phase 2).

## 1.2.0 · 16 Oct 2026

Customer apps are checked against the kit, not read from it. A product built to `app/SPEC.md` v1.1 still did not look like the family; these close the gaps.

- **app/SPEC.md v1.2:**
  - §2.2: the floating bar is the default, with every value in a table. A product that differs records the value in the brand kit and the reason in its `antarax-kit.lock`. Tinara's flat bar is confirmed. PLExyz Grid floats (the mock had drawn it flat).
  - §2.5: the current navigation item is the product's subtle tint with on-tint text, never the same as hover. Navigation's shape stays the product's own.
  - §11a: a baseline for every long list, a customer version of AXLE §9.
  - §17: new checks: the bar measured, where you are, lists, pinned.
- **`app/tokens.css`**, generated from the brand kit's `shell` section (tokens 1.11.0) by `tools/sync-brand-kit.py`. It covers sizes, every product's colour slots, the recorded exceptions and dark mode, and is checked on every push.
- **`app/reference/`**: AppBar, BrandPill, RoundControl, HelpMenu, AccountMenu and ListToolbar in plain React and CSS variables, with a demo.
- **`tools/render-mocks.mjs`**: every shell mock rendered to PNG in `app/mock/renders/`, including the top bar in six products, wide and phone, light and dark. A values table sits beside each mock, and `--check` in CI fails when either is older than its mock.
- **`tools/check-shell.mjs`**: it measures a running product's bar against the tokens and saves its screenshot beside the reference PNG. `app/README.md` has a before-you-ship list.
- **AGENTS.md:** a gap table against the closest product's mock and the spec comes before any customer-app plan.
- **Mocks:**
  - the AppBar mock gained dark mode and a floating PLExyz Grid;
  - the current item follows §2.5 on every board;
  - a new Lists board.

## 1.1.0 · 16 Oct 2026

Merged as pull requests #1 to #9.

- AXLE: support sessions in every product, with the organisation's consent (§11).
- AXLE: R8 → AI flow, drawn from each product's AI manifest (§10.6.1).
- AXLE: R8 → Capacity and `capacity/`, every limit from any infrastructure (§10.13).
- **YaraOne embeds** (`yaraone/EMBEDS.md` v1.0): tickets and feedback live in YaraOne. The front office sits in each customer app and the back office in each AXLE.
- **The REKA project template** (`project/`, v1.1): the third dashboard, for client projects, with the client branding SOP.
- "Powered by" names a separate tool; never "Powered by AntaraX".

## 1.0.0 · 15 Oct 2026

- **AXLE v1.0** (`axle/`): the standard and template for every product's staff console. Its tokens are generated from the brand kit.
- **The AntaraX shell v1.1** (`app/`), for every customer app:
  - the top bar, the account and Help;
  - the standard pages, getting in and the shared moments;
  - animated waits, the customer admin area, Built right and Never.
