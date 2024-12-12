import { headers } from 'next/headers';
import { verifyWebhookSignature, handleWebhookEvent } from '@/lib/lemonsqueezy/webhook';
import { supabase } from '@/lib/supabaseSecure';

export async function POST(req: Request) {
  try {
    const body = await req.text();

    // Get the signature from the request headers.
    const signature = Buffer.from(
      headers().get('x-signature') ?? '',
      'hex',
    );

    if (!signature || !verifyWebhookSignature(body as any, signature)) {
      return new Response('Invalid signature', { status: 401 });
    }

    const event = handleWebhookEvent(JSON.parse(body));

    if (event?.type === 'ORDER_CREATED') {
      const { requirement_id, website_url, pricing, contact_details, user_id, product_description } = event.data;

      // Create the application only after successful payment
      const { data: application, error } = await supabase
        .from('applications')
        .insert([{
          requirement_id,
          website_url,
          user_id,
          product_description,
          pricing,
          contact_details,
          status: 'pending',
          created_at: new Date().toISOString(),
        }])
        .select()
        .single();

      if (error) throw error;
    }

    return new Response('Webhook processed', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Webhook processing failed', { status: 500 });
  }
}