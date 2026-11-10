import type { CreateArticleDTO } from "../dto/createArticleDTO.js";
import type { Article } from "../models/article.js";
import { ArticleRepository } from "../repositories/articleRepository.js";
import type {FastifyInstance} from "fastify";


const articleRepository = new ArticleRepository();

export async function articleRoutes(fastify: FastifyInstance) {
  fastify.get("/articles", async (request, reply) => {
    return articleRepository.getAll();
  });


  fastify.post("/articles", async (request, reply) => {
    const article = request.body as CreateArticleDTO;
    const createdArticle = articleRepository.create(article as Article);
    reply.status(201).send(createdArticle);
  });


 
 
}