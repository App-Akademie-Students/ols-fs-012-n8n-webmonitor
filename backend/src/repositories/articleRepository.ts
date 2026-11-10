import { Article } from "../models/article.js";




export class ArticleRepository {
  private articles: Article[] = [];

  constructor() {
    this.articles = [
        {
          id: 1,
          title: "Sample Article",
          url: "https://example.com",
          relevance: 1
        },
        {
          id: 2,
          title: "Another Sample Article",
          url: "https://example.org",
          relevance: 2
        }


    ];
  }

  getAll(): Article[] {
    return this.articles;
  }

  getById(id: number): Article | undefined {
    return this.articles.find(article => article.id === id);
  }

  create(article:Article): Article {

    this.articles.push(article);
    return article;
  }
  update(id: number, updatedArticle: Partial<Omit<Article, "id">>): Article | undefined {
    const article = this.getById(id);
    if (!article) return undefined;
    Object.assign(article, updatedArticle);
    return article;
  }

  delete(id: number): boolean {
    const index = this.articles.findIndex(article => article.id === id);
    if (index === -1) return false;
    this.articles.splice(index, 1);
    return true;
  }
}   