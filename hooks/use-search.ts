"use client";

import { useState, useEffect } from 'react';
import { searchIndex } from '@/lib/algolia';
import type { Requirement } from '@/types';

export function useSearch(query: string, category: string) {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      try {
        const { hits } = await searchIndex.search<Requirement>(query, {
          filters: (category && category !== 'all') ? `category:${category}` : undefined,
        });
        setRequirements(hits);
      } catch (error) {
        console.error('Search failed:', error);
        setRequirements([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query, category]);

  return { requirements, isLoading };
}