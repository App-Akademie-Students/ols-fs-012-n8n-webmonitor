# n8n Webmonitor

TypeScript-/Node.js-Backend mit Fastify sowie ein Ablageort für n8n-Workflows.

## Voraussetzungen

- Node.js 20 oder neuer und npm
- Visual Studio Code (empfohlen)

Fastify 5 setzt Node.js 20 oder neuer voraus.

## Installation

Im Projektstamm zuerst die Laufzeit- und Entwicklungsabhängigkeiten installieren:

```powershell
npm install
```

Danach TypeScript und die Node.js-Typdefinitionen für das Backend installieren:

```powershell
Set-Location backend
npm install
```

Die beiden `package.json`- und `package-lock.json`-Dateien verwalten getrennte
Abhängigkeiten: Fastify und `tsx` liegen im Projektstamm; TypeScript und
`@types/node` liegen in `backend/`.

## Backend bauen und starten

Die folgenden Befehle im Ordner `backend/` ausführen:

```powershell
npm run build
npm start
```

`npm run build` kompiliert TypeScript aus `src/` nach `dist/`. `npm start`
startet anschließend den kompilierten Server. Standardmäßig lauscht er auf
Port `3000`; ein anderer Port kann über `PORT` gesetzt werden.

Der Health-Check ist unter <http://localhost:3000/health> erreichbar.

## Verwendete Pakete und Module

| Paket/Modul | Zweck |
| --- | --- |
| TypeScript (`typescript`) | Typprüfung und Kompilierung des Backends |
| `@types/node` | TypeScript-Typdefinitionen für Node.js |
| Fastify (`fastify`) | HTTP-Server und Registrierung der API-Routen |
| `tsx` | TypeScript-Ausführung für Entwicklungszwecke; aktuell nicht in den npm-Skripten verwendet |

Die Backend-Konfiguration verwendet ES-Module (`NodeNext`), den strikten
TypeScript-Modus und `src/` als Quell- sowie `dist/` als Ausgabeordner.

## API und Quellcode

- `backend/src/server.ts` richtet Fastify ein und startet den Server.
- `backend/src/routes/articleRoutes.ts` stellt die Artikel-Routen bereit.
- `backend/src/models/article.ts` definiert das Artikel-Datenmodell.
- `backend/src/dto/createArticleDTO.ts` beschreibt die Daten zum Anlegen eines Artikels.
- `backend/src/repositories/articleRepository.ts` verwaltet Artikel derzeit im Arbeitsspeicher.

Verfügbare Beispiel-Endpunkte:

- `GET /health` – Serverstatus
- `GET /articles` – Artikel abrufen
- `POST /articles` – Artikel anlegen (JSON mit `title`, `url` und `relevance`)

Die Artikeldaten werden momentan nur im Arbeitsspeicher gehalten und gehen beim
Neustart verloren. Eine Datenbank ist noch nicht eingerichtet.

## REST Client in VS Code

Die Erweiterung **REST Client** von Huachao Mao
(`humao.rest-client`) ist optional und dient zum direkten Senden von HTTP-
Anfragen aus VS Code. Sie ist kein npm-Paket und für den Serverbetrieb nicht
erforderlich.

1. In VS Code die Erweiterung **REST Client** (`humao.rest-client`) installieren.
2. Den Server starten.
3. [`backend/requests.http`](./backend/requests.http) öffnen.
4. Über **Send Request** oberhalb einer Anfrage diese an den lokalen Server senden.

Die HTTP-Anfragen können alternativ mit einem beliebigen REST-Client oder
`curl` ausgeführt werden.

## Ordner

- `backend/` – TypeScript-Backend und seine Abhängigkeiten
- `workflows/` – vorgesehener Ablageort für n8n-Workflow-Dateien
