import type { CreateArticleDTO } from "../../application/dtos/articleDto.js";
import type { Article } from "../../persinstace/models/article.js";
import{articleReadRepository} from "../../persinstace/repositories/article-repositories/articleReadRepository.js";
import{articleWriteRepository} from "../../persinstace/repositories/article-repositories/articleWriteRepository.js";
import type {FastifyInstance} from "fastify";


const articleRRepository = new articleReadRepository();
const articleWRepository = new articleWriteRepository(articleRRepository);


export async function articleEndpoints(fastify: FastifyInstance) {
  fastify.get("/articles", async (request, reply) => {
    return articleRRepository.getAll();
  });


  fastify.post<{ Body: CreateArticleDTO }>(
    "/articles", 
    async (request, reply) => {
      const article: CreateArticleDTO =
        typeof request.body === "string"
                  ? JSON.parse(request.body)
                  : request.body;
    if(articleRRepository.exists(article.url)){
      return reply.status(409).send({ error: "Article with this URL already exists" });
    }
    const createdArticle = articleWRepository.create(article as Article);
    reply.status(201).send(createdArticle);
  }); 

  fastify.get<{ Querystring: { url: string } }>(
    "/articles/exists", 
    async (request, reply) => {
      
    if (!request.query.url) {
      return reply.status(400).send({ error: "URL query parameter is required" });
    }  

    const url = request.query.url as string;
    const exists = articleRRepository.exists(url);

    return { exists };
  }); 
}
