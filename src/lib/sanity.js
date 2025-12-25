import { createClient } from '@sanity/client';
// Fix: Switch to named export to resolve deprecation warning
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // Ensure this matches Vercel/env
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03', // Use current stable API version
});

// Fix: Use the new createImageUrlBuilder instead of the default builder
const builder = createImageUrlBuilder(client);

/**
 * Helper function to generate optimized Sanity image URLs
 * @param {object} source - The image asset from Sanity
 */
export const urlFor = (source) => {
  if (!source) return '';
  return builder.image(source);
};