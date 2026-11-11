import { CreateArticleDTO, UpdateArticleDTO } from "../dto/articleDTO.js";
import { Article } from "../models/article.js";




export class ArticleRepository {
  private articles: Article[] = [];

  constructor() {
    this.articles = [
      {
        id: 1,
        title: "Sample Article",
        url: "https://example.com/article1",
        relevance: 1
      },
      {
        id: 2,
        title: "Another Sample Article",
        url: "https://example.org/article2",
        relevance: 2
      }

    ];
  }

  getAll(): Article[] {
    return this.articles;
  }


  create(data: CreateArticleDTO): Article {
    const article: Article = {
      ...data,
      id: Date.now(),
   
    };

    this.articles.push(article);
    return article;
  }


  exists(url: string): boolean {
    return this.articles.some(article => article.url === url);
  }

  getById(id: number): Article | undefined {
    return this.articles.find(article => article.id === id);
  }


  update(id: number, updatedArticle: UpdateArticleDTO): Article | undefined {
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