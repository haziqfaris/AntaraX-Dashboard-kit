# AXLE mock

Every standard AXLE page, drawn to [SPEC.md](../SPEC.md) v0.6 (REKA standard v0.2, with R8 Base for every product and R8 Full where there is machinery) with AXLE · Janka as the example product and fictional data throughout. Dark sidebar and AntaraX top bar, light page.

- Live canvas (private until shared): https://claude.ai/artifact/NbWWVFkowB1rKddfSS5hmr. Press Play on any page; the sidebar links move between pages.
- The logos load from the canvas's asset store, so open the pages there rather than from disk.

| File | Page | Shows |
|---|---|---|
| `Main.dc.html` | Overview | The standard landing page (§8). Tweaks: Finance right, Open access |
| `Phone.dc.html` | Overview at 390px | The phone top bar and the drawer: the Dashboard · R8 switch (it changes only the menu), the AXLE standard groups, the dashed Janka-only box. Tweak: start with the drawer open |
| `Organisations.dc.html` | Organisations | Every list (§9): stats strip as filters, search, sort, group, bulk actions, export |
| `Organisation.dc.html` | Organisation 360 | Readiness checklist, stage stepper, tabs: summary and timeline, members, plan and features, usage, integrations, errors and health, internal notes, branding, audit (§10.3) |
| `CreateOrganisation.dc.html` | New organisation | The five-step guided flow (§10.1) |
| `PlansFeatures.dc.html` | Plans & features | Plans, feature kinds, "why does this organisation have it?", quota overrides with a reason (§10.5) |
| `ModelsKeys.dc.html` | Models & keys | Masked keys, test and rotate, model per task with fallbacks, automatic switching and its log (§10.6) |
| `LiveTrace.dc.html` | Live trace | Verdict, what to fix, steps, raw events last (§10.6) |
| `Health.dc.html` | R8 · Services | Services, jobs with retry and cancel, backups and restore drills, alert rules (§7.4, §10.9). Every product has it, Base or Full |
| `Audit.dc.html` | Audit | Filters, export, before and after on every row (§10.8) |
| `Staff.dc.html` | Staff | The ladder, rights, two-step sign-in, controls disabled with "Needs Admin" (§5.2) |
| `Settings.dc.html` | Settings | Platform switches, each asking for a reason first (§8.6, §13.2) |
| `R8.dc.html` | R8 Overview | One overall state, needs an operator (each opens Troubleshoot), platform services, Janka's machinery, incidents, recent operations (§8.1, std M3) |
| `Troubleshoot.dc.html` | R8 · Troubleshoot | INC-0412: evidence in layers (outside, inside, application), timeline, AXLE's reading kept apart from your conclusion, Level 1 safe actions only (§10.11, §14.1, std M10–M12) |
| `Incidents.dc.html` | R8 · Incidents | Stats by state as filters; the list worst first; one incident with its lifecycle (open, acknowledged, recovered, closed), affected organisations and assets, source signals, notes, recovery evidence. Try: acknowledge INC-0413, suppress it (always until a set time, with a reason), close the recovered INC-0410 with its evidence (§7.4, std M9) |
| `Jobs.dc.html` | R8 · Jobs | Every job in plain-words schedules; one job with eligible, processed, failed and skipped, why items failed, the last 14 durations, recent changes, and raw cron only under Advanced. Try: retry only the 3 failed digest emails, cancel the stuck Sheets import, run now, pause (§7.4, std M4) |
| `Providers.dc.html` | R8 · Providers | Every outside dependency worst first, with calls, success rate, median time and quota exposure; one provider with its facts, calls per hour, what depends on it, and Test provider (a result and a time, never a key). Try: test Gemini, then Claude (§7.4, std M5) |
| `Configuration.dc.html` | R8 · Configuration | Setup as set or missing, never values; schedules in plain words; limits; changes. Tweak "Who is looking": as Operator every change says Needs Admin; as Admin, change the Sheets import limit to 20 min, enforced, for INC-0413 (§7.4) |
| `Navbars.dc.html` | Navbars per product | The top bar and both sidebar modes for Janka, Yara, AX Frame, Angka, PLExyz Grid and Tinara: AXLE standard above, the dashed product-only box below. Yara and PLExyz Grid are R8 Base (no Incidents, no Observe); the others are R8 Full (§7, §7.5) |
| `NavVariants.dc.html` | Navbar variations | Five ways to organise the same 29 Dashboard pages for Janka: A by area with the standard first (the spec today), B by task, C product first, D pinned then A to Z, E rail and panel. Each with what it is good for, what it costs and when it fits |
| `NavCollapse.dc.html` | Collapse styles for layout A | Five ways a group opens and closes: A1 quiet headings (the mock today), A2 tree with icons, A3 one open at a time, A4 cards with a preview line and collapse all, A5 top two pages then "more". Every style keeps the orange roll-up and opens the current page's group |
| `NavTitles.dc.html` | Card titles | The chosen sidebar: folding cards with an icon tile and a title in each group's colour, the selected page as an orange tint with no side stripe; in Dashboard and R8. Three alternatives for comparison: one blue, white titles with tiles, colour without tiles |
| `Costs.dc.html` | Costs, without the Finance right | The gate card and dashes instead of zeros (§5.2, §13.1) |
| `Sidebar.dc.html`, `TopBar.dc.html` | Shared | The sidebar and the AntaraX top bar every page imports; both take the product, and the sidebar takes the mode (Dashboard or R8). Groups collapse; Organisations, Money, Platform and Trail start closed here to show the orange roll-up (§7.2) |
