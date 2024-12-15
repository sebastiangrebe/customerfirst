"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { AuthDialog } from './auth-dialog';
import { useState } from 'react';
import { useUser } from '@/app/providers';

interface AuthCheckProps {
  children: React.ReactNode;
}

export function AuthCheck({ children }: AuthCheckProps) {
  const user = useUser();
  const pathname = usePathname();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowAuthDialog(true);
    }
  }, [user]);

  if (!user && !setShowAuthDialog) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {user ? children : <AuthDialog isOpen={showAuthDialog} onClose={() => setShowAuthDialog(false)} redirectUrl={pathname} />}
    </>
  );
}