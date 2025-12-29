import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// This version checks both possible Vite environments
const token = import.meta.env.VITE_SANITY_WRITE_TOKEN || process.env.VITE_SANITY_WRITE_TOKEN;

export const client = createClient({
  projectId: '688oebb5', 
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2023-05-03',
  token: token, 
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source) => (source ? builder.image(source) : '');