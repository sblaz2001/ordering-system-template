# Bar Ordering Template

A table-ordering web app for bars and pubs. Customers pick their table, order
from your menu on their phone, and track the order live. Staff get a PIN-protected
board with new orders, availability, tables, promotions, history and notes.

No build step: plain HTML + a `config.js` file + a free Firebase Realtime Database.

| File | What it is |
|---|---|
| `index.html` | Customer page (share this link / QR code on tables) |
| `staff.html` | Staff page (PIN protected; linked from the small lock icon on the customer page) |
| `config.js` | **Everything venue-specific — the only file you edit** |
| `firebase-rules.json` | Database security rules to paste into Firebase |

## Set up a new venue (about 15 minutes)

### 1. Create the Firebase project
1. Go to <https://console.firebase.google.com> → **Add project**.
2. **Build → Authentication → Get started → Sign-in method → Anonymous → Enable.**
   (Customers and staff sign in anonymously; the rules require a signed-in user.)
3. **Build → Realtime Database → Create database** (pick the region nearest the venue, start in *locked mode*).
4. In the database's **Rules** tab, paste the contents of `firebase-rules.json` and **Publish**.
5. **Project settings (cog) → Your apps → Web (`</>`)** → register an app and copy the `firebaseConfig` values.

### 2. Edit `config.js`
- `name`, `tagline`, `currency`, optional `logoUrl`
- `theme.accent` — your brand colour
- `labels` — the wording for the "ready" / "on its way" steps
- `defaultStaffPin` — **change this**
- `firebase` — paste the values from step 1.5
- `tables` and `menu` — your starting tables and drinks

### 3. Deploy
Upload the folder to any static host. Netlify: drag-and-drop the folder onto
<https://app.netlify.com/drop>. Cloudflare Pages, Vercel, GitHub Pages also work.

### 4. First run
1. Open `index.html` once — this seeds your menu and tables into Firebase.
2. Open `staff.html` and log in with the PIN. Everything after that (menu, prices,
   tables, promotions) is edited from the staff page.

Print QR codes linking to the customer page for each table.

## Day to day
- **Change the PIN:** Firebase console → Realtime Database → `config` → `staffPin`.
- **Reset the menu/tables to `config.js`:** delete the `menu` / `tables` node in Firebase.
- **Sell out an item:** staff page → *Menu* → toggle it off.
- **Order flow:** New → *Ready to collect* or *Bringing to table* → *Mark completed*.
  Orders idle for an hour are auto-closed; completed orders are archived after 3 hours.

## Selling this to another venue
Each venue needs its **own Firebase project** and its own copy of the folder with
its own `config.js`, so their data is fully separate. Nothing else in the code changes.

## Security notes (be honest with customers)
- Staff access is a shared **PIN**, not individual accounts. The database rules stop
  anonymous scraping and malformed writes, but anyone who has the PIN is staff.
- The staff PIN is readable by any signed-in (anonymous) user per the current rules,
  so a technically minded customer could look it up. Fine for a low-stakes ordering
  board; if a client needs stronger control, add real staff logins (Firebase
  email/password auth with a custom `staff` claim) — a separate piece of work.
- Firebase web API keys in `config.js` are designed to be public; security comes from the rules.
- No payments are taken — this is an ordering/queue tool. Payment happens at the bar.
