import Database from "better-sqlite3";
import {fileURLToPath} from "url";




const db = new Database(fileURLToPath(new URL("../../articles.db", import.meta.url)));

export default db;

db.pragma("journal_mode = WAL");

// Create articles table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    relevance INTEGER NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL,
    published_at TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);    

//const stmt = db.prepare("INSERT INTO articles (title, url, relevance, summary, category) VALUES (@title, @url, @relevance, @summary, @category)");