import { Article } from "../models/article.js";
// Data Transfer Object for creating a new article, excluding the "id" field.
export type CreateArticleDTO = Omit<Article, "id"> ;
export type UpdateArticleDTO = Partial<CreateArticleDTO>;
