'use client';
import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('');

  const debouncedSearch = debounce((value: string) => {
    onSearch(value.trim());
  }, 300);

  useEffect(() => {
    debouncedSearch(q);
    return () => {
      debouncedSearch.cancel();
    };
  }, [q]);

  return (
    <div className="flex gap-2">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher (Deutsch ou عربي)..."
        className="border rounded px-3 py-2 flex-1"
      />
    </div>
  );
}
