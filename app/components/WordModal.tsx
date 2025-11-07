// app/components/WordModal.tsx
'use client';

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

export default function WordModal({ item, onClose }: { item?: Word | null; onClose: () => void }) {
  if (!item) return null; // <- sécurité si item est null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-2">{item.mot_de} → {item.mot_ar}</h2>
        <p className="text-gray-700 italic mb-2">{item.type}</p>
        <p className="mb-3"><strong>Définition :</strong> {item.definition}</p>

        {item.exemple_de && <p className="mb-2"><strong>Exemple 🇩🇪 :</strong> {item.exemple_de}</p>}
        {item.exemple_ar && <p className="mb-2"><strong>Exemple 🇸🇦 :</strong> {item.exemple_ar}</p>}

        {item.is_personality ? (
  <>
    <h3 className="font-semibold mt-3 mb-1">Biographie :</h3>
    <p className="text-gray-800 text-sm leading-relaxed">{item.bio || "(aucune)"}</p>
  </>
) : (
  <>
    <h3 className="font-semibold mt-3 mb-1">Synonymes :</h3>
    <p className="text-gray-800 text-sm">
      {Array.isArray(item.synonyms) ? item.synonyms.join(', ') : item.synonyms || "(aucun)"}
    </p>
  </>
)}

      </div>
    </div>
  );
}
