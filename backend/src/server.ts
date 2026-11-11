
import Fastify from "fastify";
import { articleRoutes } from "./routes/articleRoutes.js";

const port = Number(process.env.PORT ?? 3000);

const server = Fastify({ logger: true });

// Health-Check
server.get("/health", async () => {
  return { status: "ok" };
});

// Artikel-Routen registrieren
server.register(articleRoutes);

// Server starten
try {
  const address = await server.listen({
    port,
    host: "0.0.0.0" //Damit lauscht Fastify auf allen verfügbaren IPv4-Netzwerkschnittstellen des Rechners.
    //wichtig für Docker!
  });

  server.log.info(`Backend läuft auf ${address}`);
} catch (error) {
  server.log.error(error);
  process.exit(1);
}
