import { useState, useEffect } from 'react';
import { useInternetIdentity } from './useInternetIdentity';

export function useSavedAnalytics() {
  const { identity } = useInternetIdentity();
  const [analytics, setAnalytics] = useState<any[]>([]);

  const storageKey = identity ? `analytics_${identity.getPrincipal().toString()}` : null;

  useEffect(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          setAnalytics(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to load analytics', e);
        }
      }
    }
  }, [storageKey]);

  const saveAnalytics = (data: any) => {
    const newAnalytics = [...analytics, { ...data, timestamp: Date.now() }];
    setAnalytics(newAnalytics);
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(newAnalytics));
    }
  };

  return {
    analytics,
    saveAnalytics,
  };
}
