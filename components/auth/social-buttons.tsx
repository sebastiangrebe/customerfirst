"use client";

import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { useState } from 'react';

interface SocialButtonsProps {
  redirectUrl?: string;
}

export function SocialButtons({ redirectUrl }: SocialButtonsProps) {
  const [googleLoading, setGoogleLoading] = useState(false)
  const handleGoogle = async () => {
    setGoogleLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}auth/callback`,
      },
    })
    setGoogleLoading(false);
  }

  return (
    <Button
      variant="outline"
      onClick={() => handleGoogle()}
      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
    >
      <Chrome className="mr-2 h-4 w-4" />
      {googleLoading ? "Signing in..." : "Google"}
    </Button>
  );
}