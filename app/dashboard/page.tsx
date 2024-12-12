"use client";

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { AuthCheck } from '@/components/auth/auth-check';
import { RequirementWithApplications } from '@/components/requirement-with-applications';
import { getUserRequirements } from '@/lib/actions/requirements';
import type { RequirementWithApplications as RequirementType } from '@/types';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [requirements, setRequirements] = useState<RequirementType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRequirements() {
      if (session?.user?.email) {
        try {
          const data = await getUserRequirements();
          setRequirements(data);
        } catch (error) {
          console.error('Failed to load requirements:', error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    loadRequirements();
  }, [session]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <AuthCheck>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Requirements</h1>
        <div className="space-y-8">
          {requirements.length > 0 ? (
            requirements.map((requirement) => (
              <RequirementWithApplications
                key={requirement.id}
                requirement={requirement}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              You haven't posted any requirements yet.
            </p>
          )}
        </div>
      </div>
    </AuthCheck>
  );
}