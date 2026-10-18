# The AntaraX shell for customer apps

**Version 1.6, the standard (owner, 16 Oct 2026; 1.4 on 17 Oct 2026, Dashboard kit 1.5.0; 1.5 on 18 Oct 2026, Dashboard kit 1.7.0; 1.6 on 18 Oct 2026, Dashboard kit 1.8.0).** Every AntaraX customer app is built inside this shell; everything it does not name is the product's own. A new shared element is added here first, with the owner's decision, and never invented inside one product. 1.1 added logo, loading and motion (§12), the customer's own admin area (§13), the standards beneath the look (§15) and what never to do (§16). 1.2 makes the floating bar the default with exact values (§2.2), makes the current navigation item shared (§2.5), adds a baseline for long lists (§11a), and adds what a builder measures against: tokens (`app/tokens.css`), reference components (`reference/`), PNG renders of every mock with their values, and a conformance check (§17). 1.3 adds named saved views to every long list (§11a). 1.4 says where email comes from and which emails a person can turn off (§8). 1.5 moves signing in and passwords (§15.1) into their own standard, [getting-in/SPEC.md](../getting-in/SPEC.md). 1.6 moves confirming, waiting and results (§11) into [actions/SPEC.md](../actions/SPEC.md).

**The rule (owner, 15 Oct 2026).** AXLE is the same in every product ([axle/](../axle/README.md)). A customer app is the opposite: each product has its own identity, shape, theme and UI. A small shell is the exception. It stays the same in every product so that a customer who uses two AntaraX products, or moves from one to another, always finds the same things in the same places:

- the names;
- the top bar;
- where the account and help are;
- the standard links and pages behind them.

This spec draws on the [inventory](../inventory/README.md) of eight customer apps and on the brand kit. Brand kit guide 13 §1 fixes the words, §2 the addresses, §8 help and §10 accessibility. Guide 12 sets the AntaraX layer and colour in product apps, and guide 14 the product palettes. Where the brand kit already decides something, this spec points to it rather than repeating it.

## 1 Shell or own

| | **The shell: the same in every product** | **Own: the product decides** |
|---|---|---|
| Top bar | Its anatomy and order, the brand pill, where Help and the account sit, its sizes and its floating shape (§2) | Its colours, from the product's palette; what goes in the product's slot; a recorded exception to the shape (§2.2) |
| Navigation | That Help and the account are in the top bar, never in the product's navigation; how the current item and hover look (§2.5); the accessibility baseline (keyboard, `aria-current`, focus ring) | **The product's own** (owner, 15 Oct 2026): whether it has a sidebar at all, its shape (sidebar, top tabs, bottom bar, a canvas with no menu), groups, names, icons, order, size, how it collapses |
| Lists | The tools every long list offers (§11a) | How they look, paging, which views fit |
| Account | The account button and the contents and order of its menu (§3) | Its avatar style, within the palette |
| Standard pages | That they exist, where they live, what each holds first (§4) | How they look; extra sections after the standard ones |
| Words | Brand kit 13 §1: organisation, member, Owner · Admin · Member · Viewer, Invite, Plan and Billing, Sign in and Sign out, Settings, Assist | Words for the product's own things (a job card, a forecast, a bay) |
| Look | Poppins and JetBrains Mono, the status colours, the AntaraX-blue focus ring, 44px targets, the accessibility baseline (13 §10) | Palette, ground, surfaces, radius, density, illustration, motion, charts, dark mode, every layout, every component |
| The AntaraX layer | The eight touchpoints in brand kit 12: credit line, motif, AI sparkle, thinking motion, shared core, intan eyebrow, app tile, footer | How each touchpoint sits within the product's own style |
| Getting in | What the sign-in, invitation, reset and two-step screens hold, and their words (§6) | Their look, illustration and layout |
| Shared moments | The order of banners (§7); the notifications panel (§8); the Assist panel (§9); feedback and support requests, through YaraOne's front office (§10); what dialogs, toasts, errors and empty states say (§11) | How each looks |
| Logo, loading, motion | The seven kinds of wait and that every one is animated; AI thinking; the splash; tab title and icon (§12) | Every loader's motion, drawn from the product's mark and motif; its one signature moment |
| Admin area | The pages an organisation's Owners and Admins get, under `/settings` (§13) | How they look; the product's own admin sections |
| Built right | Sign-in and passwords, forms, data and privacy, speed and caching, reliability, security, time and language, devices (§15) | Nothing: these are the floor every product meets |

Anything not named as shell is the product's own (owner, 15 Oct 2026). A product never needs permission to customise something this spec does not name.

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
| 7 | **Help** | A 44px button with a question mark, its own button in every product (owner, 15 Oct 2026). It opens a small menu: **User guide** (`/guide`), **Help centre** (`/help`), **What's new** (optional: a short list of recent changes; a product that keeps one puts it here), **Send feedback**, **Contact support** and **Your requests**, which open YaraOne's front office (§10); `support@go.antarax.ai` (brand kit 13 §2) stays as the fallback |
| 8 | **Account** | A 44px round button with the person's photo or initials, always last, always at the far right (§3) |

### 2.2 Size and shape

**The bar floats by default** (owner, 16 Oct 2026): a white card in the page's gutter, with these values. They are tokens, so never retype them: `app/tokens.css`, generated from the brand kit's `shell` section, with each product's colours filled in. `reference/` builds the whole bar from them, and the [AppBar renders](mock/renders/) show it in every product.

| Part | Desktop | Phone | Token (`--shell-…`) |
|---|---|---|---|
| Gutter around the bar | 14px 20px 0 | 8px 12px 0 | `bar-outer-padding` |
| Bar height | 64px | 58px | `bar-height` |
| Inside the bar | 0 10px 0 7px, items 8px apart | same | `bar-inner-padding`, `bar-gap` |
| Corner radius | 24px, or the product's recorded radius | 20px | `bar-radius` |
| Edge | 1px hairline in the palette's `border-default` | same | `bar-border-width`, `line` |
| Shadow | `0 10px 28px -20px rgba(11,27,79,.35)` | same | `bar-shadow` |
| Surface | the palette's `surface-raised` (white) | same | `surface` |
| Brand pill well | 4px padding, 16px radius, 2px gap, `neutral-100` fill, hairline edge | same | `pill-well-*`, `well` |
| The AntaraX A | 32 × 38px link, 12px radius, the A at 21px | same | `pill-a-*` |
| Product chip | 38px tall, 12px radius, padding 0 12px 0 7px, the subtle tint, the name 16px semibold at −0.01em in `text-strong` | mark only, padding 0 7px | `pill-chip-*`, `subtle-tint` |
| Mark tile | 24px white tile, 7px radius, the mark at most 18px | same | `pill-mark-*` |
| Page title | 18px semibold, after a 1px divider and 12px, cut with an ellipsis | hidden | `title-*` |
| Product-slot buttons | drawn 40px tall with a 44px hit area, 12px radius, padding 0 12px, 13px semibold; their style is the product's own | moved to the product's navigation | `control-slot-*` |
| Search | a 210 × 44px field, 14px radius, on the well; a 44px round control on medium widths | in the product's navigation | `search-*` |
| Menu, search, notifications, Help | 44px round, 1px hairline, filled with the well; Help on the subtle tint with an action-coloured edge while its menu is open | same | `control-round`, `well`, `line` |
| Count on the bell | 18px, the action colour (`fault` when something failed) | in the product's navigation | `badge` |
| Account | 44px round, initials 14px semibold in `on-action` on the action colour, a 2px ring in the surface (the subtle tint while its menu is open) | same | `control-round`, `action`, `on-action` |
| Help and account menus | 280px and 300px wide, 16px radius, 6px padding, items at least 44px with a 10px radius, shadow `0 18px 40px -18px rgba(11,27,79,.35)` | same | `menu-*` |

**A product that differs records it** (owner, 16 Oct 2026). The value goes in the brand kit (`shell.bar.byProduct`, so `app/tokens.css` carries it) and the reason goes in the product's own `antarax-kit.lock` (`exceptions`, see the [README](README.md#pin-the-kit)). Recorded today:

| Product | Exception | Why |
|---|---|---|
| Janka | Radius 20px | As its app draws it today; Janka's lock says why |
| AX Frame | Radius 16px | As its app draws it today; AX Frame's lock says why |
| Angka | Radius 28px | As drawn for its floating sidebar on paper; Angka's lock says why |
| Tinara | Flat: no gutter, radius or shadow, a bottom hairline only, inside 0 16px 0 12px | Confirmed by the owner, 16 Oct 2026; Tinara's lock says why |

Never an exception: the height, the 44px controls, the anatomy and the right-hand order (5, 6, 7, 8).

### 2.3 Colour

The bar is drawn in the product's own palette, from `tokens/product-palettes.css` in the brand kit:

- **The bar:** `surface-raised`.
- **The text:** the palette's text roles.
- **The product chip:** tinted with the product's accent (`tint` or `subtle`).
- **The count on the bell:** the product's accent, or `fault` when something failed.
- **Exceptions:**
  - **Dark mode:** a product that offers it uses its dark palette for the bar (brand kit 13 §10): `data-theme="dark"` in `app/tokens.css` gives the shared dark surfaces, the product's dark accent and a subtle tint mixed from the two.
  - **The focus ring:** always AntaraX blue.

Each colour has a slot name in `app/tokens.css` (`--shell-subtle-tint`, `--shell-on-tint`, `--shell-action`, `--shell-on-action`, `--shell-well`, `--shell-line`, `--shell-surface`, `--shell-hover`, `--shell-ink`), filled from the product's palette. A shell colour that is not a slot is a mistake.

### 2.4 Phones

Below the product's drawer width, three things are fixed:

- **Kept in the bar:** the brand pill (the product chip may drop its name and keep its mark), Help and the account.
- **Moved into the product's navigation or the product slot:** search and notifications.
- **Help and the account stay one tap away on every page.** If the product uses a bottom bar, Help and the account still live in the top bar, never in the bottom bar.

### 2.5 Where you are

Navigation's shape is the product's own (§1); two things about it are shared (owner, 16 Oct 2026), so a customer moving between products reads it the same way:

- **The current item** carries `aria-current="page"` and is drawn on the product's **subtle tint** with its **on-tint** text, semibold (`--shell-nav-current-bg`, `--shell-nav-current-ink`). Never a grey, never only a bolder word, never a side stripe alone.
- **Hover** on any other item is the product's **surface-hover** (`--shell-nav-hover-bg`), never the same as the current item.

This holds in a sidebar, tabs, a rail or a bottom bar. A coloured rail (Tinara) puts the tinted item on its own colour.

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
| 8 | **Help** (phones only, where the Help button does not fit) | User guide, Help centre, Contact support, Your requests | As §2.1 |
| 9 | **Sign out** | Asks first: "Sign out of ‹Product›?" | The sign-in page |
| 10 | **Foot** | "‹Product› · by AntaraX", the version, Privacy and Terms | `/legal/privacy`, `/legal/terms` |

- **REKA support inside an organisation:** a banner across the top of every page names REKA support and when the session ends (brand kit 13 §1, axle SPEC §11). The account button shows the REKA person's initials with a "Support" ring.
- **Sample data:** a product showing sample data says so in the product slot or a banner, never inside the account menu.

## 4 Standard pages

Every product has these pages at these addresses. What each holds first is fixed; how it looks is the product's own, and a product may add its own sections after the standard ones.

| Address | Page | Holds first, in this order | Who |
|---|---|---|---|
| `/account` | Your account | Name and photo · Email and sign-in (password or Google; two-step sign-in) · Emails you get (§8) · Sessions (signed-in devices, "Sign out everywhere") | Everyone |
| `/settings` | Settings | Organisation (name, logo, time zone, currency) · Members (`/settings/members`) · Plan and billing (`/settings/billing`) · then the product's own sections · API (`/settings/api`, if the product has one) · Your data (download, leave or delete the organisation) last | Admins and Owners change; Members and Viewers read what applies to them |
| `/settings/members` | Members | Who is in the organisation, their role, last active; Invite; pending invitations with resend and cancel | Admins and Owners |
| `/settings/billing` | Plan and billing | Current plan and what it includes · usage against limits · invoices · payment method · change plan | Owners |
| `/settings/api` | API | Keys (created, last used, revoke), named **Lapisan by AntaraX** (brand kit 12), with a link to the developer docs at `lapisan.antarax.ai` | Admins and Owners, products with an API |
| `/settings/roles` | Roles | What each role can do (§13) | Admins and Owners |
| `/settings/security` | Security | Two-step for everyone, sessions, sign-in activity (§13) | Admins and Owners |
| `/settings/activity` | Activity log | Who changed what (§13) | Admins and Owners |
| `/settings/usage` | Usage | Use against the plan's limits (§13) | Admins and Owners |
| `/settings/support` | Support access | REKA support sessions (§13) | Owners |
| `/settings/data` | Your data | **Download your data:** everything the organisation holds, as files, emailed when ready · **Leave the organisation** (a member) · **Delete the organisation** (Owners): typed confirmation, then 30 days in which an Owner can undo it, then gone | As noted |
| `/guide` | User guide | REKA's user-guide format: task IDs, steps, a screenshot, "You should see" (brand kit 13 §8) | Everyone |
| `/help` | Help centre | Answers to common questions; public before sign-in where not private; Contact support at the foot, opening YaraOne's front office (§10) | Everyone |
| `/legal/privacy`, `/legal/terms` | Privacy and Terms | The legal texts; `privacy@go.antarax.ai` as the contact; the legal line "AntaraX, a product line of REKA Inisiatif Sdn Bhd." at the foot | Everyone, signed in or not |

- **Settings has one home** (owner, 15 Oct 2026). Every setting that changes how the organisation works lives under `/settings`: the standard sections first, then the product's own, then API and Your data. A product may also show a setting next to the thing it affects, as a shortcut (Yara's workflow stages beside its board), but the same setting is always in `/settings` too.
- **View choices are not settings.** Filters, columns, sort order and density stay on their page, remembered per person.
- **Each product's own sections**, today:

  | Product | Its own settings |
  |---|---|
  | Yara | Workflow stages, rates, working calendar, machines and resources |
  | Janka | Sites, suppliers, units, reorder rules |
  | AX Frame | Workspaces, connected AI |
  | Angka | Business details, tax, bank accounts, Lapis |
  | Tinara | Data sources, scoring |
  | PLExyz Grid | Yard layout, bays, devices |

- **Roles mean the same in every product** (brand kit 13 §1):
  - **Owner:** everything, plus billing and deleting the organisation.
  - **Admin:** settings and members.
  - **Member:** does the work.
  - **Viewer:** reads only.

  A product may add roles named for a job (Supervisor and Worker in Yara). It never changes what Owner, Admin, Member and Viewer mean.
- **The sign-in page** carries the product mark, "‹Product› by AntaraX, from REKA.", a Help link and the product's own look.
- **Invoices** carry the legal line "AntaraX, a product line of REKA Inisiatif Sdn Bhd."

## 5 The AntaraX layer, as it applies to the shell

- **Credit lines** (brand kit 12, Credit lines):
  - **In the product's chrome** (the account menu's foot, the foot of the product's own navigation): "‹Product› · by AntaraX".
  - **On sign-in, the splash, the first email, reports and exports:** "‹Product› by AntaraX, from REKA."
  - **On legal pages, terms and invoices:** "AntaraX, a product line of REKA Inisiatif Sdn Bhd."
  - **Elsewhere, REKA is named only where REKA people really act:** REKA support (§7, §13), "the team at REKA" on support and feedback (§10).
- **AI:**
  - the product's AI entry carries the AntaraX sparkle, and its name is **Assist** (Angka keeps **Ask Angka**);
  - it lives in the product slot;
  - it is never a floating chat bubble that covers the account or Help.
- **Focus, type and status:**
  - the AntaraX-blue focus ring on every shell control;
  - Poppins and JetBrains Mono;
  - status colours only on real signal.

## 6 Getting in

The words and what each screen holds are shared. How they look is the product's own. **The full standard, with every screen, state, rule and message, is [getting-in/SPEC.md](../getting-in/SPEC.md)** (owner, 18 Oct 2026); this table is its summary, and where they differ, that file wins.

| Screen | Address | Holds |
|---|---|---|
| **Sign in** | `/signin` | The product mark and "‹Product› by AntaraX, from REKA." · Continue with Google · email and password, both in every product (owner, 15 Oct 2026) · "Forgot your password?" · Help (`/help`) · Privacy and Terms at the foot |
| **Create an account** | `/signup` (where the product lets people sign themselves up) | The same, plus the plan they are starting on, by its brand kit name |
| **Join from an invitation** | `/invite/‹code›` | "‹Person› invited you to join ‹Organisation› on ‹Product›", their role, then sign in or create an account. An expired or used link says so and offers to ask for a new one |
| **Reset your password** | `/reset` | Email, then "If an account exists for that email, we've sent a link". It never confirms whether an account exists |
| **Two-step sign-in** | after sign-in | The code, "Use a backup code", and Help |
| **Signed out** | after Sign out | Back to sign-in, with "You've signed out" |

- **Words:** Sign in, Sign out, Create an account, Invite, join (brand kit 13 §1); never Log in, Login, Register.
- **Errors say what failed:** "That password didn't match", never "Oops" (brand kit 03).
- **One recorded exception: YaraOne** (owner, 16 Oct 2026). The REKA team signs in as above; YaraOne's clients sign in with their email and a code the team sets, with no sign-up (YaraOne docs/16, docs/20).

## 7 Banners

A banner is a full-width strip directly under the top bar, for a state that holds across pages. When several apply, they stack in this order, and each says what is happening and what to do.

| # | Banner | When | Says |
|---|---|---|---|
| 1 | **REKA support is here**, or **REKA support asks to look** | A REKA support session is open, or (Owners only) a request is waiting | Open: who, until when, and "End session" for Owners and Admins. Waiting: who, why, how long, and Approve or Decline (axle SPEC §11) |
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

**Email** (owner, 17 Oct 2026; brand kit guide/10). Every product sends its email through AntaraX email (antarax-api docs/15), whether or not it has a bell:

- **From the product, never the organisation:** `<Product> <product@mail.antarax.ai>`. Replies go to `support@go.antarax.ai` (brand kit 13 §2). The layout is the service's, drawn from a template (brand kit 13 §4); a product never sends its own HTML.
- **`/account` → Emails you get** lists every **activity** email the product sends (digests, reminders, alerts, comments, updates), each with its own switch, in plain words ("A daily digest of low stock"). Every activity email carries a one-click unsubscribe that turns off the same switch, with no sign-in, and a link to this page.
- **Not listed, because they cannot be turned off:** **security** emails (sign-in links and codes, password reset, password or email changed) and **service** emails (invitations, an export that is ready, something the person must act on). The page says so in one line: "Sign-in and account emails always reach you."
- **When an address bounces,** AntaraX email stops every product mailing it. The product shows it on `/account` beside the email address ("Emails to this address are bouncing. Check it, or change it."), reading it from AntaraX email (`GET /v1/suppressions`).

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
- **AI anywhere else in the product** uses the shared pieces in brand kit 13 §6b (owner, 16 Oct 2026). That covers a suggestion, a document read by AI, or a forecast. The look is the product's own:
  - the sparkle with "AI" in words;
  - **Accept**, **Change** and **Dismiss**, each reporting its outcome so AXLE's R8 → AI flow counts it;
  - why (sources, and confidence in words);
  - "Applied by AI · Undo";
  - thinking with a way out after 10 seconds ("Type it yourself");
  - the gateway's own notes when AI is off, busy or out of allowance, never as an error.

  These are the interface layer (B1) of the AntaraX AI framework (`haziqfaris/ai-framework-heuristiks`).

## 10 Feedback and support requests: YaraOne's front office

Every product embeds **YaraOne's front office** for feedback and support requests (owner, 16 Oct 2026). YaraOne is REKA's ticketing product: it holds every ticket from every AntaraX product and REKA client project, so no product builds its own, and customers never sign in to another dashboard. The contract is [`yaraone/EMBEDS.md`](../yaraone/EMBEDS.md).

- **Where it opens:** Help → Contact support (Get help), Help → Send feedback, Help → Your requests; **Report this** on an error screen, with the error reference filled in; the foot of `/help`.
- **Get help:** what they need help with, the page filled in, screenshots and files pasted, dropped or chosen (10 MB each, up to five), "Send to REKA support"; "Message us on WhatsApp" where REKA keeps a number. After sending: the request's reference, and "Replies appear under Your requests and by email."
- **Send feedback:** what would make the product better, the page filled in, "Send feedback". After sending: "Thanks. The team at REKA reads every message, and you'll hear here if it leads to a change."
- **Your requests:** each request with where it is, in four plain steps (Received, Looking into it, Working on it, Done) and one sentence, and its thread, with Reply ([EMBEDS](../yaraone/EMBEDS.md#the-words)). A person sees their own; Owners and Admins see their organisation's.
- **What the product passes:** product, organisation, person and role, page, version, any error reference. The person adds any screenshots or files. The product keeps nothing of the request.
- **Its look is the product's:** colours, radius and font come from the product; the only other mark is one line at the foot, "Managed by REKA · Powered by YaraOne" (owner, 16 Oct 2026).
- **Never shown to the customer:** internal notes, staff assignments, other organisations' requests.
- **Where it goes:** YaraOne, and the product's AXLE → Watch → Tickets (axle SPEC §10.12).
- **How it works** (settled with YaraOne, [`yaraone/EMBEDS.md`](../yaraone/EMBEDS.md) v1.0): the product loads YaraOne's `embed.js` and opens the module with a short-lived token its own server signs for the signed-in person, so nobody signs in twice. Owners and Admins may reply to and close their organisation's requests, never change their status. Replies show under Your requests, by email, and as a count on Help.

## 11 Dialogs, toasts, errors and empty states

What they say and how they behave are shared; how they look is the product's own.

- **Confirming, waiting and results** are their own standard: [actions/SPEC.md](../actions/SPEC.md) (kit 1.8.0). In short:
  - every action is at one of three levels: undoable (no question, Undo), consequential (a dialog naming the action and the thing), irreversible (type the name and ask again);
  - what a person sees while it runs depends on how long it takes: the button under 2 seconds, a progress dialog over, a background job for long ones;
  - every action ends in a past-tense toast naming the thing, with Undo where it can be undone, at the bottom of the page, away from the top bar; errors say what failed and what to do, with Retry.
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

## 11a Every long list

Any list that can grow past one screen (work orders, stock, invoices, members, requests) gives people the same tools in every product (owner, 16 Oct 2026). How each looks is the product's own; `reference/ListToolbar` is one way to draw it. It is a customer version of AXLE's §9, not the same rule.

| | Required | Notes |
|---|---|---|
| **Search** | Always | Across the fields people know the record by (name, number, customer). `/` focuses it |
| **Filters** | On the list's main fields | Status, owner, date, site: whatever people sort their day by. Each applied filter shows as a chip that removes it |
| **Sort** | Always | By the columns or fields that matter, with the direction shown |
| **Group** | Where it helps | By status, owner, customer or date, with counts |
| **View** | Where the data fits | List, board or table. A choice only where the data really suits more than one |
| **Remembered** | Always | Per person, or kept in the address so a view can be shared. Coming back finds the list as it was left. Views are chosen on the page, never in Settings |
| **Saved views** | Always | A person can save the list as it is (search, filters, sort, group and view) under a name, and pick it again from a **Views** menu beside search. The menu starts with "All ‹records›", which cannot be deleted, then their own views; **Save view…** names the current one, and each view is renamed or deleted from the same menu. A saved view is per person; its address can still be shared. Chosen on the page, never in Settings |
| **Empty** | Always | Says what will appear and how to start (§11) |
| **No match** | Always | "No work orders match these filters", with Clear filters. Never the empty state, never a blank table |
| **CSV export** | When it is tabular | What is on screen, filters applied: `‹product›-‹list›-‹YYYY-MM-DD›.csv`, UTF-8, ISO dates, plain numbers, currency in its own column. Hidden figures stay hidden (§16) |
| **Counts and bulk actions** | Optional | AXLE's stats strip and bulk actions, where they help. A bulk action that deletes or sends asks first, as the single one does |

Paging is the product's own (pages, more, or an endless list), as long as search, filters and export cover every record, not only those loaded.

## 12 Logo, loading and motion

The brand kit decides the motion system (guide 04 animations, guide 12 signature moments, guide 14 loading). In the shell:

| | Shared in every product | The product's own |
|---|---|---|
| **Logo** | The product chip in the top bar; one app-tile shape; the browser tab and installed-app icon made from that tile; the tab title "‹Page› · ‹Product›" | The mark itself, its colours and lockup |
| **Waiting** | The seven kinds of wait (brand kit 14): none (under about 400ms), inline, skeleton, section, thinking, progress, splash; and when each is used | Each loader's motion, drawn from the product's mark and motif (Janka's ticks, Angka's seeds, Yara's wave) |
| **AI thinking** | The AntaraX sparkle morphing into the product's logo and back, the same everywhere | Only the logo it becomes |
| **Splash** | The logo and "‹Product› by AntaraX, from REKA.", drawn on once when the app opens | The composition and the motif |
| **Signature moment** | At most one per product, never on screens people work through quickly (brand kit 12) | Which moment, and how it moves |

**Every wait is animated and stylised** (owner, 15 Oct 2026):

- **What a wait never is:** "Loading…" on its own, a static placeholder, a generic spinner, or the browser's default.
- **What it is instead:** the product's own loader for that kind of wait.
- **What else may appear:** for a long task, the words of the action ("Forecasting 48 items", a count) may sit beside the animation. They never replace it.
- **Reduced motion:** when a person has asked their device for reduced motion, the loader shows its stylised still frame, never plain text. For example, Janka's ticks hold at their peak, and the AI thinking state holds the sparkle.
- **Screen readers:** every wait is announced to them in words ("Loading work orders"), in a live region nobody sees.
- **Skeletons** shimmer in the product's `subtle` colour; they are never flat grey blocks.
- **Long waits:**
  - nothing animates over data;
  - after 10 seconds, the wait says what is happening and offers a way out.

## 13 The organisation's own admin area

What AXLE gives REKA staff, an organisation's Owners and Admins get for their own organisation, under `/settings`. It is part of Settings, not a second app.

| Page | Holds | Who | Like AXLE's |
|---|---|---|---|
| **Members** `/settings/members` | People, roles, last active, invite, resend or cancel invitations, remove access | Admins, Owners | Members, Invitations |
| **Roles** `/settings/roles` | What Owner, Admin, Member and Viewer can do, as a read-only table, then the product's own roles and what they can do | Admins, Owners | Staff ladder |
| **Security** `/settings/security` | Require two-step sign-in for everyone · signed-in sessions with "Sign out" per device · sign-in activity (when, where, device, success or failure) · later, single sign-on with the company's own login | Admins, Owners | Security |
| **Activity log** `/settings/activity` | Every change by anyone in the organisation: who, what, when, before and after. Filter by person, kind and date; export. Never editable | Admins, Owners | Audit |
| **Usage** `/settings/usage` | Use against the plan's limits in plain units (records, members, Assist answers, storage); when each resets. Never AI cost, model or provider (axle SPEC §12) | Admins, Owners | Plans & features, AI usage |
| **Plan and billing** `/settings/billing` | §4 | Owners | Billing |
| **API** `/settings/api` | §4 | Admins, Owners | API |
| **Support access** `/settings/support` | Whether REKA support may open a session: Always allowed, Ask each time (the default) or Never · requests waiting for an answer, with Approve or Decline and the reason · any open session with "End session" · past sessions: who, when, why, what they looked at | Owners | Support sessions (axle SPEC §11) |
| **Your data** `/settings/data` | §4, plus a record of every download and deletion request | Owners | Requests |

- **Members and Viewers:** they see only `/account` and the settings that apply to them.
- **Every admin action** lands in the Activity log, the same way every staff action lands in AXLE's Audit.
- **Changes that affect everyone ask first:** requiring two-step sign-in, removing a member, ending a session. Each one names who it affects.

## 14 Public pages, and what comes later

- **Public share pages.** A page a customer shares with people outside their organisation (an AX Frame share, a Janka report) carries a small footer: "Made with ‹Product› by AntaraX", linking to the product's page on antarax.ai. Everything else on it is the product's own.
- **Later: moving between AntaraX products.** When one AntaraX account spans products, a customer who uses two will switch between them from the AntaraX A in the brand pill. The A is reserved for that; no product puts anything else there.
- **Later: System status.** When a status page exists, Help gains "System status".
- **Stays custom:** first-run setup, page tours, dashboards, charts, tables, how forms look, how each loader moves (§12), search results and every page this spec does not name.

## 15 Built right: the standards beneath the look

These are not cosmetic, so no product varies them. They follow the usual industry references: NIST SP 800-63B for passwords and sign-in, OWASP ASVS level 2 for application security, WCAG 2.2 AA for accessibility, Core Web Vitals for speed, and Malaysia's Personal Data Protection Act 2010 (PDPA) for personal data.

### 15.1 Signing in and passwords

**Moved to [getting-in/SPEC.md](../getting-in/SPEC.md)** (owner, 18 Oct 2026), the standard for signing in, passwords, sign-in links, two-step sign-in, sessions and account changes in every customer app and AXLE. Its §1 is the bare minimum (GI-01 to GI-20); `node tools/check-signin.mjs` checks what can be seen from outside.

### 15.2 Forms and input

- **Labels and fields:**
  - every field has a visible label, never a placeholder alone;
  - required fields are marked;
  - optional fields say "(optional)".
- **Errors:**
  - checked when a person leaves a field, and again on submit;
  - the error is next to the field and says what to do ("Enter a date after 1 Oct");
  - nothing typed is lost.
- **The right keyboard:**
  - numbers, phone numbers, emails and codes open the right keyboard on phones (`inputmode`, `type`);
  - names accept any script (Malay, Chinese, Tamil, accents), and nothing is ASCII-only;
  - text is trimmed.
- **Dates:** typed or picked, shown as 15 Oct 2026.
- **Money:** typed without thousands separators and shown with them.
- **Protecting work:**
  - a long form saves a draft as you go;
  - leaving with unsaved changes asks first;
  - a submit button cannot be pressed twice.
- **Keys:** Enter submits a single-line form; Esc closes, never discards.

### 15.3 Data and privacy

- **The law:** personal data is handled under PDPA. Collect only what the product uses, say why at the point of asking, and keep a privacy notice at `/legal/privacy`.
- **Encryption and isolation:**
  - TLS 1.2 or later for everything in transit, encryption at rest;
  - each organisation's data walled off from every other's at the database (row-level security or equivalent), not only in the app.
- **Where personal data never goes:** into logs, analytics, error reports or addresses (URLs). Secrets never reach the browser.
- **Retention and backups:**
  - each kind of record has a set retention period, written down;
  - backups are encrypted, and restores are tested.
- **Export and deletion:** CSV and JSON on request (§4, §13). Deletion is 30 days to undo, then gone, backups included within their cycle.
- **Uploads:**
  - type and size are checked;
  - images lose their location data;
  - files are scanned before anyone else can open them.
- **Analytics:** first-party only, without advertising trackers; any optional cookie asks first.

### 15.4 Speed and caching

- **Targets,** on a mid-range phone on 4G: largest content shown within 2.5 s, responds to a tap within 200 ms, nothing jumps while loading (Core Web Vitals: LCP, INP, CLS).
- **Fast reloads:**
  - app files carry a fingerprint in their name and are cached for a year;
  - pages are revalidated every time;
  - data shows what was last fetched at once, then refreshes in the background, with "Updated ‹time›" where it matters.
- **Feels instant:**
  - a change shows straight away and is undone, with a message, if the server refuses it;
  - links likely to be clicked are fetched on hover.
- **Long lists:** paged or virtualised past about 200 rows.
- **Images:** sized for the screen and loaded as they come into view.
- **Fonts:** preloaded, with text shown while they load.
- **Installed app:** where the product can be installed, its shell opens offline, and the person is told what works without a connection.
- **Poor connections:**
  - failed requests retry with backoff;
  - nothing typed is lost;
  - "You're offline" shows only when it is true.

### 15.5 Reliability and errors

- **Request ids:** every error a person sees carries one, and the same id is in the server's logs and in AXLE (axle SPEC §10).
- **Error reports:** errors are reported to the team automatically, without personal data.
- **Safe repeats and limits:** writes are safe to repeat, and every call has a time limit.
- **Partial failure:** if one part of a page fails, the rest still works, and the failed part says so.

### 15.6 Security

- **Transport:** HTTPS only, with HSTS.
- **Headers:** a content security policy, and no framing by other sites.
- **Forms:** protection against cross-site requests.
- **Rate limits** on sign-in, sign-up, invitations, password reset and every public form.
- **Dependencies:** scanned, and patched on a schedule.
- **Secrets:** rotatable, never in the code.
- **Reference:** OWASP ASVS level 2.
- **Staff access:** REKA staff reach an organisation's data only through AXLE, with a reason, and an audited support session where the organisation has allowed one (§13).

### 15.7 Time, language and formats

- **Times:**
  - stored in UTC, shown in the organisation's time zone (Asia/Kuala_Lumpur by default);
  - recent times are relative ("2 min ago") with the exact time on hover.
- **Languages:** British English, and Bahasa Melayu where the product offers it, chosen per person.
- **Formats:** dates, money and numbers follow brand kit 13 §3.

### 15.8 Devices and browsers

- **Screen sizes:** works from 360px to 1920px wide.
- **Browsers:** the last two versions of Chrome, Edge, Firefox and Safari, plus Safari on iOS 16 or later and Chrome on Android.
- **Touch:** targets of at least 44px.
- **Keyboard:** everything reachable by keyboard.
- **Accessibility:** WCAG 2.2 AA, checked automatically in CI (brand kit 13 §10).

## 16 Never

In every customer app, whatever its own design:

- **Help and the account:** never moved, renamed or hidden, and never placed in a sidebar or a bottom bar.
- **Shared words:** never changed. Not "Log out", "Login", "Organization", "user" on screen, "Admin panel", "Preferences", or "Oops".
- **Another identity:** never another product's colours or mark, AXLE's orange, the `AXLE` tag, or the AntaraX A used for anything but antarax.ai and, later, switching products.
- **Credits:** never "Powered by AntaraX" (redundant: the product is AntaraX's), "by REKA", "A product of REKA Inisiatif", "REKA Intelligence", "AntaraX AI", or REKA in REKA orange (brand kit 12). "Powered by ‹tool›" is fine where a separate tool really powers part of the product, as YaraOne does the front office (§10).
- **What only REKA sees:** never shown to customers. That means:
  - AI model or provider names, AI costs or prompts;
  - REKA staff names, except during a support session the organisation allowed;
  - other organisations' names or data.
- **Waits:** never "Loading…" alone, a static placeholder, a spinner, or a loader over data.
- **False information:** never a false zero, or a number that is not real.
- **Interruptions:**
  - never a browser pop-up (`alert`, `confirm`, `prompt`);
  - never a floating chat bubble over Help or the account;
  - never autoplaying sound.
- **Passwords and payment:**
  - never a password rule beyond length and breached-password checks;
  - never blocking paste or password managers;
  - never sending a password by email;
  - never taking a password or a payment anywhere except the standard pages.
- **Personal data:** never in an address, a log or analytics.
- **Tickets and feedback:** never a product's own ticket table, feedback inbox or support form that stores anything; they are YaraOne's (§10).
- **Shared rules:** never added inside one product. They go into this spec first.

## 17 How to prove it

| Check | Passes when |
|---|---|
| **Same places** | On three random pages of any two products: the brand pill is at the top left, Help is second from the right, the account is at the far right |
| **Account menu** | Its items appear in §3's order; Sign out asks first; the foot carries "by AntaraX", Privacy and Terms |
| **Standard pages** | `/account`, `/settings`, `/settings/members`, `/settings/billing`, `/settings/data`, `/settings/api` (with an API), `/guide`, `/help`, `/legal/privacy` and `/legal/terms` all open, and each holds §4's first items in order |
| **Words** | No "Log out", "Organization", "user" on screen, "Preferences" or "Admin panel" (brand kit 13 §1) |
| **Phones** | At 390px, Help and the account are one tap away on every page, and nothing in the bar overlaps |
| **Own palette** | Every colour in the shell comes from the product's palette in the brand kit, or the shared status and focus colours |
| **Getting in** | Sign in, invitation, reset and two-step screens hold §6's items; reset never reveals whether an account exists |
| **Banners** | With two states at once (sample data and a trial ending), both show, in §7's order |
| **Feedback and support** | Send feedback and Contact support open YaraOne's front office in the product's look; a request arrives in AXLE → Tickets with the page and version; a reply shows under Your requests; no ticket is stored in the product |
| **Email** | An invitation and a password reset arrive from `<Product> <product@mail.antarax.ai>` and a reply reaches `support@go.antarax.ai`; `/account` lists only activity emails, each with a switch; an activity email's unsubscribe link turns that switch off without signing in; `AX_SVC_KEY` is in no browser bundle |
| **Assist** | No model, provider, prompt or cost appears in the panel or its network responses |
| **AI in the interface** | Accept, Change and Dismiss on an AI suggestion each reach the gateway as an outcome. With AI switched off, the gateway's note and the way without AI appear, never an error. After 10 seconds of thinking, the way without AI is offered |
| **Settings** | Every setting the product has can be found under `/settings`; `/settings/data` downloads the data and deletes with a 30-day undo |
| **Share pages** | A public share page carries "Made with ‹Product› by AntaraX" |
| **Waiting** | Throttle the network: every wait shows the product's animated loader, never "Loading…" alone; with reduced motion on, a stylised still frame; a screen reader hears the wait |
| **Admin area** | An Admin finds Roles, Security, Activity log and Usage; changing a member's role appears in the Activity log with before and after |
| **Sign-in** | Show password works; a password manager fills sign-in and saves a new password; paste works in every field; an 11-character password is refused and a 12-character one with spaces is accepted |
| **Forms** | A failed submit keeps everything typed; a double click submits once; leaving with unsaved changes asks first |
| **Speed** | Lighthouse on a mid-range phone profile: LCP under 2.5 s, INP under 200 ms, CLS under 0.1; a reload shows data at once from cache |
| **Security** | Security headers present (HSTS, CSP, frame-ancestors); sign-in slows after 5 failures; personal data absent from logs and analytics |
| **Accessibility** | The brand kit 13 §10 baseline; every shell control has a name; the account menu traps focus and closes on Escape |
| **The bar, measured** | `node tools/check-shell.mjs URL` passes on three pages at 1280px and 390px: bar height, control sizes, Help and the account at the far right, no uppercase labels. Its screenshot, beside the product's reference PNG, shows no difference the product has not recorded |
| **Where you are** | The current item in the navigation has `aria-current="page"`, the subtle tint and on-tint text; hovering another item looks different |
| **Lists** | On the longest list: search, a filter and a sort survive a reload; a filter that matches nothing says so and offers Clear filters; the CSV holds what was on screen |
| **Pinned** | `antarax-kit.lock` names the kit version built against, and every difference from §2.2 is in its `exceptions` with a reason |

## 18 What each product changes

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
| YaraOne | Built to the shell on 16 Oct 2026 (YaraOne docs/20) | Built | Built; Your requests, Security and Support access to come |
| Lapisan Console | Has the pill and the account in the top bar already | Already right | Add `/guide` and `/help` |

## 19 Decisions

All decided by the owner on 15 Oct 2026:

- **The principle:** each customer app is the product's own, apart from this shell. Navigation is fully the product's own.
- **The top bar:** the account at the far right; Help is its own button.
- **What else is shared:** getting in, banners, notifications, Assist, feedback, dialogs, toasts, errors and empty states.
- **Settings:** one home under `/settings`, with shortcuts beside the work.
- **What's new:** optional.
- **Sign-in:** Google and email in every product.
- **Roles, Your data, API keys and public share footers** are shared.
- **Later:** a product switcher on the A, and System status.

- **v1.1:**
  - every wait is animated and stylised, never text alone or static;
  - a customer admin area under `/settings`;
  - the standards beneath the look (§15);
  - the Never list (§16).

- **16 Oct 2026:** feedback and support requests are YaraOne's front office, embedded in every product; no product builds its own (§10). Products that have their own today move to it: Angka's feedback inbox, Yara's support page, AX Frame's Support & FAQ form.

- **16 Oct 2026, v1.2:**
  - the floating bar is the default, with exact values as tokens (§2.2); a product records any exception, with its value in the brand kit and its reason in its `antarax-kit.lock`; the radius stays per product; Tinara's flat bar confirmed; PLExyz Grid floats;
  - the current navigation item and hover are shared (§2.5); navigation's shape stays the product's own;
  - a baseline for long lists (§11a), a customer version of AXLE §9;
  - mocks readable off the canvas, reference components, a conformance check, a gap table before any work, and one kit version that products pin (§17, `README.md`).

- **16 Oct 2026, v1.3:** every long list has named saved views, per person, from a Views menu beside search (§11a). It completes the owner's list baseline (search, filters, sort and saved views on every list page, brand kit guide/10).

New questions go here.
