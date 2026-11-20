import { CreateArticleDTO } from "../../application/dtos/articleDto.js";
import db from "./../db/test-db.js";
import type { Article } from "./../models/article.js";

export function getAllArticles(): Article[] {
  return db.prepare("SELECT * FROM articles").all() as Article[];
}

export async function createArticle(data: CreateArticleDTO): Promise<Article> {
  const articles = getAllArticles();
  const nextNumber =
    Math.max(...articles.map((a) => parseInt(a.nr, 10) || 0), 0) + 1;

  const newArticleData = {
    ...data,
    nr: String(nextNumber), // Falls 'nr' in der DB ein String ist (wegen parseInt oben)
  };

  const stmt = db.prepare(
    `INSERT INTO articles (
      nr, title, url, relevance, summary, category, published_at
    ) VALUES (
      @nr, @title, @url, @relevance, @summary, @category, @published_at
    )`,
  );
  const info = stmt.run(newArticleData);

  return {
    id: Number(info.lastInsertRowid),
    ...newArticleData,
  };
}

export function existsAttikel(url: string): boolean {
  const result = db
    .prepare("SELECT EXISTS(SELECT 1 FROM articles WHERE url = ?)")
    .pluck()
    .get(url);

  return Boolean(result);
}

export function getArticleById(id: number): Article | undefined {
  const result = db.prepare("SELECT * FROM articles WHERE id = ?").get(id) as
    | Article
    | undefined;

  return result;
}
