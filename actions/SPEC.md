# Acting: confirmations, progress and results

**Version 1.1, the standard (owner, 18 Oct 2026; Dashboard kit 1.8.0; 1.1 on 26 Oct 2026, Dashboard kit 1.10.0, adds the labels row to §7).** What happens when a person presses a button in any AntaraX customer app or AXLE: whether it asks first, what they see while it works, and how they learn it worked or failed. It gathers and replaces the short rules in [app/SPEC.md](../app/SPEC.md) §11 (confirming, toasts) and [axle/SPEC.md](../axle/SPEC.md) §14, and builds on the seven kinds of wait in app SPEC §12 and brand kit guide 14. ISO Generator is on hold.

**Look and behaviour are separate.** How a dialog, a toast or a progress panel looks is the product's own (AXLE's is fixed by axle SPEC §4); what it holds, what it says and how it behaves are fixed here.

**Words used here.** *Action*: anything a person starts with a button, a menu item or a shortcut that changes something. *Thing*: what the action changes, by its name ("Tegap Fabrication", "WO-2026-0412", "Aina Rahman"). Each rule has an id (`AC-…`). The three *levels* here are about confirming; AXLE's R8 safety levels (axle SPEC §14.1) are a separate thing.

---

## 1 The bare minimum

| Id | Must |
|---|---|
| AC-01 | **No browser pop-ups.** Never `alert()`, `confirm()` or `prompt()`; every question is an in-app dialog (§5) |
| AC-02 | **Every action is at one of three levels** (§2) and confirms the way its level says, no more and no less |
| AC-03 | **Irreversible actions ask the person to type the thing's name** and ask again for the password or a code (getting-in GI-13) |
| AC-04 | **A confirm button names the action and the thing** ("Delete Tegap Fabrication"), never "OK", "Yes" or "Confirm" |
| AC-05 | **Every button that sends a request shows it is working**, cannot be pressed twice, and keeps the form filled if it fails |
| AC-06 | **What a person sees while an action runs depends on how long it takes** (§3): the button for under 2 seconds, a progress dialog for longer or many-record actions, a background job for long ones |
| AC-07 | **No wait is silent or generic**: the product's own loader for that kind of wait (app SPEC §12), the words of the action beside it for anything over 2 seconds, and after 10 seconds what is happening and a way out |
| AC-08 | **Every action ends in a visible result**: a past-tense toast naming the thing, with Undo where it can be undone (§4) |
| AC-09 | **Errors say what failed and what to do**, where it happened, with Retry when trying again can work; never a raw server or provider message, never "Something went wrong" alone (§4) |
| AC-10 | **Leaving unsaved changes asks first** ("Discard changes?"), unless the form saves as the person types |
| AC-11 | **Dialogs are accessible**: focus moves in and is kept there, Escape cancels, focus returns to the button that opened it, the safe choice is focused first in anything destructive (§5) |
| AC-12 | **Many at once reports each**: a bulk action names the count, shows progress, and says which items failed (§4) |

## 2 Three levels of confirmation

**The level is decided when the action is designed, by what can be undone**, not by how alarming it feels. A product lists its actions with their level (§9).

| Level | When | What happens | Example |
|---|---|---|---|
| **1 · Undoable** | The action can be reversed in one step: a soft delete, an archive, a move, a status change, marking read | **No question.** It happens at once; the toast offers **Undo** for 8 seconds. A deleted record goes to its list's Trash for 30 days, with Restore | "Work order WO-2026-0412 deleted · Undo" |
| **2 · Consequential** | It cannot be undone in one step, but nothing is lost for good, or it affects other people: removing a member, revoking a key, cancelling a plan, disconnecting an integration, ending someone's sessions, sending something to a customer | **A dialog** that says what will happen, to whom, and what the person loses or can still do ("Aina loses access to Tegap Fabrication at once. Their work stays."). The button names the action and the thing | "Remove Aina Rahman" |
| **3 · Irreversible** | Data or access is lost for good, or the whole organisation is affected: deleting an account, an organisation or a project with its data; deleting more than 50 records at once; resetting or clearing data; revoking every key; transferring ownership | **A dialog** that lists what will be lost (with counts), then **type the thing's name** to enable the button, then **asking again** for the password or a code (getting-in GI-13). In AXLE, also a **second staff member** approves (axle SPEC §5.2) | "Delete Tegap Fabrication" enabled only after typing `Tegap Fabrication` |

- **Deleting an organisation or an account** is Level 3 even though app SPEC §4 keeps a 30-day undo: the undo is a safety net, not a reason to ask less.
- **Bulk actions** take the level of one item, and become Level 3 above 50 items or when they cross organisations. A bulk action has no single name, so the person types the number of items ("Type 120 to confirm"). It asks again for the password or a code only when the items are deleted for good; when they go to Trash, typing the number is enough.
- **A Level 2 or 3 dialog never stacks** on another dialog; finish or cancel the first.
- **Reasons:** where the product records why (AXLE always, a product for suspensions and refunds), the dialog asks for the reason before the button enables.

## 3 While it runs: by how long it takes

Each action has an **expected duration**, set when it is designed, which decides what the person sees. If an action takes much longer than expected, it moves up a row on its own.

| Expected | What the person sees | Kind of wait (app SPEC §12) |
|---|---|---|
| **Under 400ms** | The button's pressed state; nothing else | None |
| **400ms to 2 seconds** | **The button is busy:** disabled, its label in the present ("Saving…", "Sending invitation…") beside the product's inline loader; other buttons that would clash are disabled; the form stays editable only if a change would not be lost | Inline |
| **Over 2 seconds, or changing many records, or several steps** | **A progress dialog:** the action as its title ("Importing 1,240 items"), the product's progress loader, a count ("312 of 1,240") or the steps with their state (done, now, to come), and **Cancel** when it can stop safely, **Run in background** when it can carry on without the page. Escape does not close it while it runs. It closes into the result (§4) | Progress |
| **Over 30 seconds, or anything that keeps running if the person leaves** (imports, exports, AI over many records, reports) | **A background job:** a toast "Import started · see progress", a jobs panel (a count on the bell or a tray) with each job's progress and Cancel, the page stays usable, and a notification (and for exports, the `system.export_ready.v1` email) when it ends | Progress, in the panel |

- **After 10 seconds**, any wait says what is happening and offers a way out (app SPEC §12): Cancel, Run in background, or "We'll tell you when it's done".
- **AI actions** use the thinking state (brand kit 13 §6b) instead of a progress loader, with the same rows by duration.
- **Optimistic changes** are allowed for Level 1 actions under 2 seconds: the change shows at once, and if the server refuses, it goes back with a toast that says so and offers Retry.
- **Nothing animates over data** being worked on; the loader sits beside it.

## 4 The result

**Success:**

- A **toast**, past tense, naming the thing: "Invitation sent to Aina Rahman", "WO-2026-0412 deleted". Bottom of the page, away from the top bar; 6 seconds, longer while it is hovered or focused; announced politely to screen readers.
- **Undo** on the toast for Level 1 actions (8 seconds).
- **A result the person needs to act on** (a file ready, an import with warnings) stays until dismissed, as a notification or a result panel, not a toast.

**Failure:**

| Where it failed | What the person sees |
|---|---|
| A field | Under the field, linked with `aria-describedby`; focus moves to the first one; the form keeps everything typed |
| An action from a dialog | The dialog stays open with the error inside it, above the buttons; the button returns to its label |
| An action from a page | A toast that stays until dismissed: what failed, why if known, **Retry** when trying again can work |
| A background job | Its notification and its row in the jobs panel, with the reason and Retry |
| Many items | "46 of 48 updated. 2 couldn't be." with **Show which**; the failed items keep their selection so they can be retried |

- **Words:** what failed, then what to do: "Couldn't send the invitation. Check the email address and try again." Never a raw server or provider message, never a stack trace, never "Something went wrong" without what and what next. A request id in small mono type when support may need it.
- **Offline or a dropped connection:** "You're offline. Your changes are kept and will send when you're back." when the product can queue; otherwise the form stays filled with Retry.

## 5 Dialogs

- **In-app only** (AC-01). On phones, a dialog is a sheet from the bottom.
- **Title** is the question or the action: "Delete Tegap Fabrication?", "Remove Aina Rahman?". Never "Are you sure?".
- **Body** says what will happen, in plain words, with counts ("3 projects and 1,240 work orders"), and what stays.
- **Buttons:** Cancel first and focused in anything destructive; the action button names the action and the thing, in the product's fault colour when it destroys something; a Level 3 button is disabled until the name is typed exactly (case and spaces as shown; paste allowed).
- **Behaviour:** focus moves into the dialog and stays there, Escape and Cancel close it (not while a progress dialog runs), focus returns to the button that opened it, the page behind cannot be used, and the dialog is labelled by its title.
- **Busy inside a dialog:** the action button follows §3 ("Deleting…"); Cancel stays available until the request is sent.

## 6 Unsaved changes

- Leaving a page, closing a panel or closing a dialog with unsaved changes asks: **"Discard changes?"** with **Keep editing** (focused) and **Discard**.
- A form that saves as the person types says so ("Saved" with the time) and never asks.
- Closing the browser tab with unsaved changes uses the browser's own leave warning, the one place a browser prompt is right.

## 7 Words

| Use | Never |
|---|---|
| Delete Tegap Fabrication · Remove Aina Rahman · Revoke key "Production" | OK · Yes · Confirm · Submit |
| Delete Tegap Fabrication? | Are you sure? |
| Saving… · Sending invitation… · Importing 312 of 1,240 | Loading… on its own · Please wait |
| Invitation sent · WO-2026-0412 deleted · Undo | Success! · Operation completed |
| Couldn't send the invitation. Check the email address and try again. | Something went wrong · Error 500 · An unexpected error occurred |
| Discard changes? · Keep editing · Discard | Leave page? · You have unsaved changes (with no choice) |
| Type **Tegap Fabrication** to confirm | Type DELETE |
| Remove · Save view · Start support session, each a button | Remove… · Save view... · a text link that does something |

Sentence case; the brand kit's voice (03). What starts an action is a button, never link text, and no label on a control ends in "…" (owner, 26 Oct 2026; [app SPEC §11b](../app/SPEC.md#11b-buttons-and-links), [axle SPEC §14.2](../axle/SPEC.md#142-buttons-and-links-owner-26-oct-2026)). The busy words above ("Saving…") are a state while the action runs (§3), not a label.

## 8 Reference components

[`app/reference/ConfirmDialog.jsx`](../app/reference/ConfirmDialog.jsx) (levels 2 and 3, typed name, busy and error states), [`app/reference/ProgressDialog.jsx`](../app/reference/ProgressDialog.jsx) (count or steps, Cancel, Run in background) and [`app/reference/useAction.js`](../app/reference/useAction.js) (busy state, no double submit, result and error, Retry). Plain React with the shell tokens; the look is the product's own.

## 9 How to prove it

- `node tools/check-actions.mjs PATH` scans a product's source for `alert(`, `confirm(` and `prompt(` (AC-01), for buttons that call a request without a busy state where it can tell, and for generic error strings ("Something went wrong", "An error occurred"). It lists each with file and line.
- Each product keeps **a list of its actions** with their level and expected duration (a table in its docs), and its tests cover each Level 3 action: the button stays disabled until the name is typed, and the password or code is asked again.
- By hand, on the longest action: the progress dialog appears, counts, cancels; the result names the thing; a failure keeps the form and offers Retry.

## 10 Today

Checked on 18 Oct 2026 against each product's main branch (Tinara: `build/production-foundation`), by reading the code, not by clicking through. ✓ meets the rule, ◐ in part, ✗ not at all. Native pop-ups count `alert`, `confirm` and `prompt` calls, including clipboard fallbacks.

| Product · surface | Confirm component | Native pop-ups (AC-01) | Typed name for Level 3 (AC-03) | Undo (§2 L1) | Progress over 2s (AC-06) | Success toast (AC-08) | Errors written for people (AC-09) | Unsaved warning (AC-10) | Dialog focus (AC-11) |
|---|---|---|---|---|---|---|---|---|---|
| Yara · app and worker | ✓ `useDialog` | 0 | ✗ none asked | ◐ reopen, reactivate | ◐ label only | ✓ | ◐ ~48 raw database messages | ✗ | ◐ danger button focused first, focus not returned |
| Yara · AXLE | ✓ shared | 0 | ✗ | ◐ | ◐ | ✓ | ◐ | ✗ | ◐ as above |
| YaraOne · team and portal | ✗ | 5 | ✗ | ✗ | ✗ spinner, no upload indicator | ✗ no toasts | ✗ refused changes vanish silently | ◐ wizard drafts only | ✓ Radix, where a dialog exists |
| YaraOne · AXLE | ✗ | 2 | ✗ inline two-step | ✗ | ◐ | ◐ | ✗ errors thrown away | ✗ | ✗ |
| AX Frame · app | ✓ `ConfirmModal` | 5 (4 copy fallbacks) | ◐ typed name for projects and assets, typed DELETE for the account, no asking again | ◐ map and quick start | ◐ label only | ◐ 9 callers | ✗ 104 raw database messages | ✗ | ✓ |
| AX Frame · AXLE | ✓ `ReasonDialog` | 0 | ◐ | ✗ | ◐ | ◐ inline | ◐ raw messages | ✗ | ◐ no trap, focus not returned |
| Janka · app and phone | ✗ | 25 | ✗ | ◐ imports | ◐ counts, no cancel | ✓ | ◐ raw messages, gone in 3.5s | ✗ | ◐ focus lands on the close button |
| Janka · AXLE | ✗ | 9 | ✓ organisation delete | ◐ | ◐ Cancel hides a running upload | ✓ | ◐ | ✗ | ◐ |
| Angka · app | ✗ hand-built per dialog | 0 | ✓ account, business, start over | ✓ Trash for 30 days, some Undo toasts | ✓ arrivals pill and notification | ◐ about 6 callers | ◐ 8+ swallowed errors | ✗ (upload only) | ✓ Radix |
| Angka · AXLE | ✓ `useConfirmAction` | 0 | ✓ tenant, account | ✗ | ◐ | ✗ | ◐ raw provider detail on purpose | ✗ | ✓ |
| PLExyz Grid · app | ✗ | 3 | ✗ | ✗ | ◐ AI only | ◐ Canvas page only | ✗ sync errors only in Settings | ✗ | ◐ no trap |
| PLExyz Grid · AXLE | ✗ | 5 | ✗ | ◐ reactivate | ◐ spinner, no words | ✗ | ✗ raw Stripe and server text | ✗ | ✗ browser OK focused |
| PLExyz Crowd · console | ✗ | 1 | ✗ | ◐ floor plan only | ◐ import count, no cancel | ✗ | ✗ failures look like success; errors in green | ✗ | ✗ |
| Tinara · app | ✓ `Modal` | 1 | ✗ | ✗ | ◐ no cancel | ◐ some false | ◐ raw provider message | ✗ | ✗ no role, Escape or focus |
| Tinara · admin | ◐ forms only | 0 | ✗ | ◐ | ◐ | ◐ | ✗ raw Postgres replaces the table | ✗ | ✗ |
| Lapisan Console | ✗ | 1 helper, 5 uses | ✗ | ✗ | ◐ | ✓ inline `Answer` | ◐ no `error.tsx` | ✗ | ✗ browser OK focused |

**Across every product:** no product warns about unsaved changes; nothing that runs long can be cancelled (no `AbortController` anywhere); no busy button says what it is doing in more than one product in three; and raw database or provider text reaches people in all of them.

**Actions that destroy something with no question at all today** (Level 2 or 3 under §2):

| Product | Actions |
|---|---|
| Yara | Revoke a status API key · remove a checklist task · remove a holiday · end a part standard · AXLE: void an invoice, set a subscription to cancelled |
| YaraOne | Revoke a permission · change a member's role · withdraw a shared deck · approve or decline a quote in the portal · AXLE: pause or cancel an organisation, sign someone out everywhere |
| AX Frame | Delete a comment · remove someone from an asset's access list · remove an asset from a project · AXLE: change a staff role, remove a plan limit, make an organisation complimentary |
| Janka | Remove a lot · change a member's role · AXLE: change plan, overwrite a tenant's AI key, save the feature matrix |
| Angka | Remove a member · change a role · withdraw an invitation · stop a share link · disconnect chat · delete an intake address · change plan · AXLE: remove a tenant member, stop an API key for good |
| PLExyz Grid | Delete a zone with everything in it · delete a space · delete a reminder rule · reject a booking · clear all data · AXLE: change a member's role |
| PLExyz Crowd | Remove a user · delete a visitor dataset · delete an alert rule · delete a zone |
| Tinara | Remove from the watchlist · spend 30 credits on a brief or 5 on a deep scan · admin: switch an organisation's data mode |
| Lapisan Console | Take back an invitation · change a role · sign out everywhere |

**Where something says one thing and does another** (fix first; each is a separate task):

- Tinara says an archived profile "can be restored from the admin panel"; it is deleted for good. The re-run dialog says it costs 1 credit; it costs 10. With briefs switched off, the spinner never ends and demo credits are not refunded.
- YaraOne: pressing Cancel on "close the open tasks?" still completes the milestone. A refused change disappears with no message, and offline changes look saved.
- Angka's bulk button says "Remove N for good"; the items go to the 30-day Trash. "Set aside" says it worked before the server answers, and is not undone if it fails.
- PLExyz Crowd: most changes never check the answer, so a failure looks like success; dropped import batches still report "done"; Settings shows errors in green.
- PLExyz Grid: saves that fail are not undone on screen and the failure appears only in Settings.
- Janka AXLE: Cancel on the bulk photo import closes the dialog while the upload keeps running.

## 11 What each product changes

In this order in every product: first what says one thing and does another (§10), then the actions with no question, then the shared components, then the rest. Each product's actions list (§9) is part of the first change.

**All products**

1. Write the actions list: every action, its level and expected duration.
2. Take a confirm dialog, a progress dialog and the busy hook from §8, or bring the product's own up to them.
3. Replace every native pop-up (AC-01). A "copy this link" fallback becomes a read-only field with Copy.
4. Map server and provider errors to written messages in one place (AC-09). Keep the raw text for the log and a request id on screen.
5. Add "Discard changes?" to forms that do not save as the person types (AC-10).
6. Make the longest action cancellable, with a progress dialog (§3).

**Per product**

| Product | First | Then |
|---|---|---|
| Yara | Confirm the six actions in §10 (Level 2) | Typed name plus asking again for permanent bulk deletes of Work Orders and users (Level 3) · focus Cancel first and return focus in `Modal.tsx`, and fix the note field losing focus in the `choose` dialog · Undo on status changes and removals that can be reversed · map the ~48 database messages |
| YaraOne | Show a refused change ("Couldn't save … · Retry") and offline state (`useStoreFailure`) · respect Cancel on milestone completion | A confirm component on the Radix dialog; confirm the actions in §10, the quote approval included · toasts with Undo · a typed name for AXLE's organisation delete · an upload indicator · ask before an AI draft replaces typed text |
| AX Frame | Pass `busy` to the six `ConfirmModal`s without it · map `DataProvider`'s raw messages | Ask for the password or code again on account delete, and type the account's email instead of DELETE · use the toast for every delete and save, with Undo where it can be undone · confirm the actions in §10 · `ReasonDialog`: trap focus and return it |
| Janka | One confirm component replacing the 25 + 9 native confirms · make the photo import's Cancel stop the upload | Confirm the actions in §10 · disable member actions while they run · error toasts stay until dismissed, with Retry · cancel on forecasting and AI reviews |
| Angka | Fix "Remove N for good" (it goes to Trash, so "Move N to Trash") and show "Set aside" only once the server answers · stop swallowing errors | A customer-app confirm from AXLE's `useConfirmAction` · confirm the actions in §10 · "Leave the business" in the fault colour · toasts paused while hovered or focused · Undo toasts pointing to Trash |
| PLExyz Grid | Confirm deleting a zone, building or section, with what goes with it · show a failed sync where it happened, with Retry | A confirm component replacing the 8 native pop-ups · toasts on every page · focus trap in `useDialogA11y` · warn before a form closes with typed input |
| PLExyz Crowd | Check every answer: a failure must say so · errors in the fault colour · stop reporting dropped import batches as done | Confirm the deletes in §10 · busy states on every submit · a dialog component for adding a device · cancel on the import |
| Tinara | Make the archive true (soft delete with Restore) or change the words · correct the re-run cost · end the spinner and refund credits when briefs are off | Confirm credit spending (30-credit brief, 5-credit deep scan) · `Modal`: role, label, Escape, focus · `aria-live` and close on toasts · confirm the admin data-mode switch |
| Lapisan Console | Replace `window.confirm` in `forms.tsx` with a dialog that names the endpoint or account · add `error.tsx` | Confirm taking back an invitation, a role change and signing out everywhere · say what is happening instead of "Working…" · Undo on pausing an endpoint |
| ISO Generator | On hold | — |
