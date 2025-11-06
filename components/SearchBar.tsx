'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [q, setQ] = useState('');
  function submit(e?: any) {
    e?.preventDefault();
    onSearch(q.trim());
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher (Deutsch ou عربي)..."
        className="border rounded px-3 py-2 flex-1"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">Chercher</button>
    </form>
  );
}
