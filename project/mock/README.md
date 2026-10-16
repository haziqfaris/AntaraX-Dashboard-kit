# REKA project template: mock

Drawn to [SPEC.md](../SPEC.md) v1.0 for a fictional client, Seri Teguh Engineering Sdn Bhd, and its maintenance project, Asset Care.

- Live canvas (private until shared): https://claude.ai/artifact/CtvPCiujZspqsh95Xcsrzt.

| File | Board | Shows |
|---|---|---|
| `Main.dc.html` | Overview | The three dashboards, what a project keeps from the shell, what it never uses, the logo-swap test beside a Janka bar, the credit, the framework. Marked `antarax-comparison`, because it shows an AntaraX product on purpose |
| `Workspace.dc.html` | Work orders | The client's workspace at full width: the shell's top bar order with Help and the account at the right, a left sidebar, figures, a table, the footer with "Built by REKA". Tweak: the theme (Neutral base, Client: forest, Client: harbour). Try: Help, then Contact support, opens YaraOne's front office in the project's look; the account menu's foot |
| `SignIn.dc.html` | Sign in | The client's brand on the left; Google and email, Show password, the client's legal links and "Built by REKA" at the foot. Try: Show |
| `Kit.dc.html` | The neutral base | Tokens as shadcn variables, type, shape, layout; controls, status badges, a dialog, a toast, an empty state; the two waits, a sweep and breathing rows |

`python3 tools/sync-brand-kit.py --check` fails if any of these boards (the overview aside) uses an AntaraX colour.
