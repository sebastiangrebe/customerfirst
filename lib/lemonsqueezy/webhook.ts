import * as crypto from 'crypto';

export function verifyWebhookSignature(payload: string, signature: string): boolean {
  const hmac = Buffer.from(
    crypto.createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET as any).update(payload).digest('hex'),
    'hex',
  );

  return crypto.timingSafeEqual(hmac as any, signature as any);
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