import * as crypto from 'crypto';
import { Buffer } from 'node:buffer';

export function verifyWebhookSignature(payload: Buffer, signature: Buffer): boolean {
  const hmac = Buffer.from(
    crypto.createHmac('sha256', process.env.LEMONSQUEEZY_WEBHOOK_SECRET as any).update(payload as any).digest('hex'),
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