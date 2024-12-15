"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';
import { AuthDialog } from './auth-dialog';
import { supabase } from '@/utils/supabase/client';
import { useUser } from '@/app/providers';

interface AuthButtonProps {
  redirectUrl?: string;
}

export function AuthButton({ redirectUrl }: AuthButtonProps) {
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const session = useUser();

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  if (session) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => logout()}
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