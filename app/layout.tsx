import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/main-nav';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BetaCustomer - Find Your First Beta Customer | Connect with Providers and Clients Effortlessly',
  description: "A platform designed to help users connect with their First Beta Customers or providers. Post your requirements, apply for opportunities, and kickstart your business journey with ease.",
  "keywords": [
    "First Beta Customer",
    "online tools",
    "business connections",
    "find clients",
    "post requirements",
    "apply for projects",
    "business matching",
    "customer acquisition",
    "freelance marketplace",
    "connect providers"
  ],
  "twitter": {
    "card": "summary_large_image",
    "title": "BetaCustomer - Find Your First Beta Customer | Connect Effortlessly",
    "description": "A platform for posting requirements and connecting with potential clients or providers.",
    "site": "@sebastiangrebe"
  },
  "robots": "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <MainNav />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}