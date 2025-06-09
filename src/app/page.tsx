'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import MedalTable from '@/components/MedalTable';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { useMedalData } from '@/hooks/useMedalData';
import { SortType } from '@/types';

function HomeContent() {
  const { medals, loading, error, refetch } = useMedalData();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get sort parameter from URL, default to 'gold'
  const urlSort = searchParams.get('sort') as SortType;
  const validSorts: SortType[] = ['total', 'gold', 'silver', 'bronze'];
  const defaultSort: SortType = 'gold';
  const initialSort = urlSort && validSorts.includes(urlSort) ? urlSort : defaultSort;
  
  const [sortBy, setSortBy] = useState<SortType>(initialSort);

  // Update URL when sort changes
  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());
    if (sortBy !== defaultSort) {
      currentParams.set('sort', sortBy);
    } else {
      currentParams.delete('sort');
    }
    
    const newUrl = currentParams.toString() ? `?${currentParams.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [sortBy, router, searchParams]);

  const sortedMedals = useMemo(() => {
    const sorted = [...medals].sort((a, b) => {
      switch (sortBy) {
        case 'total':
          // When ranking by total medals, ties are broken by most gold
          return b.total - a.total || b.gold - a.gold;
        case 'gold':
          // When ranking by gold, ties are broken by most silver
          return b.gold - a.gold || b.silver - a.silver;
        case 'silver':
          // When ranking by silver, ties are broken by most gold
          return b.silver - a.silver || b.gold - a.gold;
        case 'bronze':
          // When ranking by bronze, ties are broken by most gold
          return b.bronze - a.bronze || b.gold - a.gold;
        default:
          // Fallback to gold sorting
          return b.gold - a.gold || b.silver - a.silver;
      }
    });
    return sorted;
  }, [medals, sortBy]);

  const handleSortChange = (sortType: SortType): void => {
    setSortBy(sortType);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-5 min-h-screen">
        <Header />
        <LoadingSpinner />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-5 min-h-screen">
        <Header />
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-5 min-h-screen">
      <Header />
      
      <MedalTable medals={sortedMedals} currentSort={sortBy} onSortChange={handleSortChange} />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
} 