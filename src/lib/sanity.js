import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  // Use the variables from your .env file
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, 
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  
  // Set to false so new reviews appear instantly without waiting for the cache
  useCdn: false, 
  
  // This token allows the Feedback Form to submit new reviews
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN,
  
  // This is required when using tokens in a browser-based app like React
  ignoreBrowserTokenWarning: true, 
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return '';
  return builder.image(source);
};