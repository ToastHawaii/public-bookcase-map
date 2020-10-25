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
  code: "",

  title: "Public bookcase map",
  description:
    "This simple map shows public bookcases for book exchange near you.",

  minZoomMessageNoLayer: "No layer assigned",
  minZoomMessage: "Zoom in to load locations",
  emptyIndicator: "No locations found",
  linkCopied: "Link copied to the clipboard",
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
  colour: "Color",
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
    wooden_cabinet: "Public bookcase"
  },
  amenity: {
    give_box: "GiveBox",
    library: "Free library"
  },
  shop: {
    books: "Bookstore"
  },
  default: "Public bookcase",
};
