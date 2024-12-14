import Link from "next/link";

export default function Page({
	searchParams: { checkout_id },
}: {
	searchParams: {
		checkout_id: string;
	};
}) {
	// Checkout has been confirmed
	// Now, make sure to capture the Checkout.updated webhook event to update the order status in your system

	return (
<section className="bg-gray-100 py-20 flex items-center justify-center">
  <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 10-1.414-1.414L9 9.586 7.707 8.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>

      <p className="text-gray-600 text-center mb-6">
        Thank you for your payment! You’ve unlocked access to the customer details for this requirement.
        Get started now and reach out to secure your first customer.
      </p>

      <div className="space-y-4">
        <Link
          href="/dashboard"
          className="w-full mx-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-center shadow hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/search"
          className="w-full mx-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg text-center shadow hover:bg-gray-200 transition"
        >
          Browse More Opportunities
        </Link>
      </div>
    </div>
  </div>
</section>

	);
}
