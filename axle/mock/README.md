# AXLE mock

Every standard AXLE page, drawn to [SPEC.md](../SPEC.md) v0.3 with AXLE · Janka as the example product and fictional data throughout. Dark sidebar and AntaraX top bar, light page.

- Live canvas (private until shared): https://claude.ai/artifact/NbWWVFkowB1rKddfSS5hmr. Press Play on any page; the sidebar links move between pages.
- The logos load from the canvas's asset store, so open the pages there rather than from disk.

| File | Page | Shows |
|---|---|---|
| `Main.dc.html` | Overview | The standard landing page (§8). Tweaks: Finance right, Open access |
| `Phone.dc.html` | Overview at 390px | The phone top bar and the drawer |
| `Organisations.dc.html` | Organisations | Every list (§9): stats strip as filters, search, sort, group, bulk actions, export |
| `Organisation.dc.html` | Organisation 360 | Readiness checklist, stage stepper, tabs: summary and timeline, members, plan and features, usage, integrations, errors and health, internal notes, branding, audit (§10.3) |
| `CreateOrganisation.dc.html` | New organisation | The five-step guided flow (§10.1) |
| `PlansFeatures.dc.html` | Plans & features | Plans, feature kinds, "why does this organisation have it?", quota overrides with a reason (§10.5) |
| `ModelsKeys.dc.html` | Models & keys | Masked keys, test and rotate, model per task with fallbacks, automatic switching and its log (§10.6) |
| `LiveTrace.dc.html` | Live trace | Verdict, what to fix, steps, raw events last (§10.6) |
| `Health.dc.html` | Health | Services, jobs with retry and cancel, backups and restore drills, alert rules (§10.9) |
| `Audit.dc.html` | Audit | Filters, export, before and after on every row (§10.8) |
| `Staff.dc.html` | Staff | The ladder, rights, two-step sign-in, controls disabled with "Needs Admin" (§5.2) |
| `Settings.dc.html` | Settings | Platform switches, each asking for a reason first (§8.6, §13.2) |
| `Costs.dc.html` | Costs, without the Finance right | The gate card and dashes instead of zeros (§5.2, §13.1) |
| `Sidebar.dc.html`, `TopBar.dc.html` | Shared | The sidebar and the AntaraX top bar every page imports |
