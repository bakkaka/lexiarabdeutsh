import { NextRequest, NextResponse } from "next/server";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

// Fonction pour ouvrir la base SQLite
async function openDb() {
  return open({
    filename: path.join(process.cwd(), "backend", "dico.sqlite"), // chemin vers ta base
    driver: sqlite3.Database,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").toLowerCase().trim();
  const limit = Number(searchParams.get("limit") || 50);

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const db = await openDb();

  // Recherche dans SQLite : mots qui commencent par q
  const results = await db.all(
    `
    SELECT * FROM mots 
    WHERE LOWER(mot_de) LIKE ? OR LOWER(mot_ar) LIKE ?
    LIMIT ?
  `,
    [`${q}%`, `${q}%`, limit]
  );

  await db.close();

  // Parse les synonymes (stockés en JSON) et convertir is_personality en boolean
  const parsedResults = results.map((item) => ({
    ...item,
    synonyms: JSON.parse(item.synonyms || "[]"),
    is_personality: !!item.is_personality,
  }));

  return NextResponse.json({ results: parsedResults });
}
