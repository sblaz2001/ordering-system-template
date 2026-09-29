# 001 — Play the status-banner entrance once, not on every poll

- **Status**: TODO
- **Commit**: 9c8be55
- **Severity**: HIGH
- **Category**: Interruptibility / purpose
- **Estimated scope**: index.html (CSS + renderTicket), staff.html CSS only

## Problem
`render()` rebuilds `#app.innerHTML` and `pollCurrentOrder()` calls it every 3s (`POLL_MS`), so a CSS `animation` on `.stamp-banner` restarts from zero every 3 seconds while the banner is visible.
```css
/* index.html:226, staff.html:204 — current */
animation: stampIn 0.4s ease-out;
/* index.html:410 (override) */
@keyframes stampIn{ 0%{ opacity:0; transform: translateY(6px);} 100%{ opacity:1; transform:none; } }
```
400ms exceeds the 300ms UI budget and ease-out is the built-in weak curve.

## Target
```css
.stamp-banner.enter{ animation: stampIn 220ms var(--ease-out) both; }
@keyframes stampIn{ from{ opacity:0; transform: translateY(6px);} to{ opacity:1; transform:none; } }
```
The `enter` class is added only the first render after the status changes (JS below). Staff page has no banner markup, so only delete/replace its unused CSS rule.

## Repo conventions to follow
Tokens live in `:root` at the top of each file's `<style>`. Add `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);` there (plan 005).

## Steps
1. index.html `renderTicket()`: before building `banner`, add
   `const animateBanner = state.bannerKey !== o.id + ":" + o.status; state.bannerKey = o.id + ":" + o.status;`
2. In the three banner strings change `class="stamp-banner brass"` / `"stamp-banner red"` to `class="stamp-banner brass${animateBanner?' enter':''}"` (and red).
3. Replace the CSS rule/keyframes as in Target (both the `animation:` line in `.stamp-banner{}` and the keyframes override).
4. staff.html: same CSS replacement (harmless, keeps files in sync).

## Boundaries
- Do NOT change polling or render() structure. Do NOT add dependencies.
- If line numbers differ from the commit, STOP and report.

## Verification
- **Feel check**: place an order, mark it ready from staff. Banner fades/slides in once (220ms). Wait 10s: it must not replay.
- DevTools Animations panel at 10%: only opacity + translateY move.
- **Done when**: no banner animation is triggered by the 3s poll.
