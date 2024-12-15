"use client";
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { createContext, useContext } from 'react';

const UserContext = createContext({} as any);

export function UserProvider({ children, session }: any) {
  return <UserContext.Provider value={session}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

export function Providers({ children, session }: { children: React.ReactNode, session: any }) {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    })
  }
  return <UserProvider session={session}><PostHogProvider client={posthog}>{children}</PostHogProvider></UserProvider>;
}