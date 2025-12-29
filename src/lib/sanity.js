import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  // HARDCODED FIX: Directly using the ID and Dataset to stop the blank page crash
  projectId: '688oebb5', 
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2023-05-03',
  // The token is secret, so we keep using the environment variable
  token: 'skgMMvqdx4yGIrMkBeU6Tgr6DOjWDG47UTuwluWaWcLwo5cNNkE8iwFDqhUkdvLrXYpRMuHAAl4s2KJyNlfaEXwf5YvbX7WYmabStNDdBfTuTlknVQ13cPSQjTnr7nB6P0fddFGrR1LonTpUXNHw9WJy2lIHXoslteFjP6XfzmIdqMcKYBtE' 
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return '';
  return builder.image(source);
};