# 003 — Press feedback on every tappable control

- **Status**: TODO
- **Commit**: 9c8be55
- **Severity**: HIGH (also a mobile-native "laggy tap" fix)
- **Category**: Physicality
- **Estimated scope**: CSS only, both files

## Problem
Only `.table-btn:active` reacts to a press. Send order, qty +/−, tabs, staff action buttons give no feedback until `click` completes, which reads as lag on a phone.

## Target
```css
.btn-primary,.btn-secondary,.btn-ticket-secondary,.cart-bar button,.qty-control button,
.table-btn,.cat-tab,.staff-tab,.card-actions button,.switcher-pill,.add-item-btn,
.add-cat-btn,.btn-save-edit,.btn-cancel-edit,.msg-input-row button{
  transition: transform 120ms var(--ease-out);
}
.btn-primary:not(:disabled):active,.btn-secondary:active,.btn-ticket-secondary:active,
.cart-bar button:not(:disabled):active,.qty-control button:active,.table-btn:active,
.cat-tab:active,.staff-tab:active,.card-actions button:active,.switcher-pill:active,
.add-item-btn:active,.add-cat-btn:active,.btn-save-edit:active,.btn-cancel-edit:active,
.msg-input-row button:active{ transform: scale(0.97); }
```
Transform only (no layout); 120ms is inside the 100–160ms press budget.

## Steps
1. Append the block to the "Template overrides" CSS at the end of `<style>` in index.html and staff.html.

## Boundaries
- Do NOT add JS. Do NOT touch text-link buttons (`.new-order-link`, `.logout-link`, `.item-delete`).

## Verification
- On a phone, press and hold "Send order": it dips to 97% immediately, releases smoothly.
- **Done when**: each listed control visibly responds on pointer-down.
