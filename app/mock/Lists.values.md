<!-- values for Lists.dc.html, source 0bd35f58eba78e20 -->
Every number below is read from the mock. **Shell** rows must match in every product (SPEC section in brackets); **own** rows are how this board draws the product's own side, an example and not a rule. Colours are the product's palette slots (`app/tokens.css`).

| Part | Value | Kind |
|---|---|---|
| The bar | AppBar, Yara, wide, "Work orders" | Shell (§2) |
| Search | 44px, radius 12px, 1px `border-input`, `/` hint | Required (§11a); look own |
| Filter buttons | 44px, radius 12px, 13px / 500; applied: `subtle-tint` with `on-tint` | Required; look own |
| Applied chips | 28px, radius 999px, `subtle-tint` with `on-tint`, × 20px; Clear filters link | Required (§11a) |
| Sort, Group | 44px buttons, direction shown (↑) and `aria-sort` on the column | Sort required, group where it helps |
| View | segmented List · Board · Table, 36px inside 3px padding on `well` | Where the data fits |
| Export CSV | 44px button; `‹product›-‹list›-‹YYYY-MM-DD›.csv` | When tabular |
| Remembered | "Saved for you" and the address, mono 12px | Required |
| Table | radius 16px, header 12px muted, rows 13px, ids and dates mono | Own |
| No match / Empty | 16px / 600 title, a line, one 44px button | Required (§11a, §11) |
