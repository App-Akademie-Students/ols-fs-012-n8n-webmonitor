import type { CreateArticleDTO } from "../dto/articleDTO.js";
import type { Article } from "../models/article.js";
import { ArticleRepository } from "../repositories/articleRepository.js";
import type { FastifyInstance } from "fastify";


const articleRepository = new ArticleRepository();

export async function articleRoutes(fastify: FastifyInstance) {
  fastify.get("/articles", async (request, reply) => {
    return articleRepository.getAll();
  });


  // fastify.post("/articles", async (request, reply) => {
  //   const article = request.body as CreateArticleDTO;
  //   const createdArticle = articleRepository.create(article as Article);
  //   reply.status(201).send(createdArticle);
  // });

  fastify.post<{ Body: CreateArticleDTO }>(
    "/articles",
    async (request, reply) => {
      const newArticle = request.body;

      if (articleRepository.exists(newArticle.url)) {
        return reply.code(409).send({
          error: "Article with this URL already exists"
        });
      }

      const createdArticle = articleRepository.create(newArticle);

      return reply.code(201).send(createdArticle);
    }
  );
  fastify.get<{ Querystring: { url: string } }>(
    "/articles/exists", 
    async (request, reply) => {
    const url = request.query.url as string;
    const exists = articleRepository.exists(url);
    return { exists };
  }); 


}