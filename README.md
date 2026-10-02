# Wedding

A static site for an invitation now, and a photo gallery later. Both sections stay in the menu. Which one opens first, and whether photos are still “coming soon,” is set in `src/config.ts`.

The design itself is tracked in `design.md`. Layout, type, and artwork are added only after they are written down there.

## Preview locally

```powershell
npm install
npm run dev
```

Open the URL Astro prints. `/` goes to the invitation. `/photos` says coming soon.

## Publish on GitHub Pages

Pushes to `main` build the site and deploy the `dist` folder. In the GitHub repo, set Settings → Pages → Source to **GitHub Actions** once, or the workflow has nowhere to publish.

## Custom subdomain

The site is meant to be served at your own subdomain, at the root (`/invitation`, not `/wedding/invitation`). Three things have to match:

1. Replace `wedding.example.com` in `public/CNAME` with the real hostname, and set the same hostname as `site` in `astro.config.mjs`.
2. In the GitHub repo, set Pages to GitHub Actions.
3. At your DNS host, add a CNAME record from that subdomain to `akshay11168.github.io`.

GitHub then issues HTTPS for the subdomain. Until those three exist, the site is only the local preview.

## Switch the gallery on

In `src/config.ts`:

- Set `photos` to `"open"` when the pictures should replace “Coming soon.”
- Set `defaultView` to `"photos"` when the gallery should be what people see first.

Commit and push. Invitation remains at `/invitation`.
