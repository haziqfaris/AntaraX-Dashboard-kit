<!-- values for ActionsPLExyzGrid.dc.html, source d734c6a99d6c4c4c -->
Every value below is read from the mock, which draws `ActionsScreens.dc.html` for PLExyz Grid. **Standard** rows hold in every product (actions/SPEC.md section in brackets). **Own** rows are how this board draws PLExyz Grid's side, from its palette in `brand/product-palettes.json` and its own records.

| Part | Value | Kind |
|---|---|---|
| States | Level 1 (Deleted with Undo, Archived with Undo, Trash, Restored) · Level 2 (Remove a member, Revoke a key, Cancel the plan, It failed inside the dialog) · Level 3 (Delete the organisation, Name typed and asking again, Deleting, Delete 60 at once) · While it runs (Button busy, Progress with a count, Progress in steps, Background job) · The result (Saved, It failed with Retry, Field errors, Some of many failed, Offline, Discard changes?): 22 | Standard (§2–§6) |
| Level 1 | No question; a dark toast "Site Bangsar South deleted" with Undo; Trash keeps sites 30 days with Restore | Standard (§2) |
| Level 2 | A dialog over the dimmed page: the title asks the question with the thing named, the body says what happens, Cancel first, the action button names the action and the thing in `#B42318` ("Remove Aisyah Rahman", and "Revoke" with the key's name); "Cancel your plan?": you keep it until 14 Nov 2026, then move to the free plan; an error stays inside the dialog | Standard (§2, §5) |
| Level 3 | The body lists what goes (6 sites, 288 meters and 2.1 million readings); "Type Bumi Tenaga to confirm"; the button stays pale until the name is typed; then "Your password" with Show; while it runs, Cancel is off and the button reads "Deleting…" with the dots loader. Bulk: "Type 60 to confirm", no password because the items go to Trash | Standard (§2, AC-03) |
| While it runs | Button: "Saving…" with dots, Cancel off. Progress dialog: "Importing 48 meters", a 6px bar at 25% with the count in mono, Cancel and Run in background. Steps: done `#12B76A`, now in the action colour, to come grey. Jobs panel: Cancel on each running job, Download when done, toast "Import started · See progress" | Standard (§3) |
| The result | Saved: dark toast. Failed: a toast on `#FEECEB` in `#B42318` with Retry that stays. Field: a 1px `#B42318` border with the message under it. Bulk: `#FEF4E6` alert "58 of 60 sites updated. 2 couldn't be." with Retry per item. Offline: a note on the tint. Discard changes? with Keep editing as the main button | Standard (§4, §6) |
| Action colour | `#2C09B2` with white text; tint `#F4F6FE` | Own (PLExyz Grid) |
| Card radius | 24px; frames at most 20px | Own (PLExyz Grid) |
| Buttons and fields | 36px and 38px drawn (44px in the product), radius 12px | Own (PLExyz Grid); 44px standard |
| Example records | Bumi Tenaga (organisation), Site Bangsar South, Aisyah Rahman, Meter feed key “Bangsar gateway”; all fictional | Own |
