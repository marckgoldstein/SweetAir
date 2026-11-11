# SweetAir asset inventory

## Color tokens

| Purpose | Token | Value |
|---|---|---|
| Main — warm peach | `--main-peach` | `#FFC09F` |
| Main — sunshine yellow | `--main-yellow` | `#FFEE93` |
| Secondary — cream | `--secondary-cream` | `#FCF5C7` |
| CTA / accent — sky blue | `--accent-blue` | `#A0CED9` |
| CTA / accent — fresh green | `--accent-green` | `#ADF7B6` |
| Primary text | `--ink` | `#28323B` |
| Secondary text | `--ink-soft` | `#555F67` |
| Surfaces and borders | `--surface`, `--line` | `#FFFEFA`, `#E8E4D8` |

Use the supplied five colors as the recognizable brand palette. Dark text and neutral borders are supporting contrast colors, not additional brand accents. Keep text readable on pastel surfaces; do not use pastel foreground text for essential information.

## Iconography in the prototype

Icons are small inline SVGs in `src/components.js` so the shell has no icon-font dependency. The initial library covers:

- music / live performance and discovery
- map, location pin, and venue
- home, calendar, and clock
- profile, follow / heart, and notification
- wallet, share, add, check, back, close, and settings

Emoji in seeded data are temporary performer/venue thumbnails, not a production icon system. Replace them with original illustrations or licensed imagery; keep icon strokes simple, friendly, and consistent.

## Production asset checklist

- SweetAir wordmark and app icon: colorful music-note mark on the yellow/peach brand field, with light and dark-background variants.
- Performer and band profile photos; venue and public-place cover images; optional municipal partner marks.
- A consistent, original illustration set for empty schedules, no nearby performances, successful booking, and loading/error states.
- Map marker variants for public place, private venue, live performer, and upcoming performer; provide shape/icon differences in addition to color.
- Accessible status icons for pending, approved, declined, permit-required, and live states.
- Social/music destination marks only where permitted by each service's brand-use policy.
- App-store badges only on the QR-tip confirmation / post-payment flow if that flow is introduced in a later release.

## Motion and mobile behavior

The starter uses short card/page transitions and small hover/press feedback. Keep motion brief and non-blocking, respect `prefers-reduced-motion`, and preserve touch targets around 44px or larger. The bottom navigation accounts for mobile safe areas.

## Mapping attribution

Discovery uses Leaflet and OpenStreetMap standard tiles. Keep the visible OpenStreetMap attribution and follow the tile service's usage policy in any deployed product. Do not send a user's precise location to the map provider unless a later, consented location feature explicitly requires it.
