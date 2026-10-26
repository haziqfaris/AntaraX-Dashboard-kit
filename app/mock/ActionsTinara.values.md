<!-- values for ActionsTinara.dc.html, source 3cac4f28a172646c -->
Every value below is read from the mock, which draws `ActionsScreens.dc.html` for Tinara. **Standard** rows hold in every product (actions/SPEC.md section in brackets). **Own** rows are how this board draws Tinara's side, from its palette in `brand/product-palettes.json` and its own records.

| Part | Value | Kind |
|---|---|---|
| States | Level 1 (Deleted with Undo, Archived with Undo, Trash, Restored) · Level 2 (Remove a member, Revoke a key, Cancel the plan, It failed inside the dialog) · Level 3 (Delete the organisation, Name typed and asking again, Deleting, Delete 84 at once) · While it runs (Button busy, Progress with a count, Progress in steps, Background job) · The result (Saved, It failed with Retry, Field errors, Some of many failed, Offline, Discard changes?): 22 | Standard (§2–§6) |
| Level 1 | No question; a dark toast "Prospect Sinar Tech deleted" with Undo; Trash keeps prospects 30 days with Restore | Standard (§2) |
| Level 2 | A dialog over the dimmed page: the title asks the question with the thing named, the body says what happens, Cancel first, the action button names the action and the thing in `#B42318` ("Remove Nur Aina Hashim", and "Revoke" with the key's name); "Cancel your plan?": you keep it until 14 Nov 2026, then move to the free plan; an error stays inside the dialog | Standard (§2, §5) |
| Level 3 | The body lists what goes (840 prospects, 3 pipelines and 6 months of scores); "Type Harapan Ventures to confirm"; the button stays pale until the name is typed; then "Your password" with Show; while it runs, Cancel is off and the button reads "Deleting…" with the dots loader. Bulk: "Type 84 to confirm", no password because the items go to Trash | Standard (§2, AC-03) |
| While it runs | Button: "Saving…" with dots, Cancel off. Progress dialog: "Importing 840 companies", a 6px bar at 25% with the count in mono, Cancel and Run in background. Steps: done `#12B76A`, now in the action colour, to come grey. Jobs panel: Cancel on each running job, Download when done, toast "Import started · See progress" | Standard (§3) |
| The result | Saved: dark toast. Failed: a toast on `#FEECEB` in `#B42318` with Retry that stays. Field: a 1px `#B42318` border with the message under it. Bulk: `#FEF4E6` alert "82 of 84 prospects updated. 2 couldn't be." with Retry per item. Offline: a note on the tint. Discard changes? with Keep editing as the main button | Standard (§4, §6) |
| Actions in toasts and rows | Undo, Open, See progress, Restore, Cancel, Retry and Download are small outlined buttons (28px drawn, radius 8px): a 1px line in the toast's text colour on a toast, `line` with ink text in a row; never link text, and no label ends in "…" | Standard (§7; app SPEC §11b) |
| Action colour | `#7A1E3C` with white text; tint `#FEF4F6` | Own (Tinara) |
| Card radius | 0px; frames at most 20px | Own (Tinara) |
| Buttons and fields | 36px and 38px drawn (44px in the product), radius 4px | Own (Tinara); 44px standard |
| Example records | Harapan Ventures (organisation), Prospect Sinar Tech, Nur Aina Hashim, Data source “Companies registry”; all fictional | Own |
