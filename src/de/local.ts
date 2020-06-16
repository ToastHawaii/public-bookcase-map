export const local = {
  code: "de",

  default: "Öffentlicher Bücherschrank",
  bookshop: "Buchhandlung",
  giveBox: "GiveBox",
  library: "Kostenlose Bibliothek",

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
  }
};
