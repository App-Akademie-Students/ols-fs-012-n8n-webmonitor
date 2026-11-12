import { CreateArticleDTO, UpdateArticleDTO } from "../dto/articleDTO.js";
import { Article } from "../models/article.js";

import db from "../database/db.js";




export class ArticleRepository {
  private articles: Article[] = [];

  // constructor() {
  //   this.articles = [
  //     {
  //       id: 1,
  //       title: "Sample Article",
  //       url: "https://example.com/article1",
  //       relevance: 1,
  //       summary: "Sample summary",
  //       category: "Sample category"
  //     },
  //     {
  //       id: 2,
  //       title: "Another Sample Article",
  //       url: "https://example.org/article2",
  //       relevance: 2,
  //       summary: "Another sample summary",
  //       category: "Another sample category"
  //     }

  //   ];
  // }


  // getAll(): Article[] {
  //   return this.articles;
  // }
  getAll(): Article[] {
    return db.prepare("SELECT * FROM articles").all() as Article[];
  }

  // create(data: CreateArticleDTO): Article {
  //   const article: Article = {
  //     ...data,
  //     id: Date.now(),
   
  //   };

  //   this.articles.push(article);
  //   return article;
  // }

  create(data: CreateArticleDTO): Article { 
    const stmt = db.prepare("INSERT INTO articles (url, relevance, summary, category) VALUES (@title, @relevance, @summary, @category)");
    const info = stmt.run(data  );
    return {
      id: info.lastInsertRowid as number,
      ...data
    };
  }
  // exists(url: string): boolean {
  //   return this.articles.some(article => article.url === url);
  // }
exists(url: string): boolean {
  return db.prepare("SELECT 1  FROM articles WHERE url = ?").get(url) != undefined;
  
}




  // getById(id: number): Article | undefined {
  //   return this.articles.find(article => article.id === id);
  // }


  // update(id: number, updatedArticle: UpdateArticleDTO): Article | undefined {
  //   const article = this.getById(id);
  //   if (!article) return undefined;
  //   Object.assign(article, updatedArticle);
  //   return article;
  // }

  // delete(id: number): boolean {
  //   const index = this.articles.findIndex(article => article.id === id);
  //   if (index === -1) return false;
  //   this.articles.splice(index, 1);
  //   return true;
  // }
}   