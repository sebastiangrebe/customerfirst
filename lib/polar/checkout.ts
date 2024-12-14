"use server"

import { polar } from "../../polar";

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

export async function createCheckout({ email, checkoutData, }: CreateCheckoutOptions) {
  const successUrl = `${process.env.NEXT_PUBLIC_APP_URL}/checkout/confirmation?checkout_id={CHECKOUT_ID}`;
console.log('successUrl', successUrl)
  const checkout = await polar.checkouts.custom.create({
    productPriceId: process.env.PRODUCT_PRICE_ID!,
    successUrl,
    metadata: checkoutData,
    customerEmail: email,
  });
  return checkout;
}