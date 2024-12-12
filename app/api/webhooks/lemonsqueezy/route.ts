import { headers } from 'next/headers';
import { verifyWebhookSignature, handleWebhookEvent } from '@/lib/lemonsqueezy/webhook';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('x-signature');

    if (!signature || !verifyWebhookSignature(body, signature)) {
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