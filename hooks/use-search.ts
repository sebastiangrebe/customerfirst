"use client";

import { useState, useEffect } from 'react';
import { searchIndex } from '@/lib/algolia';
import type { Requirement } from '@/types';

export function useSearch(query: string, category: string, status: string) {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      let filters = (category && category !== 'all') ? `category:${category}` : '';

      if (status && status !== 'all') {
        if (filters) {
          filters = `${filters} AND status:${status}`;
        } else {
          filters = `status:${status}`;
        }
      }

      try {
        const { hits } = await searchIndex.search<Requirement>(query, {
          filters,
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
  }, [query, category, status]);

  return { requirements, isLoading };
}