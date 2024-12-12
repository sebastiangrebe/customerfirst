import { createHmac } from 'crypto';

export function verifyWebhookSignature(payload: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!;
  const hmac = createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return signature === digest;
}

export function handleWebhookEvent(event: any) {
  const eventName = event.meta.event_name;
  const customData = event.meta.custom_data;

  switch (eventName) {
    case 'order_created':
      return {
        type: 'ORDER_CREATED',
        data: customData,
      };
    default:
      return null;
  }
}