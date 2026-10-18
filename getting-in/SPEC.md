# Getting in: signing in, passwords and account access

**Version 1.0, the standard (owner, 18 Oct 2026; Dashboard kit 1.7.0).** The minimum every AntaraX customer app and every AXLE must have for people to get in, stay in safely and get back in when something goes wrong. It replaces the short lists in [app/SPEC.md](../app/SPEC.md) §6 and §15.1, which now point here; the AXLE sign-in page's look stays in [axle/SPEC.md](../axle/SPEC.md) §5.1.1. ISO Generator is on hold: nothing here applies to it until the owner says so.

**Look and behaviour are separate.** In a customer app, how the screens look is the product's own (app SPEC §1); what each screen holds, what it says and how it behaves are fixed here. AXLE's look is fixed too (§5.1.1).

**Words used here.** *Person*: anyone signing in. *Staff*: REKA people using AXLE. *Must*, *should*, *may*: as usual. Each rule has an id (`GI-…`) that §13's check and each product's report use.

---

## 1 The bare minimum

A product is not released, and its AXLE is not used, until every line passes. These are the lines the 18 Oct 2026 check found missing most often (§14).

| Id | Must | Applies to |
|---|---|---|
| GI-01 | **Forgot your password?** on the sign-in screen, leading to a reset by email that ends on a "Choose a new password" screen | Every screen with a password |
| GI-02 | **Show** on every password field, to reveal what was typed, reachable by keyboard and named for a screen reader | Every password field |
| GI-03 | **Passwords: 12 to 64 characters of any kind** (at most 72 bytes), no rules about letters, numbers or symbols, refused when it appears in a list of breached passwords | Every new or changed password |
| GI-04 | **A strength meter in words** while choosing a password | Every new password field |
| GI-05 | **A Caps Lock warning** | Every password field |
| GI-06 | **Password managers work**: the right `autocomplete` on every field, paste never blocked, no "confirm password" field | Every form here |
| GI-07 | **The same answer whether or not an account exists**, on sign-in, reset, sign-in link and sign-up | Every form here |
| GI-08 | **Too many attempts slow down, then pause**, and say when to try again | Sign-in, codes, reset |
| GI-09 | **Two-step sign-in** with an authenticator app and 10 backup codes; required for Owners and Admins | Customer apps |
| GI-10 | **Staff two-step**: Google with 2-Step Verification, or email, password and a code | AXLE |
| GI-11 | **Email me a sign-in link**, which works once and for 15 minutes | Customer apps (never AXLE) |
| GI-12 | **Every link and code expires and works once** (§5) | Everywhere |
| GI-13 | **Asking again** for the password or a code before changing the email, the password or two-step, or deleting | Signed-in changes |
| GI-14 | **Change password, change email, two-step and sessions** on `/account`, with "Sign out everywhere" | Customer apps; AXLE's staff menu |
| GI-15 | **An email when the password or the email address changes**, to the person (the old address for an email change) | Everywhere |
| GI-16 | **Sessions**: secure cookies; "Keep me signed in" for 30 days, otherwise until the browser closes; AXLE sessions end after 12 hours | Everywhere |
| GI-17 | **Every sign-in, failure and change recorded** in the activity log, never with a password or a code | Everywhere |
| GI-18 | **Nobody chooses another person's password.** An admin sends a set-password link; a password someone else typed is changed at first sign-in | Everywhere |
| GI-19 | **Sign out ends this device only**; Sign out everywhere is its own action. A password change, by the person or by staff, ends every other session | Everywhere |
| GI-20 | **A session that ends says why** and, after signing in again, returns to the page the person was on (same site only) | Everywhere |

## 2 Ways in

| Where | Ways in | Since |
|---|---|---|
| **Customer apps** | Email and password · Continue with Google · Email me a sign-in link. All three in every product | Google and password: 15 Oct 2026. Sign-in link: 18 Oct 2026 |
| **AXLE** | Continue with Google (REKA's company accounts) · email and password, then a code. No sign-in link | 18 Oct 2026 (axle SPEC §5.1.1) |
| **Recorded exception: YaraOne's clients** | Their email and a code the team sets, or a sign-in link; no sign-up (YaraOne docs/16) | 16 Oct 2026 |
| **Recorded exception: Yara's workers** | A username and password on a shared or personal phone, set by their supervisor; "Forgot your password?" asks their supervisor (Yara's password request) instead of sending an email | Yara, before this standard |

Two-step and the rules below apply to every way in. A person who first signed in with Google can add a password later from `/account`, and the other way round.

## 3 Screens

**Every screen drawn, per product:** the shell canvas's Getting in boards (`app/mock/GettingIn‹Product›.dc.html`, rendered in `app/mock/renders/`), and AXLE's in `axle/mock/SignInScreens.dc.html`.

What each screen holds, in order. Addresses are the customer app's; AXLE uses the same screens under its own host.

| Screen | Address | Holds |
|---|---|---|
| **Sign in** | `/signin` | The product mark and "‹Product› by AntaraX, from REKA." · Continue with Google · "or" · Email · Password with Show · Caps Lock warning · Forgot your password? · Keep me signed in · **Sign in** · Email me a sign-in link instead · Create an account (where sign-up exists) · Help · Privacy and Terms at the foot |
| **Create an account** | `/signup` | The same, plus name, the plan they are starting on (brand kit name), the strength meter, and "By creating an account you agree to the Terms and Privacy" |
| **Confirm your email** | after sign-up | "Check your email. We sent a link to n***@contoh.example. It works for 24 hours." · Send it again (after 60 seconds) · Use a different email |
| **Sign-in link sent** | `/signin/link` | "Check your email. If an account exists for that email, we've sent a sign-in link. It works once, for 15 minutes." · Send it again (after 60 seconds) · Back to sign in |
| **Link expired or used** | the link's address | "This link has expired or has already been used." · Send a new link · Back to sign in. Never says which |
| **Forgot your password** | `/reset` | Email · **Send reset link** · Back to sign in |
| **Reset link sent** | `/reset` | "If an account exists for that email, we've sent a link to reset your password. It works once, for 60 minutes." · Send it again (after 60 seconds) |
| **Choose a new password** | `/reset/‹token›` | The email, read-only (so password managers save it) · New password with Show and the strength meter · **Save password**. On success: signed in, every other session signed out, the password-changed email sent, a toast "Password saved" |
| **Two-step: set up** | `/account/two-step` | A QR code, the key as text with Copy, the 6-digit field · **Turn on** · then the 10 backup codes: Copy, Download as text, "I've saved them" before continuing |
| **Two-step: enter a code** | after the password | "Type the 6-digit code from your authenticator app." · Code (`one-time-code`) · **Sign in** · Use a backup code · Use another account |
| **Two-step required** | after sign-in, for Owners and Admins without it | "Your role needs two-step sign-in. Set it up to continue." Then *Two-step: set up*. Cannot be skipped |
| **Lost your phone** | from *Enter a code* | Use a backup code; otherwise "Ask an Owner of ‹Organisation› to reset your two-step sign-in", or for an Owner, Contact support (YaraOne, app SPEC §10). Staff ask another Admin in AXLE |
| **Too many attempts** | any form | "Too many attempts. Try again at 14:32." The time in the person's time zone; the form stays filled |
| **Join from an invitation** | `/invite/‹code›` | As app SPEC §6. Expired or used: "This invitation has expired or has already been used. Ask ‹Inviter› for a new one." |
| **Session ended** | `/signin?ended` | "You've been signed out because ‹reason›. Sign in again to carry on." Reasons: you were inactive for too long · your password was changed · you signed out everywhere · your organisation was suspended |
| **Signed out** | after Sign out | Back to sign in, with "You've signed out" |
| **Wrong door** | AXLE | axle SPEC §5.1.1 |
| **Organisation suspended** | after sign-in | The organisation's name, the reason REKA gave, "Contact REKA support" (axle SPEC §10.2) |

## 4 Passwords

**The rules (owner, 18 Oct 2026).** Length and a breach check, never composition rules, which current guidance (NIST SP 800-63B) advises against because people meet them with predictable passwords.

- **12 to 64 characters, and at most 72 bytes.** Any characters: spaces, emoji, any script. Normalise to Unicode NFKC first. The 72 bytes are bcrypt's limit, which Supabase uses and which silently ignores anything longer; 64 ordinary characters always fit. Over the limit: "Use at most 64 characters."
- **No composition rules.** Never "one capital, one number, one symbol".
- **Refused when breached:** checked against HaveIBeenPwned's Pwned Passwords with k-anonymity (only the first 5 characters of the SHA-1 hash leave the server). Refused also when it is the person's email, their name or the product's name. The message: "This password has appeared in a data breach. Choose a different one."
- **If the breach service cannot be reached**, the password is accepted and checked at the next sign-in, never refused for the outage.
- **No expiry, no forced changes, no hints, no security questions.** A change is forced only when a breach or a compromise is known.
- **Stored only by the auth provider**, with a slow salted hash. Never emailed, never logged, never shown back.

**The field.**

- **Show** (GI-02): a button inside the field, 44px, `type="button"`, `aria-pressed`, named "Show password" or "Hide password"; the text reads Show or Hide. It is in the tab order (never `tabindex="-1"`) and never submits the form.
- **Caps Lock** (GI-05): "Caps Lock is on", under the field, while it is on (`getModifierState('CapsLock')` on key events), in the product's warning text colour.
- **No confirm field** (GI-06): Show replaces it.
- **`autocomplete`**: `username` (or `email`) on the email, `current-password` on sign-in, `new-password` on sign-up, reset and change, `one-time-code` on codes. A reset or change form includes the email (read-only or hidden with `autocomplete="username"`) so the password manager saves it under the right account.
- **Paste always works.** Never disable paste, copy or autofill.

**The strength meter** (GI-04). Advice, not a gate: only length and the breach check refuse a password.

| Step | Bar | Words |
|---|---|---|
| 0 | Empty | "At least 12 characters" (while shorter) |
| 1 | One quarter, fault colour | "Weak: ‹the main reason›" |
| 2 | Half, warn colour | "Fair: ‹a suggestion›" |
| 3 | Three quarters, ok colour | "Good" |
| 4 | Full, ok colour | "Strong" |

The reason and the suggestion come from zxcvbn (`@zxcvbn-ts/core` with the English and common-password dictionaries), in plain words: "This is a very common password", "Add another word or two", "Avoid dates and years", "Avoid repeated characters". The meter is announced politely (`aria-live="polite"`), and it is never colour alone.

**Reference component:** [`app/reference/PasswordField.jsx`](../app/reference/PasswordField.jsx) holds Show, Caps Lock and the meter. Pass it the product's own colours; it brings no look of its own beyond the shell tokens.

## 5 Links and codes

| What | Lifetime | Works | Notes |
|---|---|---|---|
| Sign-in link | 15 minutes | Once | Opens on any device, not only the one that asked |
| Confirm your email | 24 hours | Once | |
| Reset password link | 60 minutes | Once | Asking for a new one ends the old one; a password change ends every open link |
| Email code (where used) | 10 minutes | Once | 6 digits |
| Authenticator code | 30 seconds, one step either side | Once in its window | |
| Backup codes | Until used | Once each | 10, shown once; making new ones ends the old ones and needs asking again |
| Invitation | 7 days | Once | Resend makes a new link and ends the old one |
| Change of email | 24 hours | Once | The link goes to the new address; the old address gets a notice (GI-15) |

Every link is https and lands on the host that sent it (an AXLE reset opens on the AXLE host, never the app's), carries a random token of at least 128 bits, and is stored only as a hash. "Send it again" waits 60 seconds between sends.

## 6 Two-step sign-in

- **The method:** an authenticator app (TOTP), with 10 backup codes. Not SMS, because SIM swaps beat it. Passkeys come later, as an addition.
- **Who must use it (owner, 18 Oct 2026):** every **Owner and Admin** of an organisation (GI-09). Anyone else may turn it on. An Owner may still require it for the whole organisation (app SPEC §13). **Staff** always (GI-10): Google's 2-Step Verification enforced in REKA's Workspace, or the code after email and password.
- **When it starts:** a person who becomes an Owner or Admin without two-step sets it up at their next sign-in, before reaching anything else.
- **Recovery:** a backup code; otherwise an Owner resets a member's two-step from Members (asking again first, recorded in the activity log, the person told by email); an Owner who is locked out asks REKA support, who checks who they are and resets it from AXLE (recorded in Audit). Staff: another AXLE Admin.
- **Signing in with Google** counts as two-step only for staff (REKA's Workspace enforces it). A customer who uses Google and holds a role that needs two-step still sets up the authenticator.

## 7 Protection

**Attempts** (GI-08). Counted per account and per network address:

- after **5** failures, each try waits longer (1, 2, 4, 8 seconds);
- after **10**, sign-in pauses for **15 minutes**: "Too many attempts. Try again at 14:32";
- the same message whether or not the account exists;
- the same limits apply to codes (5 wrong codes end that sign-in) and to reset and sign-in link requests (5 an hour per email);
- a product may add a challenge (Cloudflare Turnstile) after 5 failures, never before the first try.

**Never say whether an account exists** (GI-07):

| Where | It says |
|---|---|
| Sign in, wrong email or password | "That email and password don't match." |
| Reset, sign-in link | "If an account exists for that email, we've sent …" |
| Sign-up with an email that already has an account | The same "Check your email" screen; the email tells them they already have an account and links to sign in |

**Sessions** (GI-16, GI-19, GI-20):

- secure, HTTP-only, `SameSite=Lax` cookies;
- **Keep me signed in** lasts 30 days, otherwise until the browser closes;
- **AXLE** sessions end after 12 hours, whatever is ticked;
- **Sign out** ends this device only (on Supabase, `signOut({ scope: 'local' })`; its default signs out everywhere); **Sign out everywhere** is its own button on `/account`;
- changing the password, by the person, by an admin or by staff in AXLE, signs out every other session;
- a session that ends shows *Session ended* with the reason, and after signing in returns to the page the person was on (a path on the same site only, never a full address, so the link cannot send them elsewhere);
- `/account` lists each signed-in device (browser, place by country, last active) with Sign out, and **Sign out everywhere**.

**Asking again** (GI-13): before changing the email, the password or two-step, making new backup codes, deleting an account or an organisation, or changing billing. The password or a code from the last 10 minutes counts; a Google-only person signs in with Google again.

**Passwords chosen by someone else** (GI-18). An Owner, an Admin or staff never type a password for someone: they send a set-password link (§5, 72 hours, once). Where a product must hand over a starting password, such as Yara's supervisors for workers on a shared phone, the person chooses their own at first sign-in, before anything else.

**Recording** (GI-17): every sign-in, failure, lock, reset, change of password, email or two-step, and every session ended, with the time, the account, the network address and the browser. Never a password, a code or a token.

## 8 Signed in: `/account`

| Section | Holds |
|---|---|
| **Email** | The address · Change: the new address, asking again, then "We sent a link to the new address. Your email changes when you open it." |
| **Password** | Change password: current password, new password with Show and the meter, Save. A Google-only person sees "Add a password" |
| **Two-step sign-in** | On or off; "Required for your role" when it is; Turn on, Turn off (not when required); Backup codes: how many are left, Make new codes |
| **Sign-in methods** | Google connected or not; Connect, Disconnect (only while another way in remains) |
| **Sessions** | Each device, Sign out, Sign out everywhere |
| **Delete account** | Asking again, then a typed confirmation |

AXLE puts the same items behind the staff menu's **Your account** and **Two-step sign-in** (axle SPEC §6).

## 9 Emails

Every email here is sent through AntaraX email (antarax-api docs/15), from `<Product> <product@mail.antarax.ai>`. Products on Supabase send Supabase Auth's own emails through its send-email hook.

| Email | Template |
|---|---|
| Sign-in link or code | `auth.sign_in.v1` |
| Confirm your email | `auth.verify_email.v1` |
| Reset your password | `auth.password_reset.v1` |
| Password changed (GI-15) | `auth.password_changed.v1` |
| Email changed, to the old address (GI-15) | `auth.email_changed.v1` |
| An account made for someone | `auth.invite.v1` |
| Join an organisation | `team.invitation.v1` |

These are **security** emails: a person can never turn them off (app SPEC §8).

## 10 Words

| Use | Never |
|---|---|
| Sign in · Sign out · Create an account | Log in, Login, Log out, Register, Sign up as a button |
| Forgot your password? | Forgot password, Trouble logging in? |
| Email me a sign-in link | Magic link (on screen) |
| Two-step sign-in | 2FA, MFA (on screen) |
| Backup codes | Recovery keys |
| That email and password don't match. | Invalid credentials · User not found · Wrong password |
| That code didn't match. Check your app and try again. | Invalid OTP |
| This link has expired or has already been used. | Token invalid |
| Choose a different password. | Password doesn't meet requirements |
| Show / Hide | 👁 alone, with no name |

Sentence case everywhere; errors say what failed and what to do (brand kit 03).

## 11 Accessibility

- Every field has a visible label; errors sit under their field, are linked with `aria-describedby`, and focus moves to the first one.
- Every control is 44px on touch screens.
- Nothing times out while someone is typing; a session about to end warns 2 minutes ahead with "Stay signed in".
- Codes are typed or pasted whole into one field, never one box per digit; phones offer the code from the message (`one-time-code`).
- No CAPTCHA that needs sight or hearing alone; Turnstile's invisible check is acceptable.

## 12 Switching it on, by auth provider

| Rule | Supabase Auth | Appwrite | Your own |
|---|---|---|---|
| 12 characters | Auth → Providers → Email: minimum password length 12 | Auth → Security: password length 12 | Check on the server |
| Breach check | Leaked password protection, **Pro plan only**; on Free, check Pwned Passwords on the server before `updateUser` / sign-up | Password dictionary is the 10,000 most common only, so also check Pwned Passwords in the function that sets passwords | Check Pwned Passwords on the server |
| Two-step | MFA with TOTP enabled; require AAL2 for Owner and Admin routes and in RLS where it matters | MFA with TOTP, recovery codes with `createMfaRecoveryCodes()` | TOTP (RFC 6238) |
| Sign-in link | Email OTP / magic link, expiry 900 seconds | Magic URL, expiry 15 minutes | Single-use hashed token |
| Attempts | Auth rate limits, plus the product's own counter for the pause message | Session and rate limits, plus the product's own counter | The product's own counter |
| Sessions | Time-boxed and inactivity timeouts in Auth settings (Pro), else the product's own | Session length and limit per project | The product's own |
| Emails | Send-email hook to AntaraX email (antarax-api docs/15 §15.5) | The product's function sends through AntaraX email | The product sends through AntaraX email |

Dashboard paths move; check the provider's current settings page before relying on these names.

## 13 How to prove it

`node tools/check-signin.mjs https://‹product›` opens the sign-in, reset and sign-up screens in a browser and checks what can be seen from outside: GI-01 (the reset link exists and leads to a form), GI-02 (a named Show button on every password field), GI-05 (the Caps Lock warning appears), GI-06 (`autocomplete` values, paste works, no confirm field), GI-07 (a made-up email gets the same reply as a real one when the product gives a test account), GI-11 (the sign-in link option) and the words in §10. What it cannot see (GI-03's breach check, GI-08, GI-09, GI-12 to GI-17) each product proves in its own tests, listed in its report.

## 14 Today

The check of 18 Oct 2026, read from each product's production branch. ✓ has it · ◐ partly · ✗ missing · – not applicable.

| Product · surface | Ways in today | Forgot GI-01 | Show GI-02 | Rules GI-03 | Meter GI-04 | Caps GI-05 | Managers GI-06 | No leak GI-07 | Attempts GI-08 | Two-step GI-09/10 | Link GI-11 | `/account` GI-14 | Sign out GI-19 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| AX Frame · app | Google | – | – | – | – | – | – | ✓ | ◐ | ✗ | ✗ | ✗ | ◐ |
| AX Frame · AXLE | Google | – | – | – | – | – | – | ✓ | ◐ | ✗ | ✓ none | ✗ | ◐ |
| YaraOne · team and clients | Code, link, Google | ◐ | ✓ | ◐ | ✗ | ✗ | ✓ | ✗ | ◐ | ✗ | ✓ | ◐ | ◐ |
| YaraOne · AXLE | Same form | ◐ | ✓ | ◐ | ✗ | ✗ | ✓ | ✗ | ◐ | ✗ | ✗ offered | ◐ | ◐ |
| Yara · management | Password | ✗ | ◐ | ◐ | ✗ | ✗ | ✓ | ✓ | ◐ | ✗ | ✗ | ◐ | ✗ |
| Yara · workers | Username, password | ◐ | ◐ | ◐ | ✗ | ✗ | ◐ | ✗ | ◐ | – | – | ◐ | ✗ |
| Yara · AXLE | Password | ✗ | ◐ | ◐ | ✗ | ✗ | ✓ | ✓ | ◐ | ✗ | ✓ none | ◐ | ✗ |
| Janka · app | Password | ◐ | ✗ | ◐ | ✗ | ✗ | ✓ | ◐ | ◐ | ✗ | ✗ | ◐ | ◐ |
| Janka · AXLE | Password | ✗ | ✗ | ◐ | ✗ | ✗ | ✓ | ✓ | ◐ | ✗ | ✓ none | ✗ | ◐ |
| Angka · app | Password | ✓ | ✗ | ◐ | ✗ | ✗ | ✓ | ◐ | ◐ | ✗ | ✗ | ◐ | ✗ |
| Angka · AXLE | Password, then a code | ◐ | ✗ | ◐ | ✗ | ✗ | ✓ | ✓ | ◐ | ◐ | ✓ none | ✗ | ✗ |
| PLExyz Grid · app | Password | ✗ | ✗ | ◐ | ✗ | ✗ | ◐ | ◐ | ◐ | ✗ | ✗ | ✗ | ✗ |
| PLExyz Grid · AXLE | Password | ✗ | ✗ | ✗ | ✗ | ✗ | ◐ | ✓ | ◐ | ✗ | ✓ none | ✗ | ✗ |
| PLExyz Crowd · one sign-in for both | Password | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ | ◐ | ✗ | ✗ | ✗ | ✗ | ◐ |
| Tinara · app and `/admin` | Password, link | ✓ | ✗ | ✗ | ✗ | ✗ | ✓ | ✗ | ◐ | ✗ | ✓ | ◐ | ✗ |
| Lapisan Console | Link only | – | – | – | – | – | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ | ◐ |

What the table cannot show:

- **No product has two-step sign-in** for its customers, and only Angka's AXLE has it for staff (optional, with no backup codes).
- **No product checks passwords against breaches**, shows a strength meter or warns about Caps Lock. Minimums range from 6 (Supabase's default, where nothing overrides it) to 12; Tinara still requires capitals and digits, which this standard drops.
- **Forgot your password** is missing for Yara's managers, for every AXLE except Angka's, and in PLExyz Grid and PLExyz Crowd, where a reset means REKA hands over a password.
- **Sign out signs out everywhere without saying so** in Yara, Angka, PLExyz Grid and Tinara (Supabase's default scope).
- **Two security problems, reported to the owner on 18 Oct 2026, each to be fixed in its own pull request before anything else:** YaraOne's sign-in codes can overwrite the password of an account in another workspace (REKA staff included); PLExyz Crowd lets any signed-in account into the staff console and lists every organisation's users.

## 15 What each product changes

Each product makes these changes in its own pull request, after this standard is merged. The two security problems come first.

| Product | Changes |
|---|---|
| **AX Frame** | Add email and password and Email me a sign-in link beside Google, with Forgot your password, Show, the meter, Caps Lock and the breach check. Two-step for Owners and Admins; staff two-step checked on the server (AAL2 or Google 2-Step Verification). Asking again before deleting an account; `/account` with sessions and Sign out everywhere; *Session ended*. Guest sign-in links stop creating accounts for any email |
| **YaraOne** | **First: sign-in codes must never overwrite another workspace's account** (its own pull request). The link and Google replies stop revealing whether an account exists. AXLE gets its own sign-in page (axle SPEC §5.1.1) with no sign-in link and two-step for staff; a real Forgot your password for the team; codes expire; the meter, Caps Lock and the breach check; asking again before a password change; change email |
| **Yara** | Forgot your password by email for managers and AXLE; Show back in the tab order; 12 characters, the meter, Caps Lock, the breach check; two-step for Owners, Admins and staff; the sign-in link and Google; Sign out on this device only; *Session ended* and `?next` honoured; a password change ends other sessions; rate limits held outside a single server instance. Workers keep asking their supervisor (§2) |
| **Janka** | Show, the meter, Caps Lock and the breach check (Appwrite's dictionary is not enough); reset replies that never reveal an account; Forgot your password in AXLE; two-step for Owners, Admins and staff; the sign-in link and Google; set-password links instead of admin-typed passwords; an AXLE password reset ends sessions; Sign out everywhere; *Session ended* |
| **Angka** | Show, the meter, Caps Lock and the breach check; 12 characters; two-step for customers' Owners and Admins, and backup codes plus a requirement for staff; Google and the sign-in link; sign-up and reset messages that never reveal an account; Sign out on this device; a password change ends other sessions; change email; asking again before deleting; invitations that expire; an AXLE reset link that opens on the AXLE host; AXLE's wrong door signs the person out and says so. Angka's email stays deferred (decision of 17 Oct 2026) |
| **PLExyz Grid** | Forgot your password and change password (its roadmap R-03); Show, 12 characters, the meter, Caps Lock, the breach check; two-step for Owners, Admins and staff; Google and the sign-in link; sign-up that confirms the email, is rate limited and never reveals an account; set-password links instead of typed passwords; Sign out on this device; *Session ended* |
| **PLExyz Crowd** | **First: staff-only console and an organisation-scoped user list** (its own pull request). Then sessions that can be ended, a rate limit, Forgot your password, change password, Show, `autocomplete`, the meter, Caps Lock, two-step, the sign-in link and Google |
| **Tinara** | Drop the capital-and-digit rule and the 12-character minimum on the sign-in field (it locks out older passwords); Show, the meter, Caps Lock, the breach check; a two-step screen (TOTP is switched on but has none) for Owners, Admins and staff; Google; sign-in link replies that never reveal an account; Sign out on this device; *Session ended*; a message for a non-admin who opens `/admin` |
| **Lapisan Console** | Two-step for team Owners (they hold live keys); a session that ends after inactivity, and says so; change email and delete account. Its link-only sign-in is the product's own until one AntaraX account exists (antarax-api roadmap item 20) |
| **ISO Generator** | On hold: not checked, not changed |
