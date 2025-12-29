import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// This helps us see in the browser console if Vercel is actually sending the key
console.log("Checking Token:", import.meta.env.VITE_SANITY_WRITE_TOKEN ? "Token Found ✅" : "Token Missing ❌");

export const client = createClient({
  projectId: '688oebb5', 
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2023-05-03',
  // We use the variable again so we can stop hardcoding
  token: import.meta.env.VITE_SANITY_WRITE_TOKEN, 
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source) => (source ? builder.image(source) : '');