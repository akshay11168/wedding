export type DefaultView = 'invitation' | 'photos';
export type PhotosMode = 'coming-soon' | 'open';

// The invitation is the subdomain root (/). There is no /invitation page.
// Change defaultView to "photos" when opening the site should land on the gallery.
// Change photos to "open" when the pictures should replace the coming-soon message.
export const site = {
  defaultView: 'invitation' as DefaultView,
  photos: 'coming-soon' as PhotosMode,
};
