# AntaraX shell mock

The shell every customer app shares, drawn to [SPEC.md](../SPEC.md) v1.3, the standard, with fictional people and organisations throughout.

- **Read it off the canvas:** every board is rendered to PNG in [`renders/`](renders/), and beside each mock is `<Board>.values.md`, a table of its values that says which are shell and which are the product's own. The top bar is rendered in every product, wide and phone, light and dark: open the closest product's `renders/AppBar-<product>-<wide|phone>[-dark].png` before planning (AGENTS.md).
- Live canvas (private until shared): https://claude.ai/artifact/BnCgM4zvLZpKiJGDaqqBix. Press Play: Help and the account open their menus.
- The logos are in `assets/` (copies of the brand kit's marks; `assets.json` maps the canvas's ids to them).

**Changing a mock:** change the `.dc.html`, then in the same commit re-render (`node tools/render-mocks.mjs app/mock --only <Board>`), correct its `.values.md`, and run `node tools/render-mocks.mjs app/mock --stamp-values`. CI runs `--check`, which fails when a PNG or a values table is older than its mock. Rendering needs Playwright and Chromium; the check needs neither.

| File | Page | Shows |
|---|---|---|
| `Main.dc.html` | The AntaraX shell | The top bar in Yara's colours with its eight parts numbered and the account menu open; Help in Janka's colours; a phone in Angka's with its own bottom bar; the standard pages and their addresses; shell or own |
| `AppBar.dc.html` | Shared top bar | The bar with its Help and account menus, to the values in SPEC §2.2. Props: product, mode (wide, medium, phone), which menu is open, numbered parts, dark |
| `Products.dc.html` | Six products | Yara (sidebar, board), Janka (tabs, list), AX Frame (no menu, a map), Angka (floating sidebar on paper), Tinara (flat bar, a recorded exception; narrow rail), PLExyz Grid (zone map, side panel): each its own, one shell |
| `SignIn.dc.html` | Getting in | Janka's sign-in (with Show password, password-manager fields and a Caps Lock warning) and Angka's invitation page: the same items and words (§6, §15.1), each product's own look |
| `GettingIn.dc.html` | Getting in: the screens products most often lack | Nine screens in Janka's colours: sign in, choose a new password with the meter, sign-in link sent, two-step set up and backup codes, enter a code, too many attempts, session ended, your account (getting-in/SPEC.md) |
| `GettingInYara.dc.html`, `GettingInAXFrame.dc.html`, `GettingInJanka.dc.html`, `GettingInPLExyzGrid.dc.html`, `GettingInPLExyzCrowd.dc.html`, `GettingInAngka.dc.html`, `GettingInTinara.dc.html` | Getting in, every screen, per product | Every screen and email of getting-in/SPEC.md §3 in that product's colours and shape: signing in, Email me a sign-in link and its email, Forgot your password and its emails, two-step, joining and leaving; Create an account where the product has sign-up; Yara's workers. Each imports `GettingInScreens.dc.html` with its product. YaraOne's board is on the canvas only until its palette is in the brand kit |
| `Admin.dc.html` | The organisation's admin area | Janka, signed in as an Owner: Security (require two-step, sign-in activity), Activity log, Usage in plain units, Support access (§13) |
| `Loading.dc.html` | Every wait is animated | Each product's own inline loader, a skeleton shimmering in Yara's colour, AI thinking (the sparkle becoming AX Frame's mark), Angka's progress board, Janka's splash; all hold a stylised still frame with reduced motion (§12) |
| `Moments.dc.html` | Shared moments | Banners stacked in order (Yara), notifications (Yara), Assist (AX Frame), Send feedback (Janka), confirming a deletion (Angka), an empty state and a toast (Tinara), a public share page (AX Frame), an error page (PLExyz Grid) (§7 to §12) |
| `Support.dc.html` | Help and requests | YaraOne's front office embedded in Janka, opened from Help: Get help, Send feedback, Your requests with where each request is and its thread (as an Owner, every request from the organisation). Report this on an error screen; the same module in AX Frame's, Angka's and PLExyz Grid's look (§10). Try the tabs and a request |
| `Lists.dc.html` | Every long list | Yara's work orders with search, filter chips, sort, group, a choice of view, CSV and the view kept in the address; the no-match and empty states; what is required and what is optional (§11a) |
| `Settings.dc.html` | Settings | Yara's settings: the standard sections, then Yara's own, then API and Your data; Members with the shared roles and Yara's own Supervisor (§4) |
