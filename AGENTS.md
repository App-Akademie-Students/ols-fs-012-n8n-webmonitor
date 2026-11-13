
# Vibe-Coding-Regeln

## Geltungsbereich
Diese Regeln zur Protokollierung gelten ausschließlich,
wenn ein KI-Agent selbstständig Frontend-Code
implementiert oder funktional verändert.

Keine Protokollierung bei:
- Änderungen am Backend oder an n8n-Workflows
- Reinen Fragen oder Codeanalysen
- Manuell vorgenommenen Änderungen

## Protokollierung
Pflege nach abgeschlossenen Frontend-Änderungen
die Datei `frontend/protokoll.md`.

Dokumentiere ausschließlich wesentliche,
tatsächlich implementierte Funktionen.

Kategorien:
- Business: Fachliche Funktionen und Regeln
- View: Darstellung, Interaktionen und Filter
- Webdesign: Layout, Design und Responsivität
- Integration: API-Kommunikation und Datenverarbeitung

Regeln:
- Kurz und verständlich dokumentieren
- Pro Funktion maximal 1–2 Sätze
- Bestehende Einträge aktualisieren
- Keine technischen Kleinschritte protokollieren
- Keine Chronologie oder Tätigkeitsberichte
- Keine geplanten Funktionen als umgesetzt darstellen

## Entwicklungsprinzipien
- Einfache, nachvollziehbare Lösungen bevorzugen
- Unnötige Abstraktionen und Abhängigkeiten vermeiden
- Bestehende Architektur berücksichtigen
- Keine Änderungen außerhalb des beauftragten Bereichs
