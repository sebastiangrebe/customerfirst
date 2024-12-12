import {
  createCheckout as createCheckoutLSQ,
  lemonSqueezySetup,
} from "@lemonsqueezy/lemonsqueezy.js";

lemonSqueezySetup({
  apiKey: process.env.LEMONSQUEEZY_API_KEY!,
  onError: (error) => console.error("Error!", error),
});

export const APPLICATION_FEE_VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID!;

export async function createCheckout(variantId: number, email: string) {
  const embed = true
  const checkout = await createCheckoutLSQ(
    140380,
    628496,
    {
      checkoutOptions: {
        embed,
        media: false,
        logo: !embed,
      },
      checkoutData: {
        email,
      },
      productOptions: {
        enabledVariants: [628496],
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing/`,
        receiptButtonText: "Go to Dashboard",
        receiptThankYouNote: "Thank you for signing up to Lemon Stand!",
      },
    },
    // email,
    // successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/applications/success?checkout={checkout_id}`,
    // cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/applications/cancel`,
  );

  return checkout;
}