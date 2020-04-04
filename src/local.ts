export const local = {
  code: "",

  default: "Public bookcase",
  bookshop: "Bookstore",
  giveBox: "GiveBox",
  library: "Free library",

  minZoomMessageNoLayer: "No layer assigned",
  minZoomMessage: "Zoom in to load locations",
  capacity: "Capacity",
  freeToGive: "Free to give",
  freeToTake: "Free to take",
  freeToTakeOrGive: "Free to take or give",
  borrow: "Borrow only",
  indoor: "Indoor",
  light: "Lit",
  covered: "Covered",
  customersOnly: "Customers only",
  wheelchairYes: "Wheelchair accessible",
  wheelchairLimited: "Limited wheelchair accessible",
  wheelchairNo: "Not wheelchair accessible",
  fee: "Sale",
  open: "Open",
  closed: "Closed",
  maybeOpen: "Maybe open",
  maybeOpens: "Maybe opens",
  maybeCloses: "Maybe closes",
  opens: "Opens",
  closes: "Closes",
  thatDependsOn: "That depends on",
  route: "Route",
  floor: function (level: number) {
    return `(${level}F)`;
  },
  groundFloor: function (_level: number) {
    return `(GF)`;
  },
  basement: function (level: number) {
    return `(B${Math.abs(level)}F)`;
  },
  "public_bookcase:type": {
    building: "Public bookcase",
    glass_cabinet: "Public bookcase",
    metal_cabinet: "Public bookcase",
    movable_cabinet: "Public bookcase",
    phone_box: "Public bookcase",
    reading_box: "Public bookcase",
    sculpture: "Public bookcase",
    shelf: "Public bookcase",
    shelter: "Public bookcase",
    wooden_cabinet: "Public bookcase",
  },
};
