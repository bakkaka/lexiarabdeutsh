// backend/loader.js
import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";
import { fileURLToPath } from "url";

// Pour pouvoir utiliser __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin vers le JSON contenant les mots
const dataPath = path.join(__dirname, "../public/data/sample.json");

// Vérifie que le fichier existe
if (!fs.existsSync(dataPath)) {
  console.error("❌ Le fichier sample.json est introuvable :", dataPath);
  process.exit(1);
}

// Lecture du JSON
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
console.log("✅ Nombre d’entrées dans le JSON :", data.length);

// Connexion à SQLite
const db = new sqlite3.Database(path.join(__dirname, "dico.sqlite"));

// Création de la table si elle n'existe pas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS mots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mot_de TEXT,
    mot_ar TEXT,
    type TEXT,
    definition TEXT,
    exemple_de TEXT,
    exemple_ar TEXT,
    synonyms TEXT,
    is_personality INTEGER,
    bio TEXT
  )`);

  const stmt = db.prepare(`INSERT INTO mots 
    (mot_de, mot_ar, type, definition, exemple_de, exemple_ar, synonyms, is_personality, bio) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  data.forEach(word => {
    try {
      stmt.run(
        word.mot_de,
        word.mot_ar,
        word.type || "",
        word.definition || "",
        word.exemple_de || "",
        word.exemple_ar || "",
        JSON.stringify(word.synonyms || []),
        word.is_personality || 0,
        word.bio || ""
      );
    } catch(e) {
      // ignore les doublons ou erreurs
    }
  });

  stmt.finalize(() => {
    console.log("✅ Import terminé : mots enregistrés dans dico.sqlite !");
    db.close();
  });
});
