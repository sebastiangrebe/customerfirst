"use server"
import { APPLICATION_FEE_VARIANT_ID, STORE_ID } from './config';
import { createCheckout as createCheckoutLSQ } from '@lemonsqueezy/lemonsqueezy.js';

interface CreateCheckoutOptions {
  email: string;
  checkoutData: {
    requirement_id: string;
    website_url: string;
    pricing: string;
    contact_details: string;
    user_id: string;
  };
}

export async function createCheckout({ email, checkoutData }: CreateCheckoutOptions) {
  const checkout = await createCheckoutLSQ(
    STORE_ID, 
    APPLICATION_FEE_VARIANT_ID,
    {
    checkoutData: {
      email: email ?? undefined,
      custom: checkoutData
    },
    checkoutOptions: {
      embed: true,
      media: false,
    },
    productOptions: {
      enabledVariants: [APPLICATION_FEE_VARIANT_ID as unknown as number],
      redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/applications/success`,
      // cancel: `${process.env.NEXT_PUBLIC_APP_URL}/applications/cancel`,
    },
  });

  return checkout;
}