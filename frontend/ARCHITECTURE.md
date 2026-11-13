# Frontend-Implementierung: Übersicht & Architektur

## 📋 Zusammenfassung

Das Frontend ist eine **minimalistische Web-Anwendung** (keine Frameworks), die 
Artikel aus dem Backend anzeigt und filterbar macht. Gebaut mit:

- **Vite 6** (Dev-Server, Build-Tool)
- **TypeScript 7** (Typsicherheit)
- **HTML5 + CSS3** (Semantische Struktur, Responsive Design)
- **Fetch API** (Native HTTP-Kommunikation)

**Gesamter Frontend-Code**: ~5 KB TypeScript + ~4.5 KB CSS

## 🎯 Anforderungen & Umsetzung

| Anforderung | Umsetzung | Status |
| --- | --- | --- |
| Artikel über GET /articles laden | `fetchArticles()` in `api.ts` | ✅ |
| Tabelle mit Artikel-Metadaten | HTML `<table>`, React-lose Rendering | ✅ |
| Sortierung nach `published_at` absteigend | `filterAndSort()` in `main.ts` | ✅ |
| Suche nach Titel | Input-Field mit live Filtering | ✅ |
| Filter nach Min-Relevanz | Number-Input, live Filter | ✅ |
| Artikeldetails beim Klick | Reihe unter Tabelle, Scrollable | ✅ |
| Datumformatierung (DE, Europe/Berlin) | `formatDate()` in `dateFormat.ts` | ✅ |
| Fehlende Daten als `–` | Null/Undefined-Check in `formatDate()` | ✅ |
| Vite-Proxy für `/api` | `vite.config.ts` mit `changeOrigin` | ✅ |
| Keine unnötigen Dependencies | Nur `vite`, `typescript` als DevDeps | ✅ |
| TypeScript-Build prüfung | `npm run build` mit `strict: true` | ✅ |

## 📁 Projektstruktur

```
frontend/
├── index.html                 # Einstiegspunkt (HTML nur Struktur, kein Inline-JS)
├── vite.config.ts             # Vite-Konfiguration + API-Proxy
├── tsconfig.json              # TypeScript-Konfiguration (strict mode)
├── package.json               # npm-Abhängigkeiten
├── .gitignore                 # Git-Ausschlüsse
├── README.md                  # Frontend-Dokumentation
│
├── src/                       # TypeScript-Quellcode
│   ├── main.ts                # Haupt-App-Logik (UI-Rendering, Event-Handler)
│   ├── api.ts                 # API-Kommunikation (fetchArticles)
│   ├── types.ts               # TypeScript Interfaces (Article)
│   ├── dateFormat.ts          # Datumformatierung (formatDate, Intl.DateTimeFormat)
│   ├── style.css              # Globale Styles (wird von main.ts nicht mehr importiert)
│   └── *.js                   # (generiert von tsc, in .gitignore)
│
├── public/                    # Statische Assets
│   └── style.css              # Wird vom Vite in dist/ kopiert
│
└── dist/                      # Produktiver Build (generiert von `npm run build`)
    ├── index.html             # Optimierte HTML
    ├── style.css              # Gelinkte CSS
    └── assets/index-*.js      # Gebundeltes & minifiziertes JavaScript
```

## 🔄 Datenfluss

```
User (Browser)
    ↓
    ↓ Klick "Aktualisieren"
    ↓
main.ts: loadArticles()
    ↓
api.ts: fetchArticles()
    ↓ (Vite Proxy)
Vite Dev-Server
    ↓ (rewrite /api → /)
Backend (http://localhost:3000)
    ↓
GET /articles
    ↓
SQLite Database
    ↓
JSON Array [Article]
    ↓
    ↓ (response)
Vite Dev-Server
    ↓
api.ts: return JSON
    ↓
main.ts: renderTable(articles)
    ↓
DOM: <table> mit Zeilen
    ↓
Browser: HTML-Rendering
    ↓
User sieht Tabelle
```

## 🎨 UI-Komponenten

### Kopfzeile (`<header>`)
- Titel und Beschreibung
- Sichtbar auf allen Breakpoints

### Kontrollleiste (`.controls`)
- **Suchfeld**: Input `#search` (Text)
- **Min-Relevanz-Filter**: Input `#min-relevance` (Number)
- **Aktualisieren-Button**: Button `#refresh-btn`
- **Status-Nachricht**: Div `#status` (dynamisch)

### Artikel-Tabelle (`<table>`)
- **Header**: Titel | Kategorie | Relevanz | Veröffentlicht
- **Zeilen**: Klickbar, aktive Zeile wird hervorgehoben
- **Responsive**: Auf mobilen Geräten gestapelt

### Artikel-Details (`#article-details`)
- Vollständiger Titel
- Meta-Informationen (Kategorie, Relevanz, Datum)
- KI-Zusammenfassung (mehrzeilig, Word-Wrap)
- Externer Link zum Originalartikel

## 🔧 Wichtige Funktionen

### `formatDate(dateStr: string): string`
```typescript
// Input: "2026-11-12T13:52:29.000Z"
// Output: "12.11.2026, 14:52" (Zeitzone Europe/Berlin)
// Falls null/invalid: "–"
```

### `filterAndSort(articles: Article[]): Article[]`
- Filtert nach Suchtext (Titel, case-insensitive)
- Filtert nach Min-Relevanz
- Sortiert nach `published_at` DESC
- Ungültige Daten ans Ende

### `renderTable(articles: Article[]): void`
- Löscht alte Tabellen-Zeilen
- Rendering neuer Zeilen mit Event-Listenern
- Click-Handler registriert

### `renderDetails(article: Article): void`
- Rendert HTML mit Artikel-Informationen
- XSS-Protection durch `escapeHtml()`
- Link ist `target="_blank"` für Sicherheit

## 📡 API-Integration

### Vite Proxy (vite.config.ts)

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
},
```

**Effekt**:
- Frontend-Request: `GET /api/articles`
- Vite leitet weiter zu: `GET http://localhost:3000/articles`
- Response wird zurück zum Frontend gesendet

### Fetch-Aufruf (api.ts)

```typescript
fetch('/api/articles')
  .then(res => res.json())
  .catch(error => { /* Handler */ })
```

**Error-Handling**:
- HTTP-Fehler (4xx, 5xx): `response.ok` prüft
- Netzwerkfehler: `.catch()` fängt Exceptions
- Status-UI zeigt Fehler an

## 🎯 Besonderheiten & Learnings

### 1. Keine Frontend-Frameworks
- **Vorteil**: Minimal Dependencies, schneller Build, einfach zu verstehen
- **Nachteil**: Kein automatisches Re-Rendering, manuelle DOM-Manipulation
- **Lösung**: Explizit Daten ↔ DOM Synchronisation in `renderTable()` / `renderDetails()`

### 2. TypeScript Strict Mode
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true
}
```
- Erfordert explizite Fehlerbehandlung
- Verhindert `undefined` Bugs
- Build bricht bei Fehlern ab (gewünscht für CI/CD)

### 3. Intl.DateTimeFormat für Sprachgerechte Formatierung
```typescript
new Intl.DateTimeFormat('de-DE', {
  timeZone: 'Europe/Berlin',
  year: 'numeric',
  month: '2-digit',
  // ...
}).formatToParts(date)
```
- Kein `moment.js` oder `date-fns` nötig
- Browser-native API
- Unterstützt beliebige Sprachen & Zeitzonen

### 4. XSS-Protection durch HTML-Escaping
```typescript
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;  // Browser escaped automatisch
  return div.innerHTML;
}
```
- Verhindert Injection von Script-Tags
- Simpler als Regex-basiertes Escaping

### 5. CSS Responsive Design
- Mobile-first Approach
- Grid für Meta-Informationen
- Flexbox für Kontrollleiste
- `@media (max-width: 768px)` für Anpassungen

## 🧪 Testing

### Manuelles Testen

1. Backend starten: `cd backend && npm start`
2. Frontend starten: `cd frontend && npm run dev`
3. Browser öffnen: http://localhost:5173
4. Szenarien testen:
   - **Laden**: Artikel sollten sofort angezeigt werden
   - **Suche**: "Claude" eingeben → filtert Titel
   - **Relevanz**: Min-Relevanz auf 5 setzen → weniger Artikel
   - **Klick**: Tabellenzeile klicken → Details anzeigen
   - **Datum**: Format sollte `DD.MM.YYYY, HH:mm` sein
   - **Fehler**: Backend stoppen → "Fehler: Fehler beim Abrufen..." anzeigen

### TypeScript Checks

```powershell
npm run build
```

Muss ohne Fehler durchlaufen.

## 📦 Build-Artifacts

```powershell
npm run build
```

Erzeugt in `dist/`:
- `index.html` – Optimiert, mit Hash-gekoppeltem Script
- `assets/index-*.js` – Minifiziert, Tree-Shaked
- `style.css` – Aus `public/style.css` kopiert

**Größe**: ~5-6 KB gzip (HTML + JS + CSS zusammen)

## 🚀 Deployment

### Entwicklung
```powershell
npm run dev  # Vite Dev-Server mit HMR
```

### Produktion
```powershell
npm run build
# → dist/ ist bereit für statischen Web-Server (nginx, Apache, S3, Vercel, etc.)
```

**Wichtig**: Backend-Proxy muss konfiguriert sein!

```nginx
# nginx Beispiel
location /api/ {
  proxy_pass http://localhost:3000/;
  proxy_set_header Host $host;
}
```

## 📚 Referenzen

- [Vite Docs](https://vitejs.dev/)
- [TypeScript Docs](https://www.typescriptlang.org/)
- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN: Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
- [MDN: XSS Prevention](https://developer.mozilla.org/en-US/docs/Glossary/Cross_Site_Scripting_(XSS))

## 📝 Lizenz

Teil des n8n Webmonitor Projekts.
