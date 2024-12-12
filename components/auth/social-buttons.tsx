"use client";

import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { Github, Chrome } from 'lucide-react';

interface SocialButtonsProps {
  redirectUrl?: string;
}

export function SocialButtons({ redirectUrl }: SocialButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() => signIn('google', { callbackUrl: redirectUrl })}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
      >
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button
        variant="outline"
        onClick={() => signIn('github', { callbackUrl: redirectUrl })}
        className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white border-0"
      >
        <Github className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  );
}