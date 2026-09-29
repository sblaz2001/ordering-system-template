# 005 — Shared easing token; toggle knob off layout property

- **Status**: TODO
- **Commit**: 9c8be55
- **Severity**: LOW
- **Category**: Cohesion / performance
- **Estimated scope**: CSS only, both files

## Problem
No shared easing token; toggle knob animates `left` (layout) with bare `ease`.
```css
/* index.html:375 — current */
.toggle .knob{ position:absolute; top:2px; left:2px; ...; transition: left 0.15s ease; }
.toggle.on .knob{ left: 20px; }
```

## Target
```css
:root{ --ease-out: cubic-bezier(0.23, 1, 0.32, 1); }
.toggle .knob{ ...; transition: transform 150ms var(--ease-out); }
.toggle.on .knob{ transform: translateX(18px); }
```
(Note: the staff UI re-renders via innerHTML, so this transition will not visibly play until the DOM persists; the change removes the layout-property anti-pattern only.)

## Steps
1. Add `--ease-out` to `:root`. 2. Edit the two knob rules in both files (remove `left: 20px` on `.on`).

## Verification
- Toggle an item in Staff → Menu: knob position is unchanged from before (right when on).
