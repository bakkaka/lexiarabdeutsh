'use client';
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WordCard from './components/WordCard';

type Word = {
  id: number;
  mot_de: string;
  mot_ar: string;
  type: string;
  definition: string;
  exemple_de?: string;
  exemple_ar?: string;
  synonyms?: string[];
  is_personality?: boolean;
  bio?: string;
};

export default function HomePage() {
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);

  async function doSearch(q: string) {
    if (!q) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=100`);
      const json = await res.json();
      setResults(json.results || []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">LexiArabDeutsch — Dictionnaire Deutsch ↔ عربي</h1>

      <SearchBar onSearch={doSearch} />
      {loading && <div className="mt-4">Recherche...</div>}

      <div className="mt-4">
        {results.length === 0 && !loading && <div>Aucun résultat</div>}
        {results.map((r: Word) => (
          <WordCard key={r.id} item={r} />
        ))}
      </div>
    </main>
  );
}
