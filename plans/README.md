# Animation & mobile plans

| # | Title | Severity | Status |
|---|---|---|---|
| 001 | Play status banner once, not every poll | HIGH | DONE |
| 002 | Stable toast | HIGH | DONE |
| 003 | Press feedback on controls | HIGH | DONE |
| 004 | prefers-reduced-motion | MEDIUM | DONE |
| 005 | Easing token + knob transform | LOW | DONE |

Order: 005 (token) → 001 → 002 → 003 → 004 (reduced-motion must come last in the CSS).
Mobile fixes (viewport, dvh, tap highlight, safe areas, overscroll, theme-color) were applied directly; see the commit message.
