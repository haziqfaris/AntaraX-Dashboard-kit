# The AntaraX shell for customer apps

**Version 0.1, draft for the owner, 15 Oct 2026.** This is what every AntaraX product's customer app shares, and what it is free to make its own.

**The rule (owner, 15 Oct 2026).** AXLE is the same in every product ([axle/](../axle/README.md)). A customer app is the opposite: each product has its own identity, shape, theme and UI. A small shell is the exception. It stays the same in every product so that a customer who uses two AntaraX products, or moves from one to another, always finds the same things in the same places:

- the names;
- the top bar;
- where the account and help are;
- the standard links and pages behind them.

This spec draws on the [inventory](../inventory/README.md) of eight customer apps and on the brand kit. Brand kit guide 13 §1 fixes the words, §2 the addresses, §8 help and §10 accessibility. Guide 12 sets the AntaraX layer and colour in product apps, and guide 14 the product palettes. Where the brand kit already decides something, this spec points to it rather than repeating it.

## 1 Shell or own

| | **The shell: the same in every product** | **Own: the product decides** |
|---|---|---|
| Top bar | Its anatomy and order, the brand pill, where Help and the account sit (§2) | Its colours, from the product's palette; what goes in the product's slot (§2.3) |
| Navigation | That every page is reachable within two steps from the top bar or the product's own navigation; Help and the account are never hidden in it | Its shape: sidebar, top tabs, bottom bar on phones, a canvas with no menu, anything. Group names, icons, order |
| Account | The account button and the contents and order of its menu (§3) | Its avatar style, within the palette |
| Standard pages | That they exist, where they live, what each holds first (§4) | How they look; extra sections after the standard ones |
| Words | Brand kit 13 §1: organisation, member, Owner · Admin · Member · Viewer, Invite, Plan and Billing, Sign in and Sign out, Settings, Assist | Words for the product's own things (a job card, a forecast, a bay) |
| Look | Poppins and JetBrains Mono, the status colours, the AntaraX-blue focus ring, 44px targets, the accessibility baseline (13 §10) | Palette, ground, surfaces, radius, density, illustration, motion, charts, dark mode, every layout, every component |
| The AntaraX layer | The eight touchpoints in brand kit 12: credit line, motif, AI sparkle, thinking motion, shared core, intan eyebrow, app tile, footer | How each touchpoint sits within the product's own style |

Anything not named as shell is the product's own.

## 2 The top bar

### 2.1 Anatomy

Left to right, always in this order. An item shown "if" appears only when the product has that feature; when it is absent, nothing takes its place.

| # | Item | Rule |
|---|---|---|
| 1 | **Menu button** | Only when the product's navigation is a drawer at this width. 44px, round, before everything else |
| 2 | **Brand pill** | A well holding two parts. **The AntaraX A**, linking to antarax.ai and named "AntaraX". **The product chip**: the product mark and its name, linking to the app's home. Same anatomy as AXLE's (axle SPEC §6), in the product's colours |
| 3 | **Page title** | The page's `h1`, after a divider, cut with an ellipsis. May be hidden where the page shows its own large title right below |
| 4 | **Product slot** | The product's own controls: Add, Assist, a date range, a site picker, a mode switch. Anything, in the product's style. It never pushes items 5 to 8 out of view |
| 5 | **Search** (if) | A field, or a 44px button on narrow screens. `⌘K` or `/` opens it, if the product has a palette |
| 6 | **Notifications** (if) | A 44px bell with a count, opening a panel; "See all" goes to the product's own page |
| 7 | **Help** | A 44px button with a question mark, opening a small menu: **User guide** (`/guide`), **Help centre** (`/help`), **What's new** (if the product keeps one), **Contact support** (`support@go.antarax.ai`, brand kit 13 §2) |
| 8 | **Account** | A 44px round button with the person's photo or initials, always last, always at the far right (§3) |

### 2.2 Size and shape

- **Fixed:**
  - the bar is at the top of every signed-in page;
  - 64px tall on desktop and 58px on phones;
  - every control is 44px;
  - the right-hand order (5, 6, 7, 8) never changes.
- **The product's own:**
  - whether the bar floats as a card in the gutter (as in Yara, Janka, Grid and AX Frame today) or spans the width;
  - its corner radius, surface and border;
  - its shadow.

### 2.3 Colour

The bar is drawn in the product's own palette, from `tokens/product-palettes.css` in the brand kit:

- **The bar:** `surface-raised`.
- **The text:** the palette's text roles.
- **The product chip:** tinted with the product's accent (`tint` or `subtle`).
- **The count on the bell:** the product's accent, or `fault` when something failed.
- **Exceptions:**
  - **Dark mode:** a product that offers it uses its dark palette for the bar (brand kit 13 §10).
  - **The focus ring:** always AntaraX blue.

### 2.4 Phones

Below the product's drawer width, three things are fixed:

- **Kept in the bar:** the brand pill (the product chip may drop its name and keep its mark), Help and the account.
- **Moved into the product's navigation or the product slot:** search and notifications.
- **Help and the account stay one tap away on every page.** If the product uses a bottom bar, Help and the account still live in the top bar, never in the bottom bar.

## 3 The account button and menu

The account lives in the top bar on every product. **It does not live at the foot of a sidebar.** Seven of eight products put it there today, but a product without a sidebar would then have nowhere to put it, and a customer moving between products would look in different places.

The menu, top to bottom. An item marked "if" is left out when it does not apply; the order of the rest never changes.

| # | Item | Shows | Goes to |
|---|---|---|---|
| 1 | **The person** | Photo or initials, name, email, role in this organisation (Owner, Admin, Member, Viewer, or a product role such as Supervisor) | |
| 2 | **Organisation** | The current organisation's name. **Switch organisation** (if they belong to more than one) | A list of their organisations |
| 3 | **Your account** | | `/account` |
| 4 | **Settings** | | `/settings` |
| 5 | **Plan and billing** (if the person is an Owner) | The plan name, from the brand kit's ladder (Seed, Terra, Nova, Galaxy, Quantum; Angka keeps its own) | `/settings/billing` |
| 6 | **Appearance** (if the product offers dark mode) | Light, Dark, System | Changes in place |
| 7 | **Language** (if the product offers more than one) | English, Bahasa Melayu | Changes in place |
| 8 | **Help** (phones only, where the Help button does not fit) | User guide, Help centre, Contact support | As §2.1 |
| 9 | **Sign out** | Asks first: "Sign out of ‹Product›?" | The sign-in page |
| 10 | **Foot** | "‹Product› by AntaraX", the version, Privacy and Terms | `/legal/privacy`, `/legal/terms` |

- **REKA support inside an organisation:** a banner across the top of every page names REKA support and when the session ends (brand kit 13 §1, axle SPEC §11). The account button shows the REKA person's initials with a "Support" ring.
- **Sample data:** a product showing sample data says so in the product slot or a banner, never inside the account menu.

## 4 Standard pages

Every product has these pages at these addresses. What each holds first is fixed; how it looks is the product's own, and a product may add its own sections after the standard ones.

| Address | Page | Holds first, in this order | Who |
|---|---|---|---|
| `/account` | Your account | Name and photo · Email and sign-in (password or Google; two-step sign-in) · Notifications (what is emailed) · Sessions (signed-in devices, "Sign out everywhere") | Everyone |
| `/settings` | Settings | Organisation (name, logo, time zone, currency) · Members (`/settings/members`: list, roles, Invite, pending invitations) · Plan and billing (`/settings/billing`) · then the product's own sections (integrations, sites, units…) · Danger zone last (leave or delete the organisation) | Admins and Owners change; Members and Viewers read what applies to them |
| `/settings/members` | Members | Who is in the organisation, their role, last active; Invite; pending invitations with resend and cancel | Admins and Owners |
| `/settings/billing` | Plan and billing | Current plan and what it includes · usage against limits · invoices · payment method · change plan | Owners |
| `/guide` | User guide | REKA's user-guide format: task IDs, steps, a screenshot, "You should see" (brand kit 13 §8) | Everyone |
| `/help` | Help centre | Answers to common questions; public before sign-in where not private; Contact support at the foot | Everyone |
| `/legal/privacy`, `/legal/terms` | Privacy and Terms | The legal texts; `privacy@go.antarax.ai` as the contact | Everyone, signed in or not |

- **Settings has one address.** A product that today scatters settings (organisation in one place, members in another, billing in a third) gathers them under `/settings`, with the product's own sections after the standard ones.
- **The sign-in page** carries the product mark, "by AntaraX", a Help link and the product's own look.

## 5 The AntaraX layer, as it applies to the shell

- **Credit line:** "‹Product› by AntaraX", at the foot of the account menu and on sign-in. The product may also show it at the foot of its own navigation.
- **AI:**
  - the product's AI entry carries the AntaraX sparkle, and its name is **Assist** (Angka keeps **Ask Angka**);
  - it lives in the product slot;
  - it is never a floating chat bubble that covers the account or Help.
- **Focus, type and status:**
  - the AntaraX-blue focus ring on every shell control;
  - Poppins and JetBrains Mono;
  - status colours only on real signal.

## 6 How to prove it

| Check | Passes when |
|---|---|
| **Same places** | On three random pages of any two products: the brand pill is at the top left, Help is second from the right, the account is at the far right |
| **Account menu** | Its items appear in §3's order; Sign out asks first; the foot carries "by AntaraX", Privacy and Terms |
| **Standard pages** | `/account`, `/settings`, `/settings/members`, `/settings/billing`, `/guide`, `/help`, `/legal/privacy` and `/legal/terms` all open, and each holds §4's first items in order |
| **Words** | No "Log out", "Organization", "user" on screen, "Preferences" or "Admin panel" (brand kit 13 §1) |
| **Phones** | At 390px, Help and the account are one tap away on every page, and nothing in the bar overlaps |
| **Own palette** | Every colour in the shell comes from the product's palette in the brand kit, or the shared status and focus colours |
| **Accessibility** | The brand kit 13 §10 baseline; every shell control has a name; the account menu traps focus and closes on Escape |

## 7 What each product changes

From the [inventory](../inventory/README.md). Everything else in each app stays as it is.

| Product | Top bar | Account | Standard pages |
|---|---|---|---|
| Yara | Has the pill; add the Help button | Move from the sidebar foot to the top bar | Has `/help` and `/guide`; gather settings under `/settings` |
| Janka | Has the pill; add Help | Move from the sidebar foot | Has `/guide`; add `/help`; gather settings |
| PLExyz Grid | Has the pill; add Help | Move from the sidebar foot | Add `/guide` (the guide is a modal today) and `/help` |
| AX Frame | Has the pill; add Help (Support & FAQ is in the profile menu today) | Move from the sidebar foot; "Workspace" stays for workspaces, the account is the organisation | Add `/guide` |
| Angka | Add the AntaraX pill (it has an Angka / Lapis toggle, which moves to the product slot) | Move from the sidebar foot; Help moves from the profile menu to the Help button | Has help in the profile menu; add `/guide` |
| Tinara | Add a top bar | Move from the sidebar foot | Add `/guide` and `/help`; "by REKA" becomes "by AntaraX" |
| PLExyz Crowd | Add a top bar; remove AXLE from the customer app | Move from the sidebar foot | Add all |
| Lapisan Console | Has the pill and the account in the top bar already | Already right | Add `/guide` and `/help` |

## 8 Open questions

1. **The list itself.** Is §1 the right line between shell and own? Possible additions: the sign-in page layout, the empty-state wording, the notification panel. Possible removals: the page title in the bar.
2. **Account at the top right.** This moves it for seven products. Confirm.
3. **Help as its own button**, or as items in the account menu only (smaller bar, one more tap)?
4. **Settings in one place** (`/settings`), even where a product shows some settings in context today.
5. **What's new.** Should every product keep one, under Help?
