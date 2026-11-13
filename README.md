# 🔍 n8n Webmonitor – AI Website & Content Monitor

Vollständiges **Full-Stack-Projekt** zur Verwaltung und Anzeige von KI-bezogenen Artikeln:

- **Backend**: Fastify (Node.js/TypeScript) mit SQLite-Datenbank
- **Frontend**: Vite + TypeScript (kein Framework, vanilla Web-APIs)
- **Automation**: n8n-Workflow zum RSS-Scraping und Duplikat-Prüfung

---

## 🚀 Quick Start

### 1. Repository klonen & Dependencies installieren

```powershell
# Hauptprojekt
npm install

# Backend
cd backend && npm install
cd ..

# Frontend
cd frontend && npm install
cd ..
```

### 2. Backend starten (Terminal 1)

```powershell
cd backend
npm run build
npm start
```

Backend läuft unter: **http://localhost:3000**  
Health-Check: `curl http://localhost:3000/health`

### 3. Frontend starten (Terminal 2)

```powershell
cd frontend
npm run dev
```

Frontend läuft unter: **http://localhost:5173**

### 4. Browser öffnen

👉 **http://localhost:5173**

Fertig! Sie sehen eine Tabelle mit Artikeln, können suchen, filtern und Details anzeigen.

---

## 📋 Voraussetzungen

- **Node.js** 20+ (Fastify 5 benötigt mindestens Node.js 20)
- **npm** oder yarn
- **Visual Studio Code** (optional, aber empfohlen)

### Empfohlene VS Code Erweiterungen

```powershell
# REST Client (zum Testen von API-Endpoints)
code --install-extension humao.rest-client

# SQLite Viewer (zum Anzeigen der Datenbank)
code --install-extension alexcvzz.vscode-sqlite
```

---

## 📚 Dokumentation für Entwickler

| Dokument | Inhalt | Zeit |
| --- | --- | --- |
| **[QUICKSTART.md](./QUICKSTART.md)** | Schritt-für-Schritt Anleitung | 5 min |
| **[INDEX.md](./INDEX.md)** | Navigations-Hub für alle Docs | 2 min |
| **[frontend/README.md](./frontend/README.md)** | Frontend-Dokumentation | 10 min |
| **[frontend/ARCHITECTURE.md](./frontend/ARCHITECTURE.md)** | Frontend Code-Walkthrough | 20 min |
| **[BEST_PRACTICES.md](./BEST_PRACTICES.md)** | Design-Entscheidungen & Lessons Learned | 15 min |
| **[VERIFICATION.md](./VERIFICATION.md)** | Test-Protokoll & Verifikation | 10 min |
| **[BACKEND_IMPROVEMENTS.md](./BACKEND_IMPROVEMENTS.md)** | Optionale Backend-Verbesserungen | 10 min |

**Tipp**: Beginnen Sie mit [QUICKSTART.md](./QUICKSTART.md) oder [INDEX.md](./INDEX.md)

---

## 🏗️ Projektstruktur

## 🏗️ Projektstruktur

```
.
├── README.md                          ← Sie sind hier
├── QUICKSTART.md                      ← Start hier (5 min)
├── INDEX.md                           ← Dokumentations-Hub
├── COMPLETION_REPORT.md               ← Projekt-Status
├── BEST_PRACTICES.md                  ← Design-Entscheidungen
├── VERIFICATION.md                    ← Test-Protokoll
├── BACKEND_IMPROVEMENTS.md            ← Optionale Features
│
├── backend/                           ← 🔌 REST-API (Fastify)
│   ├── src/
│   │   ├── server.ts                  ← Fastify-Server
│   │   ├── database/db.ts             ← SQLite Anbindung
│   │   ├── routes/articleRoutes.ts    ← API-Endpunkte
│   │   ├── models/article.ts          ← Article Interface
│   │   ├── dto/articleDTO.ts          ← DTOs
│   │   └── repositories/articleRepository.ts ← Data Access Layer
│   ├── dist/                          ← Kompilierter Output
│   ├── package.json
│   ├── tsconfig.json
│   └── requests.http                  ← REST Client Beispiele
│
├── frontend/                          ← 💻 Web-UI (Vite + TS)
│   ├── src/
│   │   ├── main.ts                    ← Haupt-Logik & UI
│   │   ├── api.ts                     ← API-Kommunikation
│   │   ├── types.ts                   ← TypeScript Interfaces
│   │   ├── dateFormat.ts              ← Datumsformatierung
│   │   └── style.css                  ← Stile
│   ├── public/
│   │   └── style.css                  ← CSS für Production
│   ├── dist/                          ← Produktiver Build
│   ├── index.html                     ← HTML-Einstiegspunkt
│   ├── vite.config.ts                 ← Vite + API-Proxy
│   ├── tsconfig.json
│   ├── package.json
│   ├── README.md                      ← Frontend-Doku
│   └── ARCHITECTURE.md                ← Frontend-Architektur
│
├── n8n-workflows/                     ← 🤖 n8n Automation
│   └── webmonitor.json                ← RSS-Scraper Workflow
│
├── package.json                       ← Root Dependencies
└── node_modules/                      ← (nicht committet)
```

---

## 🔌 Backend (Fastify + SQLite)

### Start & Build

```powershell
cd backend

# Entwicklung: TypeScript Watch + Server
npm run dev      # Kompiliert & startet kontinuierlich (wenn implementiert)

# Produktion
npm run build    # Kompiliert TypeScript zu dist/
npm start        # Startet dist/server.js
```

### API-Endpunkte

| Methode | Pfad | Beschreibung | Beispiel |
| --- | --- | --- | --- |
| `GET` | `/health` | Health-Check | `curl http://localhost:3000/health` |
| `GET` | `/articles` | Alle Artikel | `curl http://localhost:3000/articles` |
| `POST` | `/articles` | Artikel erstellen | `POST` mit `{ title, url, relevance, summary, category, published_at }` |
| `GET` | `/articles/exists?url=...` | Artikel-Existenz prüfen | `curl "http://localhost:3000/articles/exists?url=https://..."` |

### Datenmodell

```typescript
interface Article {
  id: number;
  title: string;
  url: string;
  relevance: number;     // 1-10
  summary: string;       // KI-Zusammenfassung
  category: string;
  published_at: string;  // ISO-8601 Format (z.B. "2026-11-12T13:52:29.000Z")
}
```

### Technologie

| Tool | Version | Zweck |
| --- | --- | --- |
| Fastify | 5.x | HTTP-Server (schnell, leichtgewichtig) |
| TypeScript | 7.x | Typsicherheit |
| better-sqlite3 | 13.x | SQLite-Anbindung |

### Umgebungsvariablen

```powershell
# .env (optional)
PORT=3000  # Standard ist 3000
```

### REST Client Verwenden

Mit VS Code Extension `humao.rest-client`:

1. Datei [backend/requests.http](./backend/requests.http) öffnen
2. Oberhalb einer Anfrage auf "Send Request" klicken

Alternativ: `curl`, Postman, Insomnia, etc.

---

## 💻 Frontend (Vite + TypeScript)

### Start & Build

```powershell
cd frontend

# Entwicklung: Hot-Reload Server
npm run dev     # Startet Vite auf http://localhost:5173

# Produktion
npm run build   # Kompiliert & bündelt zu dist/
npm preview    # Zeigt produktiven Build lokal an
```

### Features

✅ **Artikel-Tabelle** – Titel, Kategorie, Relevanz, Datum  
✅ **Sortierung** – Nach Veröffentlichungsdatum (neueste zuerst)  
✅ **Suche** – Live-Filterung nach Titel  
✅ **Filter** – Nach Mindest-Relevanz  
✅ **Details** – Vollständige Artikelinformation  
✅ **Deutsche Formatierung** – Daten im Format `DD.MM.YYYY, HH:mm` (Europe/Berlin)  
✅ **Fehlerbehandlung** – Aussagekräftige Meldungen  
✅ **Responsive** – Mobile-freundlich  

### API-Integration

Frontend nutzt **Vite-Proxy** (Entwicklung):

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
}
```

**Effect**: Request `/api/articles` → Backend `/articles`

### Technologie

| Tool | Version | Zweck |
| --- | --- | --- |
| Vite | 6.x | Dev-Server & Build |
| TypeScript | 7.x | Typsicherheit |
| HTML5 + CSS3 | modern | Markup & Design |
| Fetch API | native | HTTP-Requests |

### Keine Frameworks!

✅ Vanilla TypeScript + HTML/CSS  
✅ Keine React, Vue, Angular Dependencies  
✅ Keine Additional Libraries  
✅ **Total Dependencies (Prod)**: 0  
✅ **Total Dependencies (Dev)**: 2 (Vite, TypeScript)  

---

## 🤖 n8n Workflow

### Setup

1. n8n starten (lokal oder Docker)
2. Workflow importieren: [n8n-workflows/webmonitor.json](./n8n-workflows/webmonitor.json)
3. Backend-Adresse konfigurieren (siehe unten)

### Backend-Adresse

Der Workflow nutzt `http://host.docker.internal:3000` (Docker Desktop).

**Für andere Setups**:
- **Lokal (n8n auf Host)**: `http://localhost:3000`
- **Netzwerk**: Dynamische IP oder DNS-Name
- **Docker Compose**: Service-Name im Netzwerk

### Workflow-Nodes

| Node | Beschreibung |
| --- | --- |
| Manual Trigger | Startet den Workflow manuell |
| HTTP Request (Health) | Prüft Backend-Verfügbarkeit |
| RSS Feed Read | Liest Hacker News RSS |
| HTTP Request (Check Exists) | Prüft Artikel-Duplikate |
| If | Entscheidet ob Artikel neu ist |

**Status**: Der Workflow ist unvollständig (endet nach If-Prüfung).

---

## 🛠️ Entwicklung

### Typisches Workflow

```powershell
# Terminal 1: Backend starten
cd backend
npm run build
npm start
# Output: "Server running on http://0.0.0.0:3000"

# Terminal 2: Frontend starten
cd frontend
npm run dev
# Output: "http://localhost:5173"

# Terminal 3: Browsertests (Optional)
# Testen Sie manuell oder nutzen Sie curl/Insomnia
curl http://localhost:3000/articles
```

### TypeScript Typ-Check

```powershell
# Backend
cd backend && npm run build   # Kompiliert & checkt Typen

# Frontend
cd frontend && npx tsc --noEmit   # Nur Typ-Check ohne Build
```

### Code Editor Setup

**VS Code Empfehlungen**:
- **TypeScript Vue Plugin (Volar)**: Für Vue-ähnliche Funktionen (optional)
- **Prettier** / **ESLint**: Für Code-Formatierung (optional)
- **REST Client**: Zum Testen der API
- **SQLite Viewer**: Zum Browsing der Datenbank

### Wo Code-Änderungen gehören

| Aufgabe | Datei | Tipps |
| --- | --- | --- |
| UI-Layout ändern | `frontend/src/main.ts` | Nur HTML/CSS Änderungen; Logik ist integriert |
| Styling anpassen | `frontend/src/style.css` | Flexbox/Grid Layout; mobile breakpoint bei 768px |
| API-Anfragen ändern | `frontend/src/api.ts` | Fetch Wrapper; nutzt Vite-Proxy |
| Typen definieren | `frontend/src/types.ts` | Interfaces für Article, API-Responses |
| Datum-Formatierung | `frontend/src/dateFormat.ts` | Intl.DateTimeFormat; Timezone `Europe/Berlin` |
| REST-Endpunkte testen | `backend/requests.http` | VS Code REST Client Syntax |
| Backend-Routen | `backend/src/routes/articleRoutes.ts` | Fastify Handler |
| Datenbank-Logik | `backend/src/repositories/articleRepository.ts` | CRUD Operations |

---

## 🐛 Troubleshooting

### Frontend zeigt keine Artikel

```powershell
# 1. Backend prüfen
curl http://localhost:3000/health
# Sollte zurückgeben: { "status": "ok" }

# 2. API-Antwort testen
curl http://localhost:3000/articles
# Sollte ein Array mit Artikeln zurückgeben

# 3. Vite-Proxy konfiguriert?
# → vite.config.ts prüfen (proxy.'/api' Sektion)

# 4. Browser-Console prüfen
# F12 → Console Tab → Fehler? (z.B. CORS, 404)
```

### Port 3000 / 5173 bereits in Verwendung

```powershell
# Port 3000 freigeben (Windows)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
# Oder:
netstat -ano | findstr :3000

# Port 5173 für Vite ändern
cd frontend
npm run dev -- --port 5174
```

### Fehler: "Cannot find module 'better-sqlite3'"

```powershell
cd backend
npm install
# Falls noch immer Fehler: npm install --build-from-source
```

### Git-Fehler beim Push

```powershell
# Sicherstellen, dass Sie auf dem richtigen Branch sind
git status
git log -1    # Letzter Commit

# Falls Branches divergiert sind
git pull origin main --rebase
git push origin <your-branch>
```

---

## 📦 Installation & Setup Details

### Abhängigkeiten pro Projekt

**Root** (`package.json`):
```json
{
  "devDependencies": {
    "fastify": "^5.x",
    "typescript": "^7.x"
  }
}
```

**Backend** (`backend/package.json`):
```json
{
  "devDependencies": {
    "typescript": "^7.x",
    "@types/node": "^20.x",
    "better-sqlite3": "^13.x"
  }
}
```

**Frontend** (`frontend/package.json`):
```json
{
  "devDependencies": {
    "vite": "^6.x",
    "typescript": "^7.x"
  }
}
```

### Windows PATH Setup für SQLite CLI

```powershell
# 1. SQLite Tools herunterladen
# https://www.sqlite.org/download.html → sqlite-tools-win-x64-*.zip

# 2. Entpacken nach C:\Tools\sqlite

# 3. PATH-Variable bearbeiten
$env:Path += ";C:\Tools\sqlite"

# 4. Testen
sqlite3 --version
```

---

## 🚀 Deployment

### Frontend (Static Files)

```powershell
cd frontend
npm run build
# Ergebnis: frontend/dist/

# Hosting-Optionen:
# - Vercel (npm run build → Deploy)
# - Netlify (Drop dist/ folder)
# - GitHub Pages (mit Actions)
# - Eigener Web-Server (nginx, Apache)
```

**Mit nginx**:
```nginx
server {
  listen 80;
  root /var/www/frontend/dist;
  index index.html;
  
  # SPA: alle nicht-Datei-Requests zu index.html
  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

### Backend (Node.js)

```powershell
cd backend
npm run build
npm start

# Mit PM2 (für Prozess-Management):
npm install -g pm2
pm2 start dist/server.js --name "webmonitor-api"
pm2 save
pm2 startup
```

### Docker Setup (Optional)

**Backend Dockerfile**:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY backend . 
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Frontend Dockerfile**:
```dockerfile
FROM node:20-alpine as builder
WORKDIR /app
COPY frontend .
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🔗 Links & Ressourcen

### Dokumentation im Projekt

| Dokument | Link | Zeit |
| --- | --- | --- |
| Schnelleinstieg | [QUICKSTART.md](./QUICKSTART.md) | 5 min |
| Frontend-Doku | [frontend/README.md](./frontend/README.md) | 10 min |
| Code-Architektur | [frontend/ARCHITECTURE.md](./frontend/ARCHITECTURE.md) | 20 min |
| Design & Learnings | [BEST_PRACTICES.md](./BEST_PRACTICES.md) | 15 min |
| Tests & Verifikation | [VERIFICATION.md](./VERIFICATION.md) | 10 min |
| Backend-Ideen | [BACKEND_IMPROVEMENTS.md](./BACKEND_IMPROVEMENTS.md) | 10 min |

### Externe Ressourcen

- [Fastify Dokumentation](https://www.fastify.io/)
- [Vite Dokumentation](https://vitejs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SQLite Dokumentation](https://www.sqlite.org/docs.html)
- [n8n Dokumentation](https://docs.n8n.io/)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

---

## ❓ FAQ

### Kann ich das Frontend-Framework wechseln?

Ja, aber:
- Behalten Sie die Vite-Proxy-Konfiguration bei
- Nutzen Sie die bestehenden `api.ts` und `types.ts` Dateien
- Passen Sie die `vite.config.ts` nach Bedarf an

### Kann ich neue Backend-Funktionen hinzufügen?

Ja! Notwendig für:
1. **Neue API-Endpunkte**: `backend/src/routes/articleRoutes.ts` erweitern
2. **Neue Typen**: `backend/src/models/article.ts` updaten
3. **Neue DB-Queries**: `backend/src/repositories/articleRepository.ts` anpassen
4. **Im Frontend aktualisieren**: `frontend/src/api.ts` und `frontend/src/types.ts`

### Wie kann ich n8n-Workflows erweitern?

n8n ist außerhalb dieses Repo-Scopes. Sie können:
- Neue HTTP-Requests an Backend-Endpunkte hinzufügen
- Workflow-Logik (If/Filter/Mapping) erweitern
- Artikel beim Backend speichern (aktuell nicht implementiert)

Siehe [BACKEND_IMPROVEMENTS.md](./BACKEND_IMPROVEMENTS.md) für Ideen.

### Kann ich die Datenbank auf PostgreSQL wechseln?

Ja, erfordert aber:
1. `backend/src/database/db.ts` neu schreiben (better-sqlite3 → pg)
2. `backend/src/repositories/articleRepository.ts` anpassen
3. Connection String in Umgebungsvariablen definieren

---

## 👥 Zusammenfassung für neue Entwickler

**Sie haben 10 Minuten Zeit?**  
→ Lesen Sie [QUICKSTART.md](./QUICKSTART.md)

**Sie müssen Code ändern?**  
→ Siehe Abschnitt "Wo Code-Änderungen gehören" (oben)

**Sie verstehen das Design nicht?**  
→ Lesen Sie [frontend/ARCHITECTURE.md](./frontend/ARCHITECTURE.md)

**Sie haben Fragen?**  
→ Siehe [FAQ](#faq) (oben) oder öffnen Sie ein Issue

---

## 📄 Lizenz

[Lizenztext hier einfügen, falls vorhanden]

---

**Zuletzt aktualisiert**: 2024-12-20  
**Projekt-Status**: ✅ Vollständig und dokumentiert
