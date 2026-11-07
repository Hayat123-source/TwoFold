import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export const CAP_PER_GENDER = 500;

export interface Spots {
  male: number;
  female: number;
}

export function useSpots(refreshKey = 0) {
  const [spots, setSpots] = useState<Spots | null>(null);

  useEffect(() => {
    let active = true;
    supabase.rpc('get_spots').then(({ data, error }) => {
      if (!active || error || !data) return;
      setSpots({ male: Number(data.male) || 0, female: Number(data.female) || 0 });
    });
    return () => {
      active = false;
    };
  }, [refreshKey]);

  return spots;
}
