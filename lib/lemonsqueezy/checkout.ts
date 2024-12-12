import { lemonSqueezy, APPLICATION_FEE_VARIANT_ID, STORE_ID } from './config';

interface CreateCheckoutOptions {
  email: string;
  checkoutData: {
    requirementId: string;
    websiteUrl: string;
    pricing: number;
    contactDetails: string;
  };
}

export async function createCheckout({ email, checkoutData }: CreateCheckoutOptions) {
  const checkout = await lemonSqueezy.createCheckout({
    storeId: STORE_ID,
    variantId: APPLICATION_FEE_VARIANT_ID,
    email,
    checkoutData,
    checkout: {
      embed: true,
      darkMode: false,
      media: false,
    },
    redirectUrls: {
      success: `${process.env.NEXT_PUBLIC_APP_URL}/applications/success`,
      cancel: `${process.env.NEXT_PUBLIC_APP_URL}/applications/cancel`,
    },
  });

  return checkout;
}