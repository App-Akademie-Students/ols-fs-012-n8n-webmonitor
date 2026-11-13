# Empfehlungen für Backend-Anpassungen

Das Frontend funktioniert mit der aktuellen Backend-API vollständig. Die folgenden 
Hinweise sind optional und können zukünftige Verbesserungen unterstützen.

## 1. CORS-Support (für separate Deployments)

**Szenario**: Frontend und Backend laufen auf verschiedenen Domains/Ports in Produktion.

**Aktueller Status**: Funktioniert in Entwicklung über Vite-Proxy; in Produktion 
müsste der Web-Server einen Reverse-Proxy aufsetzen.

**Optional**: CORS im Backend aktivieren:

```typescript
// backend/src/server.ts
import cors from '@fastify/cors';

server.register(cors, {
  origin: ['https://example.com', 'http://localhost:3000'],
  credentials: true
});
```

**Abhängigkeit hinzufügen**:
```powershell
cd backend
npm install @fastify/cors
```

**Vorteil**: Frontend und Backend können unabhängig gehostet werden.

---

## 2. API-Pagination (für große Datenmengen)

**Szenario**: Irgendwann gibt es hunderte oder tausende Artikel.

**Aktueller Status**: `GET /articles` gibt alle Artikel zurück.

**Optional**: Pagination hinzufügen:

```typescript
fastify.get<{ Querystring: { page: string; limit: string } }>(
  "/articles",
  async (request, reply) => {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 20;
    const offset = (page - 1) * limit;
    
    return articleRepository.getPaginated(offset, limit);
  }
);
```

**Frontend-Anpassung**: Würde erfordern, dass das Frontend "Mehr laden" oder 
Seitennummerierung implementiert.

---

## 3. Sortierungs-API (Server-seitig)

**Szenario**: Bei großen Datenmengen ist Client-seitiges Sortieren ineffizient.

**Aktueller Status**: Frontend sortiert lokal im Browser.

**Optional**: Query-Parameter für Sortierung:

```typescript
fastify.get<{ 
  Querystring: { sortBy?: string; order?: 'asc' | 'desc' } 
}>(
  "/articles",
  async (request, reply) => {
    return articleRepository.getAll({
      sortBy: request.query.sortBy || 'published_at',
      order: request.query.order || 'desc'
    });
  }
);
```

**Vorteil**: Bessere Performance bei großen Datenmengen.

---

## 4. Suchfunktion auf Server-Seite

**Szenario**: Volltextsuche über viele Artikel.

**Aktueller Status**: Frontend filtert lokal (`title.includes(...)`).

**Optional**: Such-Endpoint:

```typescript
fastify.get<{ Querystring: { q: string } }>(
  "/articles/search",
  async (request, reply) => {
    const query = request.query.q;
    return articleRepository.search(query);
  }
);
```

**SQLite-Hinweis**: Kann mit FTS5 (Full Text Search) optimiert werden.

---

## 5. Kaching-Header

**Szenario**: Performance optimieren, API-Lasten reduzieren.

**Aktueller Status**: Keine Cache-Header.

**Optional**: Cache-Control hinzufügen:

```typescript
fastify.get("/articles", async (request, reply) => {
  reply.header('Cache-Control', 'public, max-age=300'); // 5 Minuten
  return articleRepository.getAll();
});
```

**Vorteil**: Browser und CDNs können Responses cachen.

---

## 6. Datenbankoptimierung

**Status**: SQLite wird bereits verwendet (siehe `backend/src/database/db.ts`).

**Optional**: 
- Indizes auf `published_at` und `url` für schnellere Queries
- Regelmäßige Datenbank-Vacuuming für große Datenmengen
- Archivierung alter Artikel

---

## 7. Authentifizierung (für zukünftige Admin-Funktionen)

**Szenario**: Wenn Artikel manuell hinzugefügt/gelöscht werden sollen.

**Aktueller Status**: Keine Authentifizierung (POST ist offen).

**Optional**: 
- JWT-Token oder API-Keys für POST/DELETE
- Role-Based Access Control (RBAC) für Admin-Operationen

---

## 8. API-Versionierung

**Aktueller Status**: `/articles`, `/health` ohne Versionspräfix.

**Optional**: `/api/v1/articles` für zukünftige Abwärtskompatibilität.

---

## Priorisierung

Wenn Zeit begrenzt ist, würden diese Anpassungen den größten Nutzen bringen:

1. **CORS** (1-2h) – Notwendig, wenn Frontend und Backend separat deployed werden
2. **Pagination** (3-4h) – Wenn Datenmenge > 1000 Artikel
3. **Suchfunktion Server-Seite** (2-3h) – Für bessere Performance bei vielen Artikeln
4. **Kaching-Header** (30min) – Einfach, großer Performance-Gewinn

Die anderen Punkte sind langfristige Verbesserungen ohne unmittelbare Auswirkungen 
auf die aktuelle Funktionalität.

---

**Hinweis**: Das Frontend wurde ohne diese Anpassungen entwickelt und funktioniert 
vollständig mit der aktuellen API. Diese Empfehlungen sind Optionen für zukünftige 
Skalierbarkeit und Performance.
