# The AntaraX shell for customer apps

**Version 0.2, draft for the owner, 15 Oct 2026.** Decided by the owner so far: the principle, the account at the top right, Help as its own button, and that the shell reaches beyond the top bar (§6 to §11). This is what every AntaraX product's customer app shares, and what it is free to make its own.

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
| Getting in | What the sign-in, invitation, reset and two-step screens hold, and their words (§6) | Their look, illustration and layout |
| Shared moments | The order of banners (§7); the notifications panel (§8); the Assist panel (§9); Send feedback (§10); what dialogs, toasts, errors and empty states say (§11) | How each looks |

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
| 7 | **Help** | A 44px button with a question mark, its own button in every product (owner, 15 Oct 2026). It opens a small menu: **User guide** (`/guide`), **Help centre** (`/help`), **What's new** (if the product keeps one), **Send feedback** (§10), **Contact support** (`support@go.antarax.ai`, brand kit 13 §2) |
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

The account lives in the top bar on every product, at the far right (owner, 15 Oct 2026). **It does not live at the foot of a sidebar.** Seven of eight products put it there today, but:

- **The top bar always exists.** A product may have no sidebar at all (AX Frame's map, tabs, a phone's bottom bar).
- **One place to look.** A customer moving between products finds their account in the same spot.
- **It stays visible.** A long menu cannot push it down, and a closed drawer on a phone cannot hide it.

The sidebar foot suits products whose sidebar is permanent. Here each product chooses its own navigation, so only the top bar is certain.

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

- **Settings has one home** (proposed; the owner is not yet sure). Every setting lives under `/settings`, with the product's own sections after the standard ones. A product may also show a setting next to the thing it affects, as a shortcut (Yara's workflow stages beside its board), but the same setting is always in `/settings` too, so a customer can always find it there.
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

## 6 Getting in

The words and what each screen holds are shared. How they look is the product's own.

| Screen | Address | Holds |
|---|---|---|
| **Sign in** | `/signin` | The product mark and "by AntaraX" · Continue with Google · email and password, or a one-time email link where the product offers it · "Forgot your password?" · Help (`/help`) · Privacy and Terms at the foot |
| **Create an account** | `/signup` (where the product lets people sign themselves up) | The same, plus the plan they are starting on, by its brand kit name |
| **Join from an invitation** | `/invite/‹code›` | "‹Person› invited you to join ‹Organisation› on ‹Product›", their role, then sign in or create an account. An expired or used link says so and offers to ask for a new one |
| **Reset your password** | `/reset` | Email, then "If an account exists for that email, we've sent a link". It never confirms whether an account exists |
| **Two-step sign-in** | after sign-in | The code, "Use a backup code", and Help |
| **Signed out** | after Sign out | Back to sign-in, with "You've signed out" |

- **Words:** Sign in, Sign out, Create an account, Invite, join (brand kit 13 §1); never Log in, Login, Register.
- **Errors say what failed:** "That password didn't match", never "Oops" (brand kit 03).

## 7 Banners

A banner is a full-width strip directly under the top bar, for a state that holds across pages. When several apply, they stack in this order, and each says what is happening and what to do.

| # | Banner | When | Says |
|---|---|---|---|
| 1 | **REKA support is here** | A REKA support session is open in this organisation | Who, until when, and "End session" for Owners and Admins (axle SPEC §11) |
| 2 | **Something is down** | The product or a service it needs is failing | What does not work, and what still does |
| 3 | **Maintenance** | Planned work is due or under way | When, and what will be unavailable |
| 4 | **Plan** | A trial is ending, a limit is near, or a payment failed | The date or the limit, and "Plan and billing" for Owners; others see who to ask |
| 5 | **Sample data** | The organisation is looking at sample or demo data | "You're looking at sample data", and how to start with their own |

- **The colours** come from the product's palette, with the status colours for 2 and 4 when something is wrong.
- **The order and the words** are shared.
- **Dismissing:** a banner that can be dismissed stays dismissed for that person until the state changes. Banners 1 to 3 cannot be dismissed.

## 8 Notifications

For products that have notifications (top bar item 6):

- **The bell** carries a count of unread items, up to 99+.
- **The panel** opens from the bell, newest first. Each item shows:
  - what happened;
  - where (the record or page);
  - when;
  - unread or read.
- **At the panel's head:** "Mark all as read". At its foot: "See all", going to the product's own page, and "Notification settings", going to `/account` (which emails a person gets).
- **Clicking an item** opens the record it is about and marks it read.

## 9 Assist

For products with AI (brand kit 12, 13 §1):

- **Name and place.** It is called **Assist**, with the AntaraX sparkle. Angka keeps **Ask Angka**. It sits in the top bar's product slot, never as a floating bubble over Help or the account.
- **The panel** opens from the right side of the page, beside the work, never over the top bar. It holds the conversation, a box to ask, and the thinking motion while it works (brand kit 04).
- **Every answer:**
  - shows the sparkle;
  - says what it is based on (the records it read);
  - offers "Helpful" and "Not helpful", which reach AXLE.
- **One line at the foot:** "Assist can make mistakes. Check anything important."
- **Never in the panel:** model or provider names, prompts, or costs (axle SPEC §12).

## 10 Feedback

- **Where:** "Send feedback" is in the Help menu of every product.
- **What it opens:** a short form with what they were doing (the page is filled in) and what happened, an optional screenshot, and "Send".
- **After sending:** "Thanks. The team at REKA reads every message."
- **Where it goes:** to AXLE → Watch → Feedback for that product (axle SPEC §7.3).

## 11 Dialogs, toasts, errors and empty states

What they say and how they behave are shared; how they look is the product's own.

- **Confirming a destructive action:**
  - name the thing and the consequence;
  - the button names the action ("Delete Tegap Fabrication");
  - deleting an organisation asks for its name to be typed.
- **Toasts:** past tense, one line ("Invitation sent"), with Undo where it can be undone, at the bottom of the page, away from the top bar.
- **Error pages:**
  - "We can't find that page" (404) or "Something went wrong on our side" (500);
  - with a link home, Help, and the request id in small mono type.
  - The top bar stays.
- **Empty states:**
  - say what will appear here and how to start ("No work orders yet. Create one to start.");
  - the product's motif may appear (brand kit 12).
- **No false zeros:** a figure that is hidden or not yet known is a dash with the reason, never `0` (brand kit 13 §3).
- **Formats:** dates, times, money and numbers follow brand kit 13 §3. Money in more than one currency is grouped, never converted silently.
- **Keyboard:**
  - `⌘K` or `/` opens search where the product has it;
  - `Esc` closes any menu, panel or dialog;
  - `?` lists the product's shortcuts where it has any;
  - a "Skip to content" link is the first thing on every page.

## 12 How to prove it

| Check | Passes when |
|---|---|
| **Same places** | On three random pages of any two products: the brand pill is at the top left, Help is second from the right, the account is at the far right |
| **Account menu** | Its items appear in §3's order; Sign out asks first; the foot carries "by AntaraX", Privacy and Terms |
| **Standard pages** | `/account`, `/settings`, `/settings/members`, `/settings/billing`, `/guide`, `/help`, `/legal/privacy` and `/legal/terms` all open, and each holds §4's first items in order |
| **Words** | No "Log out", "Organization", "user" on screen, "Preferences" or "Admin panel" (brand kit 13 §1) |
| **Phones** | At 390px, Help and the account are one tap away on every page, and nothing in the bar overlaps |
| **Own palette** | Every colour in the shell comes from the product's palette in the brand kit, or the shared status and focus colours |
| **Getting in** | Sign in, invitation, reset and two-step screens hold §6's items; reset never reveals whether an account exists |
| **Banners** | With two states at once (sample data and a trial ending), both show, in §7's order |
| **Feedback** | Send feedback from Help arrives in AXLE → Feedback for that product, with the page filled in |
| **Assist** | No model, provider, prompt or cost appears in the panel or its network responses |
| **Accessibility** | The brand kit 13 §10 baseline; every shell control has a name; the account menu traps focus and closes on Escape |

## 13 What each product changes

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

## 14 Open questions

1. ~~**The list itself.**~~ Decided 15 Oct 2026: right, and extended to getting in, banners, notifications, Assist, feedback, dialogs, toasts, errors and empty states (§6 to §11). Anything else that should be shared is added here first.
2. ~~**Account at the top right.**~~ Decided 15 Oct 2026 (§3).
3. ~~**Help as its own button.**~~ Decided 15 Oct 2026 (§2.1).
4. **Settings in one home.** Proposed in §4: everything under `/settings`, with shortcuts beside the work allowed. The owner is not yet sure.
5. **What's new.** Should every product keep one, under Help?
6. **Sign-in with Google and email for every product**, or each product's choice of methods?
