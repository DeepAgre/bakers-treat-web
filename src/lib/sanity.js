import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: '688oebb5', // Your Project ID from screenshots
  dataset: 'production',
  useCdn: false, // Set to false temporarily to ensure you see changes instantly
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return '';
  return builder.image(source);
};