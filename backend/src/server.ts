import Fastify from "fastify";
import { articleEndpoints } from "./presenter/endpoints/article-endpoints.js";
const port = Number(process.env.PORT ?? 3000);

const server = Fastify();

server.get("/health", async (request, reply) => {
  return { status: "ok" };
});

// Register additional routes here
server.register(articleEndpoints);

// Start the server
try {
  const address = await server.listen({ 
    port, 
    host: "0.0.0.0" //Damit lauscht Fastify auf allen verfügbaren IPv4-Netzwerkschnittstellen des Rechners.
    //wichtig für Docker!
   });
  console.log(`Der Backend läuft auf ${address}`);
}catch (err) {
  console.error("Error starting server:", err);
  process.exit(1);
}