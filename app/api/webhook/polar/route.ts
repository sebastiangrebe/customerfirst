import {
	validateEvent,
	WebhookVerificationError,
} from "@polar-sh/sdk/webhooks";
import { type NextRequest, NextResponse } from "next/server";
import { supabase } from '@/lib/supabaseSecure';

export async function POST(request: NextRequest) {
	const requestBody = await request.text();
	const webhookHeaders = {
		"webhook-id": request.headers.get("webhook-id") ?? "",
		"webhook-timestamp": request.headers.get("webhook-timestamp") ?? "",
		"webhook-signature": request.headers.get("webhook-signature") ?? "",
	};

	let webhookPayload: ReturnType<typeof validateEvent>;
	try {
		webhookPayload = validateEvent(
			requestBody,
			webhookHeaders,
			process.env.POLAR_WEBHOOK_SECRET ?? "",
		);
	} catch (error) {
		if (error instanceof WebhookVerificationError) {
			return new NextResponse("", { status: 403 });
		}
		throw error;
	}

	console.log("Incoming Webhook", webhookPayload.type);

	// Handle the event
	switch (webhookPayload.type) {
		// Checkout has been created
		case "checkout.created":
			break;

		// Checkout has been updated - this will be triggered when checkout status goes from confirmed -> succeeded
		case "checkout.updated":
			break;

		// Subscription has been created
		case "subscription.created":
			break;

		// A catch-all case to handle all subscription webhook events
		case "subscription.updated":
			break;

		// Subscription has been activated
		case "subscription.active":
			break;

		// Subscription has been revoked/peroid has ended with no renewal
		case "subscription.revoked":
			break;

		// Subscription has been explicitly canceled by the user
		case "subscription.canceled":
			break;

		// Subscription has been explicitly canceled by the user
		case "order.created":
			const { requirement_id, website_url, pricing, contact_details, user_id, product_description } = webhookPayload.data.metadata;
			console.log({
				requirement_id,
				website_url,
				user_id,
				product_description,
				pricing,
				contact_details,
				status: 'pending',
				created_at: new Date().toISOString(),
			})

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
			break;

		default:
			console.log(`Unhandled event type ${webhookPayload.type}`);
	}

	return NextResponse.json({ received: true });
}
