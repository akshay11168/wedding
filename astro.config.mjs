import { defineConfig } from 'astro/config';

// Custom domain is the site root, so pages are /invitation and /photos,
// not /wedding/invitation. Replace the hostname when the subdomain is chosen.
export default defineConfig({
  site: 'https://wedding.biradarakshay.com',
  base: '/',
});
