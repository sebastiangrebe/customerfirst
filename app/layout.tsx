import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/main-nav';
import { Providers } from './providers';
import { Footer } from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';

const inter = Inter({ subsets: ['latin'] });

const title = 'BetaCustomer - Find Your First Customer | Connect with Providers and Clients Effortlessly';
const description = "A platform designed to help users connect with their First Customers or providers. Post your requirements, apply for opportunities, and kickstart your business journey with ease.";

export const metadata: Metadata = {
  title,
  description,
  "keywords": [
    "First Customer",
    "customer first",
    "online tools",
    "business connections",
    "find clients",
    "post requirements",
    "apply for projects",
    "business matching",
    "customer acquisition",
    "freelance marketplace",
    "connect providers",
    "find customer"
  ],
  "twitter": {
    "card": "summary_large_image",
    title,
    description,
    "site": "@sebastiangrebe",
    images: ['https://www.betacustomer.com/logo.png'],
  },
  "robots": "index, follow",
  openGraph: {
    title,
    description,
    images: [
      {
        url: 'https://www.betacustomer.com/logo.png',
        width: 400,
        height: 400,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user: session },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <MainNav />
          {children}
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}