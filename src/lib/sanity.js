import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  // HARDCODED FIX: Directly using the ID and Dataset to stop the blank page crash
  projectId: '688oebb5', 
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2023-05-03',
  // The token is secret, so we keep using the environment variable
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN, 
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return '';
  return builder.image(source);
};