# Vantara motion system

The existing Lenis provider handles smooth scrolling. CSS handles the entrance sequence and navigation affordances. Framer Motion maps scroll position to hero photo movement, recruitment progress and image opacity. The route wrapper remains in normal document flow so sticky positioning has a stable containing block.

| Interaction | Motion and trigger | Accessible alternative |
| --- | --- | --- |
| Home cover | One entrance with two clipped title lines, an image wipe, and a short CTA reveal. The photo moves up to 45px while the first section scrolls away. | CSS respects the system setting. Mobile disables photo translation. The headline remains a single h1. |
| Industry index | The active rail moves to the selected tab. Photo opacity and scale transition in 380ms. A short text transition follows the selection. | Roving focus with arrow keys, Home and End. Tap and click select the same content. Reduced motion switches immediately. |
| Region and department selectors | Short photograph crossfades respond to region or disclosure changes. | Semantic buttons or details elements. Content and next action update with selection. |
| Recruitment story | A 270svh section bounds the sticky scene. Framer tracks progress from section start to end, maps it into five equal ranges and springs only the visible progress line. The milestone buttons seek within those same ranges. Photos crossfade while caption text updates once per milestone. | Reverse scroll uses the same mapping. Widths up to 800px, short desktop viewports and reduced motion show all five stages in a normal ordered timeline. |
| CV wizard | Short step change, then focus moves to the step heading or first invalid field. | Reduced motion skips transition movement. Entered data is retained when navigating steps. |
| Drawer and actions | Native dialog with a restrained slide and focus return. Active links have a small rule. Buttons move their arrow on hover. | Escape and keyboard focus work through native dialog behavior. Reduced motion suppresses CSS animation and transitions. |

The story does not take over wheel or touch input. Images are lazy loaded near the scene. The normal scroll position determines the active milestone in either direction. The same text and stages remain available in static mode.
