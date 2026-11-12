# n8n Webmonitor

Dieses Projekt besteht aus einem TypeScript-/Node.js-Backend zur Verwaltung von
Artikeln und einem exportierten n8n-Workflow, der RSS-Artikel abruft und beim
Backend auf Duplikate prüft.

## Voraussetzungen

- Node.js 20 oder neuer und npm (Fastify 5 benötigt Node.js 20+)
- Visual Studio Code (optional, für REST Client und SQLite Viewer)
- Eine n8n-Instanz, wenn der Workflow ausgeführt werden soll

## Verwendete Erweiterungen, Nodes und Pakete

### VS Code

- **REST Client** (`humao.rest-client`) von Huachao Mao – optionale VS-Code-
  Erweiterung zum Senden der Beispielanfragen aus `backend/requests.http`.
  Sie ist nicht für den Betrieb des Backends erforderlich.
- **SQLite Viewer** von Florian Klampfer ist in VS Code installiert.
  Die Erweiterung dient zum Anzeigen von SQLite-Datenbankdateien.
- Im Repository ist keine `devcontainer`-Konfiguration hinterlegt.

Installation in VS Code: in der Erweiterungsansicht nach **REST Client** suchen
und die Erweiterung von Huachao Mao installieren. Alternativ im Terminal:

```powershell
code --install-extension humao.rest-client
```

Für SQLite Viewer in der Erweiterungsansicht nach **SQLite Viewer** suchen
und die Erweiterung von **Florian Klampfer** auswählen.

### SQLite

Wir verwenden **SQLite** als Datenbank im Projekt. Datenbankdateien können
mit der installierten VS-Code-Erweiterung **SQLite Viewer** geöffnet werden.

Der eingecheckte Backend-Code ist derzeit noch nicht an SQLite angebunden:
`ArticleRepository` hält die Artikel in einem Array im Arbeitsspeicher.
Im Repository sind noch kein SQLite-Treiber, kein Datenbankschema und keine
Datenbankdatei hinterlegt. Ein Dateipfad sowie Schritte zur Initialisierung
der SQLite-Datenbank sind daher noch nicht dokumentierbar.

#### SQLite-Kommandozeilentools unter Windows installieren

1. Die [offizielle SQLite-Downloadseite](https://www.sqlite.org/download.html)
   öffnen und unter **Precompiled Binaries for Windows** das zur
   Rechnerarchitektur passende **sqlite-tools**-ZIP herunterladen
   (für Windows auf x64: `sqlite-tools-win-x64-*.zip`).
2. Das ZIP beispielsweise nach `C:\Tools\sqlite` entpacken. Die Datei
   `sqlite3.exe` muss direkt in diesem Ordner liegen.
3. Diesen Ordner zur Benutzer-Umgebungsvariable `Path` hinzufügen:
   in Windows nach **Umgebungsvariablen für dieses Konto bearbeiten** suchen,
   unter **Benutzervariablen** den Eintrag **Path** bearbeiten und über **Neu**
   `C:\Tools\sqlite` ergänzen.
4. VS Code beziehungsweise PowerShell neu starten und die Installation prüfen:

   ```powershell
   sqlite3 --version
   ```

Wenn eine Versionsnummer ausgegeben wird, sind die Kommandozeilentools verfügbar.
Ohne `Path`-Eintrag lässt sich die Prüfung auch mit
`C:\Tools\sqlite\sqlite3.exe --version` ausführen.

SQLite benötigt keinen separat laufenden Datenbankserver. Die Kommandozeilentools
werden unabhängig von der VS-Code-Erweiterung SQLite Viewer installiert;
die Anbindung des Backends muss zusätzlich im Code umgesetzt werden.

### n8n-Workflow

`n8n-workflows/webmonitor.json` verwendet die mit n8n gelieferten Standard-Nodes;
zusätzliche Community-Nodes sind nicht erforderlich:

| Node | Verwendung |
| --- | --- |
| Manual Trigger | Startet den Workflow manuell über „Execute workflow“. |
| HTTP Request | Prüft zuerst den Backend-Endpunkt `/health`. |
| RSS Feed Read | Liest den Hacker-News-RSS-Feed `https://news.ycombinator.com/rss`. |
| HTTP Request („Check Article Exists“) | Fragt `/articles/exists` mit der URL des RSS-Artikels ab. |
| If | Prüft, ob der Artikel noch nicht existiert. |

Der Workflow ist derzeit inaktiv und endet am `If`-Node. Er speichert neue
Artikel noch nicht im Backend.

### npm-Abhängigkeiten

Die Abhängigkeiten sind in zwei npm-Projekten getrennt und müssen jeweils
installiert werden:

| Paket | Manifest | Zweck |
| --- | --- | --- |
| `fastify` | `package.json` im Projektstamm | HTTP-Server und API-Routen |
| `tsx` | `package.json` im Projektstamm | TypeScript-Ausführung für Entwicklung; derzeit nicht in den npm-Skripten verwendet |
| `typescript` | `backend/package.json` | Typprüfung und Kompilierung |
| `@types/node` | `backend/package.json` | TypeScript-Typdefinitionen für Node.js |

## Installation

Die Befehle in PowerShell ausführen. Zuerst werden die Abhängigkeiten im
Projektstamm installiert, danach die des Backends:

```powershell
npm install
Set-Location backend
npm install
```

Die beiden `package.json`- und `package-lock.json`-Dateien verwalten jeweils
ihre eigene Abhängigkeitsinstallation.

## Backend bauen und starten

Im Ordner `backend/`:

```powershell
npm run build
npm start
```

Der Build kompiliert TypeScript aus `src/` nach `dist/`; `npm start` startet
anschließend `dist/server.js`. Standardmäßig läuft der Server auf Port `3000`.
Ein anderer Port kann über die Umgebungsvariable `PORT` gesetzt werden. Der
Server bindet an `0.0.0.0`, damit er auch aus einem Container erreichbar sein
kann.

Der Health-Check ist unter <http://localhost:3000/health> erreichbar.

## REST-Anfragen mit VS Code senden

1. REST Client wie oben beschrieben installieren.
2. Das Backend starten.
3. [`backend/requests.http`](./backend/requests.http) in VS Code öffnen.
4. Über **Send Request** oberhalb einer Anfrage den Aufruf ausführen.

Alternativ können die Endpunkte mit jedem anderen REST-Client oder `curl`
aufgerufen werden.

## n8n-Workflow importieren und ausführen

1. Das Backend starten und sicherstellen, dass `GET /health` erfolgreich ist.
2. In der n8n-Oberfläche den Workflow aus
   [`n8n-workflows/webmonitor.json`](./n8n-workflows/webmonitor.json)
   importieren.
3. Den Workflow manuell mit **Execute workflow** starten.

Der Workflow verwendet `http://host.docker.internal:3000` für Anfragen an das
Backend, was für n8n in Docker Desktop den Zugriff auf den Host-Rechner
ermöglicht. Läuft n8n nicht in einem Docker-Container, muss diese Adresse in
den HTTP-Request-Nodes gegebenenfalls durch `http://localhost:3000` ersetzt
werden. Bei anderen Container- oder Netzwerk-Konfigurationen ist eine vom
n8n-Prozess erreichbare Backend-Adresse einzutragen.

## API und Datenhaltung

| Methode und Pfad | Beschreibung |
| --- | --- |
| `GET /health` | Liefert `{ "status": "ok" }`. |
| `GET /articles` | Gibt alle Artikel zurück. |
| `POST /articles` | Legt einen Artikel mit `title`, `url` und `relevance` an; bei gleicher URL wird `409 Conflict` zurückgegeben. |
| `GET /articles/exists?url=<URL>` | Prüft, ob ein Artikel mit der URL vorhanden ist und liefert `{ "exists": true/false }`. |

Die Artikel werden aktuell in einem In-Memory-Repository gehalten. Beim Start
werden zwei Beispieldatensätze angelegt; Änderungen gehen beim Neustart
verloren. Die im Projekt verwendete SQLite-Datenbank ist in diesem Backend-Stand
noch nicht angebunden (siehe Abschnitt „SQLite“).

## Projektstruktur

- `backend/` – TypeScript-Backend, npm-Abhängigkeiten und HTTP-Beispiele
- `backend/src/server.ts` – Fastify-Server und Health-Check
- `backend/src/routes/articleRoutes.ts` – Artikel-Endpunkte
- `backend/src/models/article.ts` und `backend/src/dto/articleDTO.ts` – Datenmodell und DTOs
- `backend/src/repositories/articleRepository.ts` – In-Memory-Datenhaltung
- `n8n-workflows/` – exportierte n8n-Workflows
