import { defineConfig } from 'astro/config';

// The custom domain is the site root. The invitation is /, and photos are /photos.
export default defineConfig({
  site: 'https://wedding.biradarakshay.com',
  base: '/',
});
