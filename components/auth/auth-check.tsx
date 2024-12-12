"use client";

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AuthDialog } from './auth-dialog';
import { useState } from 'react';

interface AuthCheckProps {
  children: React.ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setShowAuthDialog(true);
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {session ? children : <AuthDialog isOpen={showAuthDialog} onClose={() => setShowAuthDialog(false)} redirectUrl={pathname} />}
    </>
  );
}