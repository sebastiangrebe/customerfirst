"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { RequirementCard } from '@/components/requirement-card';
import { useSearch } from '@/hooks/use-search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories } from '@/constants/categories';
import Link from 'next/link';

const statuses = [
  { name: 'All', value: 'all' },
  { name: 'Open', value: 'open' },
  { name: 'Closed', value: 'closed' },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const { requirements, isLoading } = useSearch(query, category, status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-4 mb-8">
        <Input
            type="search"
            placeholder="Search requirements..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="max-w-md"
          />

        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[400px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key="all" value="all">All</SelectItem>
            {categories.map((category) => (<SelectItem key={category.value} value={category.value}>{category.name}</SelectItem>))}
          </SelectContent>
        </Select>

        <Select onValueChange={setStatus}>
          <SelectTrigger className="w-[400px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((category) => (<SelectItem key={category.value} value={category.value}>{category.name}</SelectItem>))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div className="p-8">Loading...</div></div>
        ) : requirements.length > 0 ? (
          requirements.map((requirement) => (
            <Link href={requirement.status === 'open' ? `/requirements/${requirement.id}/apply` : `/requirements/${requirement.id}`} key={requirement.id}>
              <RequirementCard
                key={requirement.id}
                requirement={requirement}
              />
            </Link>
          ))
        ) : (
          <p>No requirements found.</p>
        )}
      </div>
    </div>
  );
}