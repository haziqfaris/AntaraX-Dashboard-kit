# Reference implementation

The shell's top bar, its two menus, the list toolbar and the password field in plain React and CSS variables, built only from [`app/tokens.css`](../tokens.css). Copy what you need into a product; the only dependency is React (18 or later). It is a reference, not a package: a product may rebuild every part in its own stack, as long as the result measures the same (`tools/check-shell.mjs`).

| File | What it is |
|---|---|
| `AppBar.jsx` | The whole bar in §2's order, with `useBarSize()` for wide, medium and phone |
| `BrandPill.jsx` | The AntaraX A and the product chip in one well |
| `RoundControl.jsx` | A 44px round control: menu, search, notifications, Help; with a count |
| `HelpMenu.jsx` | Help's six items; the last three call YaraOne's front office (`openYaraOne`) |
| `AccountMenu.jsx` | The account button and menu in §3's order; Sign out asks first |
| `ListToolbar.jsx` | Saved views, search, filters, sort, group, view and CSV for a long list (§11a), and `NoMatch` |
| `useListState.js` | A list's state kept in the address and per person; `useSavedViews` for its named views; `toCsv`, `csvName`, `downloadCsv` |
| `PasswordField.jsx` | A password field to [getting-in/SPEC.md](../../getting-in/SPEC.md) §4: Show, the Caps Lock warning, `autocomplete`, and for a new password the strength meter in words (pass zxcvbn-ts as `estimate`) |
| `useMenu.js` | Focus, arrow keys, Tab kept inside, Escape and a click outside, for both menus |
| `icons.jsx` | The six icons, inline |
| `shell.css` | Every style, from `--shell-*` variables only |
| `demo/` | All of it on one page, in any product's colours |

## Use

```jsx
import '../tokens.css';           // app/tokens.css from this kit, generated from the brand kit
import './reference/shell.css';
import { AppBar, useBarSize } from './reference';

<AppBar
  product={{ key: 'yara', name: 'Yara', mark: '/yara.svg', aMark: '/antarax-a-blue.svg' }}
  size={useBarSize({ phoneBelow: 768 })}
  title="Work orders"
  slot={<button className="ax-slot-button is-action">New work order</button>}
  search={{ onOpen: openPalette, shortcut: '⌘K' }}
  notifications={{ count: 3, onOpen: openNotifications }}
  help={{ openYaraOne: (view) => YaraOne.open(view, { token, context }) }}
  account={{ person, organisation, isOwner, plan, version, onSignOut }}
/>
```

- `product.key` is the palette name in `app/tokens.css`: `yara`, `frame`, `janka`, `grid`, `crowd`, `angka`, `tinara`, `loom`, `motion`. A REKA client project uses `project/`, never these.
- `aMark`: the brand kit's `antarax-a-blue.svg` on a light bar, `antarax-a-white.svg` on a dark one (`theme="dark"`).
- The slot is the product's own: `.ax-slot-button` gives the 40px size and the 44px hit area; restyle the rest.
- Navigation is the product's own; put `.ax-nav-item` on its links (or copy its two rules) for the current item and hover (§2.5).
- The list toolbar's look is the product's own; its parts are not (§11a).

## Run the demo

```bash
cd app/reference/demo
npm i --no-save react@18.3.1 react-dom@18.3.1 esbuild@0.24.0
npx esbuild demo.jsx --bundle --outfile=demo.js --jsx=automatic --loader:.js=jsx
cd ../.. && npx http-server -p 8765 .   # then open http://localhost:8765/reference/demo/demo.html?product=janka&theme=dark
node ../tools/check-shell.mjs "http://localhost:8765/reference/demo/demo.html?product=janka" --product janka
```
