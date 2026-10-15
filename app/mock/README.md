# AntaraX shell mock

The shell every customer app shares, drawn to [SPEC.md](../SPEC.md) v0.2 (draft), with fictional people and organisations throughout.

- Live canvas (private until shared): https://claude.ai/artifact/BnCgM4zvLZpKiJGDaqqBix. Press Play: Help and the account open their menus.
- The logos load from the canvas's asset store, so open the pages there rather than from disk.

| File | Page | Shows |
|---|---|---|
| `Main.dc.html` | The AntaraX shell | The top bar in Yara's colours with its eight parts numbered and the account menu open; Help in Janka's colours; a phone in Angka's with its own bottom bar; the standard pages and their addresses; shell or own |
| `AppBar.dc.html` | Shared top bar | The bar with its Help and account menus. Props: product, mode (wide, medium, phone), which menu is open, numbered parts |
| `Products.dc.html` | Six products | Yara (sidebar, board), Janka (tabs, list), AX Frame (no menu, a map), Angka (floating sidebar on paper), Tinara (flat bar, narrow rail), PLExyz Grid (zone map, side panel): each its own, one shell |
| `SignIn.dc.html` | Getting in | Janka's sign-in and Angka's invitation page: the same items and words (§6), each product's own look |
| `Moments.dc.html` | Shared moments | Banners stacked in order (Yara), notifications (Yara), Assist (AX Frame), Send feedback (Janka), confirming a deletion (Angka), an empty state and a toast (Tinara), an error page (PLExyz Grid) (§7 to §11) |
