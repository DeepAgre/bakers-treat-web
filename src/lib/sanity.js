import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: '688oebb5', 
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2023-05-03',
  // HARDCODE THE TOKEN TEMPORARILY
  token: 'skb09LBSQIcvTVRFphEsy46KR02fIIeLu7ikkRVdQgLoXHVADXOvy5TzQhOxKVARg2o37e5gbulKaeI9CQkzmmB45G7T1C3vMpX78AW54pbO0UfLQsIz0l703OZvoKuPogSrRXGuGwJQRL3sI9RHMjYPEZlgSHJYnVe39QXkl5W1JveqVxU9', 
});

const builder = createImageUrlBuilder(client);
export const urlFor = (source) => (source ? builder.image(source) : '');