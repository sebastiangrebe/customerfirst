import { headers } from 'next/headers';
import { buffer } from "micro";
import { verifyWebhookSignature, handleWebhookEvent } from '@/lib/lemonsqueezy/webhook';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const payload = await buffer(req as any);

    // Get the signature from the request headers.
    const signature = Buffer.from(
      headers().get('x-signature') ?? '',
      'hex',
    );

    if (!signature || !verifyWebhookSignature(payload, signature)) {
      return new Response('Invalid signature', { status: 401 });
    }

    const event = handleWebhookEvent(JSON.parse(body));

    if (event?.type === 'ORDER_CREATED') {
      const { requirementId, websiteUrl, pricing, contactDetails } = event.data;

      // Create the application only after successful payment
      const { data: application, error } = await supabase
        .from('applications')
        .insert([{
          requirementId,
          websiteUrl,
          pricing,
          contactDetails,
          status: 'pending',
          createdAt: new Date().toISOString(),
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