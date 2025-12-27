import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  // CHANGE 1: Must be false to allow "Write" operations (submitting feedback)
  useCdn: false, 
  apiVersion: '2023-05-03',
  // CHANGE 2: You must include the token here for permissions to work
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN, 
});

// Image helper remains the same
const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return '';
  return builder.image(source);
};