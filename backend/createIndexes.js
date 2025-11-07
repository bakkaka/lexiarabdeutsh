import sqlite3 from "sqlite3";
const db = new sqlite3.Database("dico.sqlite");

db.serialize(() => {
  db.run("CREATE INDEX IF NOT EXISTS idx_mot_de ON mots(mot_de)");
  db.run("CREATE INDEX IF NOT EXISTS idx_mot_ar ON mots(mot_ar)");
});

db.close();
console.log("✅ Index créés !");
