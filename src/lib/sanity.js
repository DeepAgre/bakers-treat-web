import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: '688oebb5', 
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2023-05-03',
  // Vite will grab this from Vercel after the clean redeploy
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN, 
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source) => (source ? builder.image(source) : '');