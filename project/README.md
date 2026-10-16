# Building a REKA client project

Dashboards REKA builds for a client carry the client's brand and never look like an AntaraX product. They keep the shell's places (Help and the account at the top right, the standard pages, the shared words) and every standard nobody sees (owner, 16 Oct 2026).

| File | What it is |
|---|---|
| [SPEC.md](SPEC.md) | The standard, v1.0: what is kept from the shell, what makes it not AntaraX, the neutral base, the credit, the framework, YaraOne, AXLE |
| [mock/](mock/README.md) | The template drawn for a fictional client: overview, workspace, sign-in, the base kit |

The live mock is a private claude.ai canvas (https://claude.ai/artifact/CtvPCiujZspqsh95Xcsrzt), shared by the owner.

## Step by step

1. **Start from the stack** in SPEC §5: Next.js, TypeScript, Tailwind, shadcn/ui, TanStack, React Hook Form with Zod, Supabase.
2. **Set the neutral base** (SPEC §3) as shadcn's CSS variables, then put the client on top: their logo, one primary colour that passes 4.5:1 with white, and their typeface if they have one.
3. **Build the shell's places** from `app/SPEC.md` §2 to §4: the top bar's order with Help and the account at the right, the account menu, the standard pages.
4. **Add "Built by REKA"** to the sign-in foot, the account menu foot and the footer (SPEC §4).
5. **Embed YaraOne's front office** for feedback and support (`yaraone/EMBEDS.md`).
6. **Build to "Built right"** (`app/SPEC.md` §15) and the Never list.
7. **Check:** `python3 tools/sync-brand-kit.py --project ../the-project` from this kit, the logo-swap test, and SPEC §8.
8. **Give it an AXLE** from `axle/`, usually R8 Base with one organisation.
