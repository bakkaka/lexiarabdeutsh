'use client';
import { useRef } from 'react';

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

export default function WordCard({ item, onLong }: { item: Word, onLong: (item: Word) => void }) {
  const timerRef = useRef<number | null>(null);

  function handlePointerDown() {
    timerRef.current = window.setTimeout(() => onLong(item), 700);
  }
  function handlePointerUp() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }
  function handleContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    onLong(item);
  }

  return (
    <div
      className="border rounded p-3 mb-2 hover:shadow-sm"
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
    </div>
  );
}
