// app/page.tsx
'use client';

import { useState, useRef } from 'react';
import SearchBar from './components/SearchBar';
import WordModal from './components/WordModal';

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

export default function Home() {
  const [results, setResults] = useState<Word[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour rechercher
  const handleSearch = async (query: string) => {
    if (!query) { 
      setResults([]); 
      return; 
    }
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}&limit=100`);
      const json = await res.json();
      setResults(json.results || []);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Long click
  const handleMouseDown = (word: Word) => {
    timeoutRef.current = setTimeout(() => {
      setSelectedWord(word);
      setModalOpen(true);
    }, 600); // 600ms
  };

  const handleMouseUp = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />

      {loading && <p>Chargement...</p>}
      {!loading && results.length === 0 && <p>Aucun résultat</p>}

      <ul>
        {results.map((word, idx) => (
          <li
            key={idx}
            onMouseDown={() => handleMouseDown(word)}
            onMouseUp={handleMouseUp}
            onTouchStart={() => handleMouseDown(word)}
            onTouchEnd={handleMouseUp}
            onContextMenu={(e) => {
              e.preventDefault(); // empêche le menu contextuel
              setSelectedWord(word);
              setModalOpen(true);
            }}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded mb-1"
          >
            <strong>{word.mot_de}</strong> → {word.mot_ar}
          </li>
        ))}
      </ul>

      {modalOpen && selectedWord && (
        <WordModal item={selectedWord} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
