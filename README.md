# Court Notes — Basketball Playbook

Ein responsives Playbook für Basketball-Coaches und Teams. Die Seite basiert auf React, TypeScript und Vite und kommt ohne zusätzliche Laufzeit-Abhängigkeiten aus.

## Entwicklung

```powershell
npm install
npm run dev
```

Vite zeigt nach dem Start die lokale Adresse an und aktualisiert die Seite beim Speichern.

## Funktionen

- Basketball-Spielzüge für Offense, Defense, ATO und Transition
- Durchsuchbare und filterbare Play-Übersicht
- Favoriten sowie Detailansicht mit Ablauf und Court-Diagramm
- Responsive Layout und Unterstützung für reduzierte Animationen

## Weitere Befehle

| Befehl | Beschreibung |
| --- | --- |
| `npm run build` | Prüft TypeScript und erstellt die Produktionsversion unter `dist/`. |
| `npm run preview` | Zeigt die Produktionsversion lokal an. |
| `npm run lint` | Prüft den Quellcode mit Oxlint. |

## Projektstruktur

| Datei | Inhalt |
| --- | --- |
| `index.html` | Metadaten und HTML-Einstiegspunkt |
| `src/main.tsx` | React-Einstiegspunkt |
| `src/App.tsx` | Playbook, Filter und Spielzug-Details |
| `src/index.css` | Farben, Layout und responsive Styles |
| `public/` | Statische Dateien wie das Court-Notes-Icon |
