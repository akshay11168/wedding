import { defineConfig } from 'astro/config';

// The custom domain is the site root. The invitation is /, and photos are /photos.
// Replace the hostname when the subdomain is chosen.
export default defineConfig({
  site: 'https://wedding.biradarakshay.com',
  base: '/',
});
