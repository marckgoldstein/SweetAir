# SweetAir starter

A mobile-first, browser-only prototype scaffold for the SweetAir busking app. It turns the PRD's initial journeys into navigable screens while keeping the demo data and service boundaries easy to replace.

## Run locally

Serve this folder over HTTP (ES modules and local storage do not work reliably from a `file://` URL), then open the local address in a mobile-sized browser. No build step or package install is required. VS Code's Live Server extension is one option.

Leaflet and OpenStreetMap tiles are loaded from their public endpoints. If the Leaflet script or map tiles are unavailable, the discovery view retains its illustrated fallback and the location cards remain usable.

## Project structure

```text
index.html
styles/
  tokens.css
  app.css
src/
  main.js
  components.js
  data.js
  pages/
    account.js
    admin.js
    auth.js
    discover.js
    municipality.js
    performer.js
    tip.js
    venue.js
    welcome.js
  services/
    auth.js
    bookings.js
    map.js
    object-storage.js
docs/
  asset-inventory.md
```

## Screens and roles

- **Welcome / role selection:** audience, performer, venue manager, municipality, and platform-admin entry points.
- **Audience:** map and list discovery, filters, followed artists/places, artist profile, and tip preview.
- **Performer:** demo balance, profile summary, booking list, place discovery, and a clearly marked simulated check-in.
- **Venue manager:** venue summary, approve/decline booking requests, and create performance slots.
- **Municipality:** public-place list and a local-only place-creation form.
- **Platform admin:** staging record overview and a CSV-import placeholder.
- **Account:** role, demo sign-in/out, and profile-image preview.

Role selection is available from the header. Demo bookings and the selected role use browser local storage; follow state and newly added city places are held in memory.

## Integration seams

- `src/services/auth.js` exposes `getSession`, `signIn`, `signUp`, and `signOut`. Its current adapter is intentionally a local demo identity, not authentication or authorization.
- `src/services/object-storage.js` exposes `upload`, `getPublicUrl`, and `remove`. The demo stores object URLs in memory; replace it with a private object-store adapter and signed upload/download URLs.
- `src/services/bookings.js` is the demo persistence boundary for slots and requests. Replace it with authenticated API calls and server-side authorization.
- `src/services/map.js` uses Leaflet with OpenStreetMap tiles and attribution. Location data is seeded; no device location is requested.
- Tips and balances are illustrative only. There is no payment processor, stored payment method, or money movement.

The browser-only prototype must not be used for real accounts, payouts, permits, booking enforcement, or sensitive uploads. Add a server API, validation, authorization, audit records, and provider credentials before connecting production services.

## Deliberately deferred from the initial demo

Following the PRD's out-of-scope and phased-release notes, this scaffold does not implement third-party OAuth or 2FA, real payment processing, identity/tax verification, municipal permits, grant accounting, payment disputes/refunds, geofenced or anti-spoof check-in, GPS validation, automatic payout splitting, or production notifications. The visible demo actions label their simulated behavior rather than representing those capabilities as complete.

See [the asset inventory](./docs/asset-inventory.md) for the initial palette, icon set, and production asset checklist.
