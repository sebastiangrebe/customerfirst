import { headers } from 'next/headers';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  const body = await req.json();
  const signature = headers().get('x-signature');

  // Verify webhook signature
  if (!signature || signature !== process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
    return new Response('Invalid signature', { status: 401 });
  }

  if (body.meta.event_name === 'order_created') {
    const { checkout_id } = body.meta.custom_data;

    // Update application status
    await supabase
      .from('applications')
      .update({ status: 'paid' })
      .eq('checkoutId', checkout_id);
  }

  return new Response('Webhook processed', { status: 200 });
}