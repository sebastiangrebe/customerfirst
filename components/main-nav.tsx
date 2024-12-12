"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle, Trophy, LayoutDashboard, Users } from 'lucide-react';
import { AuthButton } from '@/components/auth/auth-button';

export function MainNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="border-b bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
              <Users className="h-6 w-6" />
              CustomerFirst
            </Link>
            <nav className="ml-8 hidden md:flex items-center space-x-4">
              <Link
                href="/search"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white/90",
                  pathname === "/search" ? "text-white" : "text-white/70"
                )}
              >
                Browse
              </Link>
              <Link
                href="/winners"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-white/90",
                  pathname === "/winners" ? "text-white" : "text-white/70"
                )}
              >
                Winners
              </Link>
              {session && (
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-white/90",
                    pathname === "/dashboard" ? "text-white" : "text-white/70"
                  )}
                >
                  Dashboard
                </Link>
              )}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {session && (
              <Link href="/requirements/new">
                <Button
                  variant="secondary"
                  size="sm"
                  className="hidden md:flex bg-white text-blue-600 hover:bg-blue-50"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post Requirement
                </Button>
              </Link>
            )}
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
}