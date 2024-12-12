"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const { requirements, isLoading } = useSearch(query, category);
  const router = useRouter();

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
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : requirements.length > 0 ? (
          requirements.map((requirement) => (
            <RequirementCard
              key={requirement.id}
              requirement={requirement}
              onClick={() => router.push(`/requirements/${requirement.id}`)}
            />
          ))
        ) : (
          <p>No requirements found.</p>
        )}
      </div>
    </div>
  );
}