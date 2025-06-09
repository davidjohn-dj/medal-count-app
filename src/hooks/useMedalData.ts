import { useState, useEffect } from 'react';
import { MedalData, MedalDataWithTotal } from '@/types';

interface UseMedalDataReturn {
  medals: MedalDataWithTotal[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useMedalData = (): UseMedalDataReturn => {
  const [medals, setMedals] = useState<MedalDataWithTotal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCached, setIsCached] = useState<boolean>(false);

  const fetchMedalData = async (): Promise<void> => {
    // Don't refetch if we already have cached data and it's not a manual refetch
    if (isCached && medals.length > 0) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Simulate API call delay for realism
      await new Promise(resolve => setTimeout(resolve, 800));

      // Fetch medal data from Next.js API route
      const response = await fetch('/api/medals', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch medal data: ${response.status} ${response.statusText}`);
      }

      const data: MedalData[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format: Expected an array of medal data');
      }

      // Calculate total medals for each country
      const medalsWithTotal: MedalDataWithTotal[] = data.map(country => ({
        ...country,
        total: country.gold + country.silver + country.bronze
      }));

      setMedals(medalsWithTotal);
      setIsCached(true);
    } catch (err) {
      console.error('Error fetching medal data:', err);
      setError(
        err instanceof Error 
          ? `Unable to load medal data: ${err.message}. Please check your internet connection and try again.`
          : 'An unexpected error occurred while loading medal data. Please try again later.'
      );
      setMedals([]);
    } finally {
      setLoading(false);
    }
  };

  const refetch = (): void => {
    setIsCached(false);
    fetchMedalData();
  };

  useEffect(() => {
    fetchMedalData();
  }, []);

  return { medals, loading, error, refetch };
}; 