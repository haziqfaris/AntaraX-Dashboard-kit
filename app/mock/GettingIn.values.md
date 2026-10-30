<!-- values for GettingIn.dc.html, source c1b2907e68a76654 -->
Every number below is read from the mock. **Standard** rows must hold in every product (getting-in/SPEC.md section in brackets); **own** rows are how this board draws Janka's side, an example and not a rule.

| Part | Value | Kind |
|---|---|---|
| Screens shown | Sign in · Choose a new password · Sign-in link sent and Link expired · Two-step: set up · Backup codes · Two-step: enter a code · Too many attempts · Session ended · Your account | Standard (§3) |
| Sign in holds | Continue with Google, "or", Email, Password with Show, Keep me signed in, Forgot your password?, Sign in, Email me a sign-in link instead, Help · Privacy · Terms | Standard (§3, GI-01, GI-11) |
| Show | A button inside the field, 36px tall in a 44px field, `aria-pressed`, named "Show password" / "Hide password", in the tab order | Standard (§4, GI-02) |
| Caps Lock | "Caps Lock is on", 12px, warning text `#B54708`, under the field | Standard (§4, GI-05) |
| Strength meter | 4px bar under the field: 25% fault `#F04438` "Weak: ‹reason›", 50% warn `#F79009` "Fair: ‹suggestion›", 75% and 100% ok `#12B76A` "Good" / "Strong"; "At least 12 characters" while shorter; "Use at most 64 characters" when longer; announced politely | Standard (§4, GI-04) |
| Password rule line | "12 to 64 characters, any kind. Saving signs you out on your other devices." | Standard (§4, GI-03, GI-19) |
| Reset email field | Read-only, `autocomplete="username"`, so the password manager saves under the right account | Standard (§4, GI-06) |
| Link sent | "If an account exists for ‹email›, we've sent a sign-in link. It works once, for 15 minutes." Send it again waits 60 seconds | Standard (§3, §5, GI-07) |
| Two-step set up | QR code, the key as text with Copy, a 6-digit `one-time-code` field (mono 20px, letter-spacing .25em), Turn on; "Your role needs two-step sign-in" when required | Standard (§3, §6, GI-09) |
| Backup codes | 10 codes in mono, Copy, Download as text, "I've saved them" before Done | Standard (§6) |
| Wrong code | "That code didn't match. Check your app and try again." Field border fault `#F04438`, message `#B42318` | Standard (§10) |
| Too many attempts | "Too many attempts. Try again at 14:32." on a fault tint `#FEECEB`, text `#B42318`; Sign in disabled; the form stays filled | Standard (§7, GI-08) |
| Session ended | "You've been signed out because ‹reason›. Sign in again to carry on." Returns to the page the person was on | Standard (§3, GI-20) |
| Your account | Password (Change), Two-step (On, required, codes left), Signed in on (device, place, when, Sign out), Sign out everywhere; asking again noted | Standard (§8, GI-13, GI-14, GI-19) |
| Fields and buttons | 44px; radius 12px; 1px `#E2E9ED`; primary `#077DA1` with white text | Own (Janka) |
| Cards | White, radius 20px, 1px `#E2E9ED`, padding 24px | Own (Janka) |
