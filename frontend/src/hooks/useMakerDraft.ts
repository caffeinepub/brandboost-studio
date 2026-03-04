import { useState, useEffect } from 'react';

export function useMakerDraft(type: 'photo' | 'video') {
  const storageKey = `maker_draft_${type}`;
  const [draft, setDraft] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        setDraft(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load draft', e);
      }
    }
  }, [storageKey]);

  const updateDraft = (data: any) => {
    const updated = { ...draft, ...data };
    setDraft(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const clearDraft = () => {
    setDraft(null);
    localStorage.removeItem(storageKey);
  };

  return {
    draft,
    updateDraft,
    clearDraft,
  };
}
