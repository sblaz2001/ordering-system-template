# 002 — Toast must not restart on every render

- **Status**: TODO
- **Commit**: 9c8be55
- **Severity**: HIGH
- **Category**: Interruptibility
- **Estimated scope**: index.html + staff.html, ~10 lines each

## Problem
`renderToast()` removes and recreates `#appToast` on every `render()`; the poll renders every 3s, so the `toastIn` keyframes replay mid-life and the toast flickers. Also 250ms ease-out with a 10px offset and no safe-area offset.
```js
/* index.html:1568, staff.html:2381 — current */
const old = document.getElementById("appToast");
if(old) old.remove();
if(!state.toast) return;
```
```css
/* index.html:394-399 — current */
position: fixed; top: 16px; ... animation: toastIn 0.25s ease-out;
@keyframes toastIn{ from{ opacity:0; transform: translate(-50%,-10px);} to{ opacity:1; transform: translate(-50%,0);} }
```

## Target
```js
const old = document.getElementById("appToast");
if(old && state.toast && old.textContent === state.toast) return; // keep the live one, don't restart it
if(old) old.remove();
if(!state.toast) return;
```
```css
.toast{ top: calc(16px + env(safe-area-inset-top)); animation: toastIn 200ms var(--ease-out) both; }
@keyframes toastIn{ from{ opacity:0; transform: translate(-50%,-8px);} to{ opacity:1; transform: translate(-50%,0);} }
```

## Steps
1. Edit `renderToast()` in both files as in Target.
2. Edit the `.toast` rule and `@keyframes toastIn` in both files.

## Boundaries
- Do NOT add an exit animation (element is removed synchronously; out of scope). No new dependencies.

## Verification
- Trigger a toast (e.g. staff: change a table to fail, or customer: send with an empty cart is blocked; use "Couldn't update…" path) and stay on the page for the 2.2s: it slides in once and does not blink at the 3s poll.
- Reduced motion (plan 004): appears with opacity only.
- **Done when**: same toast text never re-runs the animation.
