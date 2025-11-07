// backend/app.js
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
app.use(cors()); // Autorise les requêtes depuis le frontend

const db = new sqlite3.Database("dico.sqlite");

// Endpoint search
app.get("/search", (req, res) => {
  const q = (req.query.q || "").toLowerCase();
  const limit = parseInt(req.query.limit) || 10;

  db.all(
    `SELECT * FROM mots 
     WHERE LOWER(mot_de) LIKE ? OR LOWER(mot_ar) LIKE ?
     LIMIT ?`,
    [`%${q}%`, `%${q}%`, limit],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ results: rows }); // <- important : frontend attend "results"
    }
  );
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
