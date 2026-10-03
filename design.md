# Design

Living spec for the wedding site. Add a section here before building each piece, and update it when the piece changes.

`references/Wedding_Card.png` is a visual reference for the invitation, not the finished spec. The real site should feel like that card: one long illustrated page, readable on a phone and on a desktop. Copy, dates, and artwork are confirmed only when each element is supplied. Do not invent pieces that are not in this file.

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

## Layout

The reference is one scrolling page. From top to bottom it shows a navigation strip, names and a portrait, a “from east to west” band, a patterned band with an envelope and wax seal, then the event details, schedule, a closing line, and an RSVP block. Build each band only after its artwork and text are provided.

The page must work on a phone and on a desktop. On a phone the bands stack and stay large enough to tap. On a desktop the same story stays centered, with the illustrated width used rather than stretching one image across the screen.

## Letter

The envelope starts closed. Tapping the wax seal opens the flap, a page rises out of the envelope, and that page then zooms to fill the screen with the events, schedule, and RSVP. Back, or Escape, reverses it and returns to the closed envelope.

Other elements will get small animations later. Each one is written here before it is built.

## Artwork to supply

Send each piece separately, already cut out, not as one flattened export of the whole card.

| Piece | Format |
|---|---|
| Icons, ornaments, borders, monogram, seal drawn as shapes | SVG |
| Paper, lace, stamp, cut-out photos, anything that needs a transparent background | PNG |
| Photographs and full backgrounds with no transparency | JPEG |

JPEG and JPG are the same format. For PNG and JPEG, export at twice the size it will be shown, so it stays sharp on a phone. For the letter, send the closed envelope, the flap, the seal, and the inside page as separate files. A single picture of the closed envelope cannot open.

## Elements

The pieces used on the page are copied into `public/art`, one file per picture. The originals stay in `references/elements`.

| Element | What it is | Status |
|---|---|---|
| Whole card | Reference only, in `references/Wedding_Card.png` | Reference |
| Invitation page | Assembled from the supplied pictures. The letter is the first animation. | In progress |
| Letter | Seal opens the page and zooms in. Back closes it and returns to the envelope. | Built |

### Still needed

- The script lettering for the names, “are getting married”, and the section titles. The page sets those words in a font for now.
- The wax seal with the letters D and A. The page uses the blank round seal and sets the letters on top.
- The Kolkata skyline strip that sits under “From east to west”.
- A separate envelope flap. The open motion uses the closed envelope, the red lining, and a page zoom.
- The line drawing of a telescope, and the swing picture from the film strip.
- The small airmail envelope in the events band.
- Real sentences for the four “add additional details” notes, the ceremony / reception / attire notes, the schedule place names, and the gift note. The reference still has sample lines in those spots.

## Open questions

- Subdomain is `wedding.biradarakshay.com`. It is set in `public/CNAME`, in `site` in `astro.config.mjs`, and in the repo’s Pages custom-domain field.
- Final copy and dates. The reference image is not the locked text.
