# Changelog

The Dashboard kit has one version for all its standards (owner, 16 Oct 2026). Products pin it in `antarax-kit.lock` ([app/README.md](app/README.md#pin-the-kit)). Each release is tagged `v<version>` on `main`.

- **Major:** a product built to the previous version no longer conforms (a place, an order or a size changes).
- **Minor:** something new to adopt, or a rule tightened with a recorded way out.
- **Patch:** wording, mocks and tools only.

Every change needs an owner decision, recorded in the brand kit's `guide/10-decisions-log.md`.

## 1.6.0 · 18 Oct 2026

Minor: a new page to adopt in AXLE Central (owner, 18 Oct 2026; brand kit guide/10, the email look decided on 18 Oct 2026). AntaraX email is live with AXLE Central's operator-only routes (antarax-api 0.7.5, docs/15 §15.10), so Central gets its Email page.

- **axle/SPEC.md v1.2, §10.14 In AXLE Central.** Email across every product, read through `/internal/axle/v1/email/` with Central's own key:
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
  - `Email.dc.html` uses only brand tokens again (`sync-brand-kit.py --check` failed on eight colours): the selected row is the selected-row tint with an orange border, no side stripe, and the template class chips and the disabled lift button use AXLE tokens.

## 1.5.1 · 18 Oct 2026

- `BRIEF.md`: Email is in what is decided, and the rendered email reference in where things are. AntaraX email is live (antarax-api 0.7.4) and every email now carries the brand kit's layout with the family's BaTech band (brand kit, decisions of 18 Oct 2026). Nothing for a product to change in its AXLE.

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
