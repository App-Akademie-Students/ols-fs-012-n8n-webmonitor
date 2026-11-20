import DataBase from "better-sqlite3";
import { fileURLToPath } from "node:url";

const db = new DataBase(
  fileURLToPath(new URL("../db/articles.db", import.meta.url)),
);

// Pragmas setzen (für bessere Performance und Fremdschlüssel-Unterstützung)
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Tabelle erstellen
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nr TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    relevance INTEGER NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL,
    published_at datetime NOT NULL
  );
`);

export default db;
