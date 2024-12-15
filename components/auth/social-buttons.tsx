"use client";

import { Button } from '@/components/ui/button';
import { Github, Chrome } from 'lucide-react';
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
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    setGoogleLoading(false);
  }

  const [githubLoading, setGithubLoading] = useState(false)
  const handleGithub = async () => {
    setGithubLoading(true)
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}auth/callback`,
      },
    })
    setGithubLoading(false);
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() => handleGoogle()}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
      >
        <Chrome className="mr-2 h-4 w-4" />
        {googleLoading ? "Signing in..." : "Google"}
      </Button>
      <Button
        variant="outline"
        onClick={() => handleGithub()}
        className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white border-0"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}