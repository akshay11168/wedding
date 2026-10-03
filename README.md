# Wedding

A static site for an invitation now, and a photo gallery later. Both sections stay in the menu. Which one opens first, and whether photos are still “coming soon,” is set in `src/config.ts`.

The design itself is tracked in `design.md`. Layout, type, and artwork are added only after they are written down there.

## Preview locally

```powershell
npm install
npm run dev
```

Open the URL Astro prints. `/` is the invitation. `/photos` says coming soon.

## Publish on GitHub Pages

Pushes to `main` build the site and deploy the `dist` folder. In the GitHub repo, set Settings → Pages → Source to **GitHub Actions** once, or the workflow has nowhere to publish.

## Custom subdomain

The site is meant to be served at your own subdomain. The invitation is the root (`/`), and photos are `/photos`. These have to match:

1. Set `site` in `astro.config.mjs` to the real hostname. `public/CNAME` should contain that same hostname.
2. In the GitHub repo, set Settings → Pages → Source to **GitHub Actions**.
3. In that same Pages screen, enter the hostname under **Custom domain** and save it. With a GitHub Actions deploy, GitHub ignores the `CNAME` file for this setting, so the field has to be saved here or the subdomain returns “There isn’t a GitHub Pages site here.”
4. At your DNS host, add a CNAME record from that subdomain to `akshay11168.github.io`.

GitHub then issues HTTPS for the subdomain. Until the custom domain is saved, `https://akshay11168.github.io/wedding/` serves the HTML only: styles and images are built for the domain root and do not load from the `/wedding/` path.

## Switch the gallery on

In `src/config.ts`:

- Set `photos` to `"open"` when the pictures should replace “Coming soon.”
- Set `defaultView` to `"photos"` when the gallery should be what people see first.

Commit and push. The invitation stays at `/` until the gallery is set as the first page.
