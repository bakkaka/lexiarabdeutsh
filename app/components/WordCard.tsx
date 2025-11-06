'use client';
import { useRef, useState } from 'react';

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

export default function WordCard({ item }: { item: Word }) {
  const timerRef = useRef<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  function handlePointerDown() {
    timerRef.current = window.setTimeout(() => setExpanded(true), 700);
  }

  function handlePointerUp() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    setExpanded(!expanded);
  }

  return (
    <div
      className="border rounded p-3 mb-2 hover:shadow-md transition-shadow"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onContextMenu={handleContextMenu}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-semibold">{item.mot_de} → {item.mot_ar}</div>
          <div className="text-sm italic text-gray-600">{item.type}</div>
        </div>
      </div>

      <div className="mt-2 text-sm">
        <strong>Déf.:</strong> {item.definition}
      </div>

      {expanded && (
        <div className="mt-2 p-2 bg-gray-100 rounded">
          {item.is_personality ? (
            <>
              <div className="font-semibold">Biographie :</div>
              <div className="text-sm">{item.bio || '(aucune)'}</div>
            </>
          ) : (
            <>
              <div className="font-semibold">Synonymes :</div>
              <div className="text-sm">{(item.synonyms || []).join(', ') || '(aucun)'}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
