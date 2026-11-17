import { Article } from "../../models/article.js";
import {
  createArticle,
  getArticleById,
} from "../../storages/article-storage.js";
import { articleReadRepository } from "./articleReadRepository.js";
import {
  CreateArticleDTO,
  UpdateArticleDTO,
} from "../../../application/dtos/articleDto.js";
import db from "../../db/test-db.js";

export class articleWriteRepository {
  private articles: Article[] = [];

  constructor(private articleReadRepository: articleReadRepository) {}

  create(data: CreateArticleDTO): Promise<Article> {
    return createArticle(data);
  }

  update(id: number, updatedArticle: UpdateArticleDTO): Article | undefined {
    // Prüfen, ob der Artikel überhaupt existiert
    const article = getArticleById(id);
    if (!article) {
      return undefined;
    }

    // Alte und neue Daten zusammenführen
    const mergedArticle: Article = {
      ...article,
      ...updatedArticle,
      id, // Stellt sicher, dass die ID nicht versehentlich überschrieben wird
    };

    // Änderungen in der SQLite-Datenbank speichern
    const stmt = db.prepare(`UPDATE articles
                             SET nr = @nr,
                                 url = @url,
                                 relevance = @relevance,
                                 summary = @summary,
                                 category = @category
                             WHERE id = @id`);

    stmt.run(mergedArticle);

    return mergedArticle;
  }

  delete(id: number): boolean {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index === -1) return false;
    this.articles.splice(index, 1);
    return true;
  }
}
