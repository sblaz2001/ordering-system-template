# 004 — Respect prefers-reduced-motion

- **Status**: TODO
- **Commit**: 9c8be55
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: CSS only, both files

## Problem
No `prefers-reduced-motion` handling anywhere (grep returns nothing).

## Target
Keep opacity feedback, drop movement:
```css
@media (prefers-reduced-motion: reduce){
  @keyframes stampIn{ from{ opacity:0; } to{ opacity:1; } }
  @keyframes toastIn{ from{ opacity:0; } to{ opacity:1; } }
  .btn-primary:active,.btn-secondary:active,.btn-ticket-secondary:active,.cart-bar button:active,
  .qty-control button:active,.table-btn:active,.cat-tab:active,.staff-tab:active,
  .card-actions button:active,.switcher-pill:active,.add-item-btn:active,.add-cat-btn:active,
  .btn-save-edit:active,.btn-cancel-edit:active,.msg-input-row button:active{ transform:none; }
  .toggle .knob{ transition:none; }
}
```
Toast keeps its centring: `toastIn` reduced-motion keyframes must not override `translateX(-50%)` — the toast's base rule already has `transform: translateX(-50%)`, so opacity-only keyframes are safe.

## Steps
1. Append after the plan 003 block in both files (must come after so it wins on source order).

## Verification
- DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`: banner/toast fade only; buttons don't shrink.
