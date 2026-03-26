# Planex_Projekt

Unser Projekt, von der Gruppe Danai/Patrick, ist eine minimalistische To-Do App, welche auf allen Geräten verfügbar ist.

## Änderungen des Projekts

Wir haben einige Sachen verändert, da sie uns UI-technisch viel besser gefallen haben, als auf dem Mockup von Penpot.
(Ausserdem hatten wir Zeitmangel beim Erstellen des Mockups im letzten Quartal)

Aufgrund vom schöneren Design wurde folgende Punkte verändert:

- Bei der Kategorie-Seite, wo man die Kategorienübersicht hat und sie löschen kann, haben wir die einzelnen Kategorien noch weiss umrandet, da es weicher fürs Auge ist und mehr Kontrast reinbringt.
- Aufgaben/Freitext/Kategorienerstellung beanspruchen nicht die ganze Seite, sondern es erscheint nur ein Modal. Dies haben wir so geändert, da es auf dem Laptop und Tablet keinen Sinn machen würde, so auszusehen wie auf dem Mockup (Mockup wurde fürs Handy gemacht).
- Der ausgewählte Font auf dem Mockup war bei der Umsetzung nicht ästhetisch, weshalb wir ihn nicht benutzt haben.
- Bei der Aufgabenübersicht stehen die Filter jetzt rechts statt links (Wunsch vom Lehrer).


Aufgrund vom Zeitmangel des letzten Moduls wurden folgende Sachen noch hinzugefügt:

- Freitextübersicht zum Löschen und Bearbeiten
- Kategorieübersicht zum Löschen und Bearbeiten
- Datenvalidierung (überall)
  

## Extra Features

Features die nicht verlangt waren, welche wir aber trotzdem in unser Projekt integrieren wollten, sind folgende:

- Ein Kalender. Der Kalender zeigt den heutigen Tag anhand eines Punktes oberhalb der Tageszahl. Aufgaben, die mit einem bestimmten Datum versehen sind, sind auf dem Kalender blau markiert. Sobald man draufdrückt, erscheint ein Popup, bei dem alle Aufgaben aufgezählt werden, die an diesem Tag fällig sind.
- Bei der Aufgabenübersicht erscheint beim Hovern über den grünen/roten Punkt eine Erklärung, was es bedeutet, da es für manche Nutzer verwirrend sein könnte.

## Setup

- npm install
- npm run dev
- Falls alles lokal funktioniert -> Git-Repo erstellen und mit allen Mitgliedern teilen.


 Für den Kalender:

- npm install vue-simple-calendar


