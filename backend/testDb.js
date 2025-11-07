import sqlite3 from "sqlite3";

const db = new sqlite3.Database("dico.sqlite");

db.all("SELECT * FROM mots", (err, rows) => {
  if (err) throw err;
  console.log(rows);
  db.close();
});
