# Page templates on Astryx

The page patterns every AntaraX screen built on Astryx uses, so no product invents its own. They were first built in
AwanGan's AXLE (its decision 0054, 25 Nov 2026) after its pages failed the kit; they meet axle/SPEC.md §6, §9, §14.2,
§16 and §17 and pass `tools/check-product.mjs`. **A pattern that is not here is added here first, then used**
(AGENTS.md): a product never draws a new kind of page on its own.

| Pattern | Use it for | Parts | Rules it meets |
|---|---|---|---|
| **Page header** (`PageHead.tsx`) | The top of every page: one line on what the page is for, the state line, "How this page works" folded, the page's one main action | `Text`, `Collapsible`, a `Button` (primary) in `end` | axle/SPEC.md §6 page header; one primary action a page |
| **Tabs that are links** (`PageTabs` in `PageHead.tsx`) | A page with several views (Models & keys: capabilities, models, keys, engines). Never one long page of sections | plain links with `aria-current="page"` | the view in the address (§19 Links) |
| **List** (`KitList.tsx`) | Every list of records | `Table`, `TextInput`, `Selector`, `Button`, `EmptyState` | §9: stats strip that follows the filters, search, filter, sort, group in the address, CSV `axle-<product>-<list>-<date>.csv`; tables scroll inside their own container on a phone (§17) |
| **Step form** (`.stepform`, `.formstep`, `.formactions`) | A form with more than one decision (add a key, bring a product online): numbered `fieldset`s, one column at most 760px, actions last | `RadioList` (choices with a description or a logo), `Selector`, `TextInput`, `Collapsible` for the rarely needed | one part per job (`tools/check-parts.mjs`); the primary button says why it waits ("Write a reason to continue") |
| **Guided flow** (`.guide`, `.guide-panel`, `.guide-head`, `.pickcards`, `.guide-tune`, `.guide-review`, `.guide-key`) | Making something new where a person decides one thing at a time and gets something back at the end (AwanGan's New project: what it is, what AI does, models and a cap, a review, the key). Not for a form a person fills once and sends: that is the step form | `Stepper` (the progress line; done steps go back), one panel a step whose heading takes the focus, `RadioList`, `SelectableCard` for choices to tick (a choice that cannot be had is a plain `Card` that says why, never a disabled card), `Selector`, `TextInput`, `Collapsible` for More, the kit's step chips for a read-only chain, a review in plain lines, the secret once in a dark pane with a copy `Button` | One decision a screen, each saying on screen what it is for; the step in the address (`?step=`); the server checks the whole plan again before it makes anything and undoes what it made if a step fails; one primary action a step; motion from the theme's durations (a panel slides in from the side it comes from, a card lifts and its tick pops, the secret wipes in once) and none under `prefers-reduced-motion` |
| **Ordered editor** (AwanGan's chain editor) | An ordered list a person edits: rank, item, its detail, move up and down, Remove | `Selector`, `IconButton` (ghost, labelled "Move step 2 up"), `Button` secondary with `quietDestructive` for Remove | §14.2: Remove is destructive, never link text; 44px targets on touch |
| **Wide and narrow** (`.split`) | An editor with its rules beside it; a list with the chosen record beside it | two columns from 1100px, stacked below | §17 |

`kit-patterns.css` is their layout, from the theme's tokens only; put `data-kit-page` on the element that holds a
page's content. Copy the files into a product (astryx/SPEC.md §6: a product meets the contract with Astryx); keep a
change to one of them in step with this folder.

Before a page ships, `node tools/check-product.mjs kit-pages.json` passes on it at 1280 and 390px, and its pictures are
approved in the pull request (README, "Proving a product").
