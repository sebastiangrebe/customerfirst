import { findCategory } from "@/helpers/findCategory";
import { getRequirement } from "@/lib/actions/requirements-client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default async function RequirementPage({ params }: { params: { id: string } }) {

  const requirement = await getRequirement(params.id);
  console.log(requirement)
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-16">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">BetaCustomer Closed</h1>
          <p className="text-gray-600 mb-8">
            This requirement has been successfully closed. Below are the details of the requirement and the selected winner.
          </p>

          <div className="border-t pt-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Requirement Details</h2>
            <div className="text-gray-600">
              <p><strong>Title:</strong> {requirement.title}</p>
              <p><strong>Category:</strong> {findCategory(requirement.category).name}</p>
              <p><strong>Description:</strong> {requirement.description}</p>
              <p><strong>Tags:</strong> {requirement.tags.join(', ')}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Winner Details</h2>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-gray-600"><strong>Website:</strong> <a href={requirement.applications[0].website_url} className="text-blue-500 hover:underline">{requirement.applications[0].website_url}</a></p>
                <p className="text-gray-600"><strong>Description:</strong> {requirement.applications[0].product_description}</p>
                <p className="text-gray-600"><strong>Selected On:</strong> {formatDistanceToNow(new Date(requirement.winners[0].selected_at))} ago</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/search"
              className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Browse More Requirements
            </Link>
          </div>
        </div>
      </div>
    </section>

  );
}