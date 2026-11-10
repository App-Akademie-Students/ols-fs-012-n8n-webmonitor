import { Article } from "../models/article.js";
// Data Transfer Object for creating a new article, excluding the "id" field.
export interface CreateArticleDTO extends Omit<Article, "id"> {}