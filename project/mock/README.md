# REKA project template: mock

Drawn to [SPEC.md](../SPEC.md) v1.0 for a fictional client, Seri Teguh Engineering Sdn Bhd, and its maintenance project, Asset Care.

- Live canvas (private until shared): https://claude.ai/artifact/CtvPCiujZspqsh95Xcsrzt.

| File | Board | Shows |
|---|---|---|
| `Main.dc.html` | Overview | The three dashboards, what a project keeps from the shell, what it never uses, the logo-swap test beside a Janka bar, the credit, the framework. Marked `antarax-comparison`, because it shows an AntaraX product on purpose |
| `Workspace.dc.html` | Work orders | The client's workspace at full width: the shell's top bar order with Help and the account at the right, a left sidebar, figures, a table, the footer with "Built by REKA". Tweak: the theme (Neutral base, Client: forest, Client: harbour). Try: Help, then Contact support, opens YaraOne's front office in the project's look; the account menu's foot |
| `SignIn.dc.html` | Sign in | The client's brand on the left; Google and email, Show password, the client's legal links and "Built by REKA" at the foot. Try: Show |
| `Kit.dc.html` | The neutral base | Tokens as shadcn variables, type, shape, layout; controls, status badges, a dialog, a toast, an empty state; the two waits, a sweep and breathing rows |
| `Branding.dc.html` | Client branding SOP | Ask at kick-off; with a brand kit collect and map it, without one use REKA's default; the standards check and sign-off. What the brand decides and what our standards decide; the default set of six primaries with their contrast; the same screen with a brand kit, without one, and before the client chooses; `client-brand.json` |
| `Patterns.dc.html` | Building blocks | Record page with an activity timeline, form with errors summed up and a save bar, spreadsheet import with a check step, approval with a reason, a dashboard figure, a printed document on the client's letterhead, files, Find (⌘K), formats |
| `AxleOverview.dc.html` | The project's AXLE: Dashboard | The same AXLE standard for one client: what needs a person (tickets, a failed job), figures, the client card in place of an organisations list, recent staff actions |
| `AxleR8.dc.html` | The project's AXLE: R8 Base | One overall state, what needs an operator, services (including the YaraOne embed), jobs, recent operations |
| `AxleSidebar.dc.html`, `AxleTopBar.dc.html` | Shared by the AXLE boards | `axle/mock`'s sidebar and top bar, set for Asset Care: the client's monogram, one product-only box (Plants, PM templates), R8 Base |
| `client-brand.json` | | Asset Care's brand record: no brand kit, so REKA's default with Forest (`BRANDING.md`) |

The AXLE boards are marked `axle-board`: they use AXLE's own tokens, checked by the AXLE rule, plus the client's colours from `client-brand.json`. `python3 tools/sync-brand-kit.py --check` fails if any of these boards (the overview and the AXLE boards aside) uses an AntaraX colour.
