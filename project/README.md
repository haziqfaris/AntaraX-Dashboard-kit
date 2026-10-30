# Building a REKA client project

Dashboards REKA builds for a client carry the client's brand and never look like an AntaraX product. They keep the shell's places (Help and the account at the top right, the standard pages, the shared words) and every standard nobody sees (owner, 16 Oct 2026).

| File | What it is |
|---|---|
| [SPEC.md](SPEC.md) | The standard, v1.2: what is kept from the shell, what makes it not AntaraX, the neutral base, the credit, the framework, YaraOne, the project's AXLE, the building blocks, buttons and links |
| [BRANDING.md](BRANDING.md) | Client branding, written for REKA's SOP: adopt the client's brand kit, or REKA's default without one; the bare minimum stays |
| [mock/](mock/README.md) | The complete set drawn for a fictional client: overview, workspace, sign-in, the base kit, the branding SOP, the building blocks, and the project's AXLE (Dashboard and R8) |

The live mock is a private claude.ai canvas (https://claude.ai/artifact/CtvPCiujZspqsh95Xcsrzt), shared by the owner.

## Step by step

1. **Start from the stack** in SPEC §5: Next.js, TypeScript, Tailwind, shadcn/ui, TanStack, React Hook Form with Zod, Supabase.
2. **Brand it by the SOP** ([BRANDING.md](BRANDING.md)): ask for the client's brand kit at kick-off; adopt it, or use REKA's default (the neutral base, their logo, one colour from the default set). Write it once in `client-brand.json`, set the base's variables from it (SPEC §3), and get the client's sign-off.
3. **Build the shell's places** from `app/SPEC.md` §2 to §4: the top bar's order with Help and the account at the right, the account menu, the standard pages.
4. **Add "Built by REKA"** to the sign-in foot, the account menu foot and the footer (SPEC §4).
5. **Embed YaraOne's front office** for feedback and support (`yaraone/EMBEDS.md`).
6. **Build to "Built right"** (`app/SPEC.md` §15) and the Never list.
7. **Use the building blocks** (SPEC §8) for lists, records, forms, imports, approvals, documents and files, rather than inventing new ones.
8. **Check:** `python3 tools/sync-brand-kit.py --project ../the-project` from this kit, the logo-swap test, and SPEC §9.
9. **Give it an AXLE** from `axle/` (SPEC §7, boards `AxleOverview` and `AxleR8`): one organisation, usually R8 Base, under an `axle` folder or `(axle)` route group.
