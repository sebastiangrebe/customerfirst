import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SearchIcon, PlusCircle, Trophy } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Be the Perfect Match for Your
            <span className="text-primary block">First Customer</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Post your requirements or apply to fulfill others'. A simple, transparent platform
            connecting digital needs with solutions -  The BetaCustomer approach.
          </p>
          <div className="mt-10 flex justify-center gap-4 flex-col md:flex-row">
            <Link href="/requirements/new">
              <Button size="lg" className="gap-2">
                <PlusCircle className="w-5 h-5" />
                Post Requirement
              </Button>
            </Link>
            <Link href="/search">
              <Button size="lg" variant="outline" className="gap-2">
                <SearchIcon className="w-5 h-5" />
                Browse Requirements
              </Button>
            </Link>
            <Link href="/winners">
              <Button size="lg" variant="secondary" className="gap-2">
                <Trophy className="w-5 h-5" />
                View Winners
              </Button>
            </Link>
          </div>
        </div>
        <section className="bg-gray-50 py-16 my-8">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                "Think of us as Craigslist for Founders, but with a twist!"
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                Whether you're an entrepreneur with a product looking for your first customer, or validating an idea before you launch, we connect you directly to the people who need what you offer. Post your requirements, find opportunities, and kickstart your journey—all in one place!
              </p>
            </div>
          </div>
        </section>

        <div className="mt-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post Requirements</h3>
              <p className="text-gray-600">
                Share your digital needs with our community. Describe what you're looking for
                in detail.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Find Opportunities</h3>
              <p className="text-gray-600">
                Browse through requirements and find the perfect match for your skills and
                services.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Win Projects</h3>
              <p className="text-gray-600">
                Apply to requirements, showcase your expertise, and get selected for projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}