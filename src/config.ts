export type DefaultView = 'invitation' | 'photos';
export type PhotosMode = 'coming-soon' | 'open';

// Change defaultView to "photos" when the gallery should be what people see first.
// Change photos to "open" when the pictures should replace the coming-soon message.
export const site = {
  defaultView: 'invitation' as DefaultView,
  photos: 'coming-soon' as PhotosMode,
};
