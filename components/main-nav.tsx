import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { AuthButton } from '@/components/auth/auth-button';
import { Menu, X } from 'lucide-react';
import { headers } from "next/headers";
import { createClient } from '@/utils/supabase/server';

export async function MainNav() {
  const supabase = await createClient()

  const heads = headers()

  const pathname = heads.get('next-url')
  const { data: session, error } = await supabase.auth.getUser()
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white flex items-center gap-2">
              <img src="/logo.png" height="50" width="50" alt="BetaCustomer" />
              BetaCustomer
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
            <button
              className="md:hidden text-white focus:outline-none"
              // onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />} */}
            </button>
            {session && (
              <Link href="/requirements/new">
                <Button
                  variant="secondary"
                  size="sm"
                  className="md:flex bg-white text-blue-600 hover:bg-blue-50"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post Requirement
                </Button>
              </Link>
            )}
            <div className="hidden md:flex">
              <AuthButton redirectUrl="/" />
            </div>
          </div>
        </div>
        {/* {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 text-center gap-2 flex flex-col">
            <Link
              href="/search"
              className={cn(
                "block text-sm font-medium transition-colors hover:text-white/90",
                pathname === "/search" ? "text-white" : "text-white/70"
              )}
            >
              Browse
            </Link>
            <Link
              href="/winners"
              className={cn(
                "block text-sm font-medium transition-colors hover:text-white/90",
                pathname === "/winners" ? "text-white" : "text-white/70"
              )}
            >
              Winners
            </Link>
            {session && (
              <Link
                href="/dashboard"
                className={cn(
                  "block text-sm font-medium transition-colors hover:text-white/90",
                  pathname === "/dashboard" ? "text-white" : "text-white/70"
                )}
              >
                Dashboard
              </Link>
            )}
              <AuthButton redirectUrl="/" />
          </nav>
        )} */}
      </div>
    </header>
  );
}
