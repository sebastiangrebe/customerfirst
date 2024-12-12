import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js';

export const lemonSqueezy = lemonSqueezySetup({
    apiKey: process.env.LEMONSQUEEZY_API_KEY!
});

export const APPLICATION_FEE_VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID!;

export const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID!;