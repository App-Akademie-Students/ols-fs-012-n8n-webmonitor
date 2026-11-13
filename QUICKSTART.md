# Quickstart: Frontend & Backend

## Installation (einmalig)

```powershell
# Hauptprojekt-Dependencies
npm install

# Backend-Dependencies
cd backend
npm install

# Frontend-Dependencies
cd ../frontend
npm install
```

## Entwicklung

### Terminal 1: Backend starten

```powershell
cd backend
npm run build
npm start
```

Verfügbar unter: http://localhost:3000

Health-Check: http://localhost:3000/health

### Terminal 2: Frontend starten

```powershell
cd frontend
npm run dev
```

Verfügbar unter: http://localhost:5173

Das Frontend nutzt einen Vite-Proxy, um API-Anfragen an das Backend weiterzuleiten.

## Produktion

### Backend bauen & starten

```powershell
cd backend
npm run build
npm start
```

### Frontend bauen

```powershell
cd frontend
npm run build
```

Die produktiven Dateien liegen in `frontend/dist/` und können auf einem statischen 
Web-Server (nginx, Apache, etc.) gehostet werden.

**Wichtig**: Für die Produktion muss der Web-Server einen Proxy für `/api/*` 
zum Backend konfigurieren, oder das Backend muss CORS-Headers mit der 
Frontend-Domain hinzufügen.

## API-Endpunkte

| Methode | Endpunkt | Beschreibung |
| --- | --- | --- |
| `GET` | `/health` | Health-Check |
| `GET` | `/articles` | Alle Artikel |
| `POST` | `/articles` | Artikel erstellen |
| `GET` | `/articles/exists?url=...` | Artikel-Existenz prüfen |

## Frontend-Features

✅ Artikel-Tabelle mit Sortierung (neueste zuerst)
✅ Suche nach Titel
✅ Filter nach Mindest-Relevanz
✅ Artikeldetails mit KI-Zusammenfassung
✅ Deutsche Datumformatierung (DE-Zeitzone)
✅ Fehlerbehandlung mit sinnvollen Meldungen
✅ Responsive Design (Mobile-ready)
✅ TypeScript Strict Mode

## Troubleshooting

### Frontend kann Backend nicht erreichen

**Symptom**: "Failed to fetch articles"

**Lösung**: 
1. Backend läuft auf http://localhost:3000? (`npm start` in `backend/`)
2. Health-Check: `curl http://localhost:3000/health`
3. Frontend Dev-Server nutzt Vite-Proxy in `frontend/vite.config.ts`

### TypeScript Fehler beim Build

```powershell
cd frontend
npm run build  # zeigt Fehler
```

Alle TS-Fehler müssen behoben werden (strict mode).

### Stale API-Responses

Browser-Cache löschen oder Dev-Tools öffnen (Option → Netzwerk-Cache deaktiviert).

---

**Dokumentation**: Siehe [README.md](./README.md), [backend/README.md](./backend/README.md) (implizit), 
[frontend/README.md](./frontend/README.md)
