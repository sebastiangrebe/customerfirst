"use client";

import Script from "next/script";
import { AuthCheck } from '@/components/auth/auth-check';
import { ApplicationForm } from '@/components/application/application-form';

export default function RequirementPage({ params }: { params: { id: string } }) {
  return (
    <AuthCheck>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Apply for your first customer</h1>
        <ApplicationForm requirementId={params.id} />
      </div>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" onLoad={() => {
        (window as any).createLemonSqueezy()
      }} />
    </AuthCheck>
  );
}