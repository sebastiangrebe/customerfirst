"use client";
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    })
  }
  return <PostHogProvider client={posthog}><SessionProvider>{children}</SessionProvider></PostHogProvider>;
}