import Fastify from "fastify";
import { articleRoutes } from "./routes/articleRoutes.js";

const port = Number(process.env.PORT ?? 3000);

const server = Fastify();

server.get("/health", async (request, reply) => {
  return { status: "ok" };
});

// Start the server
server.listen({ port }, (err, address) => {
  if (err) {
    console.error("Der Server konnte nicht gestartet werden:", err);
    process.exit(1);
  }
  console.log(`Backend läuft auf ${address}`);
});

// Register additional routes here
server.register(articleRoutes);