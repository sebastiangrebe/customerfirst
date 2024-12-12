"use client";

import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { AuthDialog } from './auth-dialog';

interface AuthButtonProps {
  redirectUrl?: string;
}

export function AuthButton({ redirectUrl }: AuthButtonProps) {
  const { data: session } = useSession();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  if (session) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => signOut()}
        className="gap-2 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white border-0"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </Button>
    );
  }

  return (
    <>
      <Button 
        variant="default" 
        size="sm" 
        onClick={() => setShowAuthDialog(true)}
        className="gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
      >
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
      <AuthDialog 
        isOpen={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)}
        redirectUrl={redirectUrl}
      />
    </>
  );
}