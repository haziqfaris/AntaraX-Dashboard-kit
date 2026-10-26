<!-- values for GettingInYaraOne.dc.html, source 4cae20980ca7dd92 -->
Every number below is read from the mock, which draws `GettingInScreens.dc.html` for YaraOne. **Standard** rows hold in every product (getting-in/SPEC.md section in brackets); **own** rows are how this board draws YaraOne's side, from its palette in `brand/product-palettes.json`.

| Part | Value | Kind |
|---|---|---|
| Screens | Signing in (Sign in, Wrong email or password, Too many attempts, Session ended) · Email me a sign-in link (Ask, Sent, the email, Expired) · Forgot your password (Forgot, Sent, the email, Choose, Breached, Saved, the changed email) · Two-step (Enter a code, Wrong code, Backup code, Required, Save your codes, Lost your phone) · Joining and leaving (Invitation, Expired, Signed out, Suspended); no sign-up: invited only | Standard (§3) |
| Ways in | Clients sign in with the code their team set (the field reads "Password or code"), or a sign-in link; no sign-up (YaraOne docs/16) | Own (recorded exception, §2) |
| Sign in holds | The mark and "YaraOne by AntaraX, from REKA.", Continue with Google, "or", Email, Password with Show, Keep me signed in, Forgot your password?, Sign in, Email me a sign-in link instead, Help · Privacy · Terms | Standard (§3) |
| Words | Exactly as getting-in/SPEC.md §3 and §10: "That email and password don't match.", "Too many attempts. Try again at 14:32.", "If an account exists for …", "This link has expired or has already been used", "Choose a new password", "That code didn't match. Check your app and try again." | Standard (§10) |
| Lifetimes | Sign-in link 15 minutes, reset link 60 minutes, invitation 7 days, confirm email 24 hours; Send it again after 60 seconds | Standard (§5) |
| Meter | 4px bar: 25% `#F04438` Weak, 50% `#F79009` Fair, 100% `#12B76A` Strong, with the reason in words | Standard (§4) |
| Emails | From "YaraOne <…@mail.antarax.ai>", the AntaraX layout: mark and "by AntaraX", heading, button, the link written out, how long it works, why it came, the credit, support and legal lines | Standard (§9) |
| Action colour | `#087F5B` with white text | Own (YaraOne) |
| Card radius | 24px; frames at most 20px | Own (YaraOne) |
| Fields and buttons | 40px drawn (44px in the product), radius 12px, 1px border in the palette's `border.default` | Own (YaraOne); 44px standard |
| Example organisation | Sinar Digital, a fictional customer | Own |
