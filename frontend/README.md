# Frontend – AI Website & Content Monitor

Ein einfaches, übersichtliches Frontend für den **AI Website & Content Monitor** mit Vite, TypeScript und nativen Web-APIs.

## Features

- **Artikelübersicht**: Tabelle mit Titel, Kategorie, Relevanz und Veröffentlichungsdatum
- **Sortierung**: Standardmäßig nach Veröffentlichungsdatum absteigend (neueste zuerst)
- **Suche**: Nach Artikeltitel filtern
- **Relevanz-Filter**: Nach Mindest-Relevanzwert filtern
- **Artikeldetails**: Beim Anklicken einer Tabellenzeile werden vollständige Details angezeigt
  - Vollständiger Titel
  - Kategorie und Relevanz
  - Veröffentlichungsdatum (deutsche Formatierung, Zeitzone `Europe/Berlin`)
  - Vollständige KI-Zusammenfassung
  - Link zum Originalartikel
- **Aktualisieren**: Button zum Neu-Laden der Artikel
- **Fehlerbehandlung**: Aussagekräftige Fehlermeldungen bei API-Problemen

## Technologie

- **Vite 6** – Schneller Dev-Server und Build-Tool
- **TypeScript 7** – Sichere Typisierung
- **HTML & CSS** – Natives Web-Markup, kein Framework
- **Fetch API** – Native API-Kommunikation
- **Intl.DateTimeFormat** – Sprachengerechte Datumformatierung

## Installation

### 1. Abhängigkeiten installieren

```powershell
cd frontend
npm install
```

### 2. Backend starten (erforderlich)

Das Frontend benötigt das laufende Backend unter `http://localhost:3000`:

```powershell
cd backend
npm run build
npm start
```

## Entwicklung

```powershell
cd frontend
npm run dev
```

Das Frontend läuft dann unter **http://localhost:5173**.

Der Vite-Proxy leitet Anfragen mit `/api`-Präfix an `http://localhost:3000` weiter und entfernt dabei den Präfix, sodass die API-URLs im Frontend relativ sind: `/api/articles` → `http://localhost:3000/articles`.

## Produktion

### Build

```powershell
cd frontend
npm run build
```

Das Ergebnis ist im Verzeichnis `dist/` enthalten und kann auf jedem statischen Web-Server gehostet werden.

### Deployment

Die produktive `dist/index.html` referenziert die API über `/api/articles`. Für den produktiven Betrieb muss der Web-Server einen ähnlichen Proxy konfigurieren, der `/api` an das Backend weiterleitet, oder das Backend muss mit CORS aktiviert werden.

## API-Integration

Das Frontend kommuniziert mit folgenden Endpoints:

| Methode | Endpunkt | Beschreibung |
| --- | --- | --- |
| `GET` | `/articles` | Alle Artikel laden |

**Proxy-Konfiguration** (`vite.config.ts`):
```typescript
proxy: {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ''),
  },
},
```

## Datumformatierung

Alle `published_at`-Werte aus der Datenbank (ISO-8601-Format, z.B. `2026-11-12T13:52:29.000Z`) werden im deutschen Format angezeigt:

**Format:** `DD.MM.YYYY, HH:mm` (z.B. `12.11.2026, 14:52`)

- Zeitzone: `Europe/Berlin`
- Ungültige/leere Datumswerte: `–`
- Diese ungültigen Werte werden beim Sortieren ans Ende gestellt

## Projektstruktur

```
frontend/
├── public/
│   └── style.css          # Globale Stile
├── src/
│   ├── main.ts            # Haupt-Anwendungslogik
│   ├── api.ts             # API-Kommunikation
│   ├── types.ts           # TypeScript-Interfaces
│   ├── dateFormat.ts      # Datumformatierung
│   └── style.css          # (gelöschte Kopie, wird nicht mehr verwendet)
├── index.html             # HTML-Einstiegspunkt
├── vite.config.ts         # Vite-Konfiguration mit Proxy
├── tsconfig.json          # TypeScript-Konfiguration
└── package.json           # npm-Abhängigkeiten
```

## Besonderheiten

- **Kein Framework**: Pure HTML, CSS und Fetch API
- **Minimal Dependencies**: Nur Vite und TypeScript als Build-Tools
- **Keine Mock-Daten**: Alle Daten stammen vom Backend
- **Fehlerfreundlich**: Sinnvolle Fehlermeldungen und Graceful Degradation
- **Responsive Design**: Mobile-freundliches Layout
- **Barrierefreiheit**: Semantisches HTML, Keyboard-Navigation

## TypeScript Checks

```powershell
npm run build  # TypeScript-Check und Vite-Build
```

Alle TypeScript-Fehler müssen vor dem Build behoben werden (`strict: true`).

## Lizenz

Teil des n8n Webmonitor Projekts.
