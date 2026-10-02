# Design

Living spec for the wedding site. Add a section here before building each piece, and update it when the piece changes.

The visual design is not started. Do not invent type, artwork, names, dates, or layout. Those arrive when they are specified below.

## Behavior

Both Invitation and Photos stay in the menu at all times.

| Setting | Now | Later |
|---|---|---|
| `defaultView` in `src/config.ts` | `invitation` | `photos`, when the gallery should be the first page |
| `photos` in `src/config.ts` | `coming-soon` | `open`, when pictures should be shown |

- `/` is the invitation. There is no `/invitation` page.
- `/photos` shows “Coming soon” while `photos` is `coming-soon`. When it is `open`, it shows the gallery.
- Setting `defaultView` to `photos` makes `/` open `/photos`. The invitation then needs its own address, which is added when that switch is made.
- Changing either value is a commit. GitHub Actions publishes it. There is no server-side switch.

## Elements

Nothing has been specified yet.

| Element | What it is | Status |
|---|---|---|
| | | |

## Open questions

- Subdomain hostname. `public/CNAME` and `site` in `astro.config.mjs` still say `wedding.example.com`.
