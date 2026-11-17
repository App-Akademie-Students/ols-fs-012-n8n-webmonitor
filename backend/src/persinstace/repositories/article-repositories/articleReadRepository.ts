import { Article } from "../../models/article.js";
import {
  existsAttikel,
  getAllArticles,
  getArticleById,
} from "../../storages/article-storage.js";

export class articleReadRepository {
  //private articles: Article[] = [];
  constructor() {
    //this.articles = articleStorage;
  }

  exists(url: string): boolean {
    return existsAttikel(url);
  }

  getAll(): Article[] {
    return getAllArticles();
  }

  getById(id: number): Article | undefined {
    return getArticleById(id);
  }
}
