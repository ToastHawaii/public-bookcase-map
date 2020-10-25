// Copyright (C) 2020 Markus Peloso
//
// This file is part of Public bookcase map.
//
// Public bookcase map is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// Public bookcase map is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Public bookcase map.  If not, see <http://www.gnu.org/licenses/>.

export const local = {
  code: "de",

  title: "Öffentliche Bücherschränke Karte",
  description:
    "Dies ist eine einfache Karte, welche öffentliche Bücherschränke für das Tauschen von Büchern in ihrer Nähe anzeigt.",

  minZoomMessageNoLayer: "Keine Ebene zugewiesen",
  minZoomMessage: "Vergrössern, um Standorte zu laden",
  emptyIndicator: "Keine Orte gefunden",
  linkCopied: "Link in die Zwischenablage kopiert",
  capacity: "Kapazität",
  freeToGive: "Nur bringen",
  freeToTake: "Nur mitnehmen",
  freeToTakeOrGive: "Mitnehmen und bringen",
  borrow: "Nur ausleihen",
  indoor: "Drinnen",
  light: "Beleuchtet",
  customersOnly: "Nur für Besucher",
  covered: "Überdacht",
  wheelchairYes: "Rollstuhlgerecht",
  wheelchairLimited: "Limitiert Rollstuhlgerecht",
  wheelchairNo: "Nicht Rollstuhlgerecht",
  fee: "Kaufen",
  colour: "Farbe",
  open: "Geöffnet",
  closed: "Geschlossen",
  maybeOpen: "Vielleicht geöffnet",
  maybeOpens: "Öffnet vielleicht",
  maybeCloses: "Schliesst vielleicht",
  opens: "Öffnet",
  closes: "Schliesst",
  thatDependsOn: "Das hängt ab von",
  route: "Routen",
  floor: function (level: number) {
    return `(${level}. OG)`;
  },
  groundFloor: function (_level: number) {
    return `(EG)`;
  },
  basement: function (level: number) {
    return `(${Math.abs(level)}. UG)`;
  },
  "public_bookcase:type": {
    building: "Öffentliche Tauschbibliothek",
    glass_cabinet: "Öffentlicher Bücherschrank",
    metal_cabinet: "Öffentlicher Bücherschrank",
    movable_cabinet: "Öffentlicher Bücherschrank",
    phone_box: "Öffentliche Buchkabine",
    reading_box: "Öffentliche Bücherbox",
    sculpture: "Öffentlicher Bücherschrank",
    shelf: "Öffentliches Bücherregal",
    shelter: "Öffentliches Bücherregal",
    wooden_cabinet: "Öffentlicher Bücherschrank"
  },
  amenity: {
    give_box: "GiveBox",
    library: "Kostenlose Bibliothek"
  },
  shop: {
    books: "Buchhandlung"
  },
  default: "Öffentlicher Bücherschrank"
};
