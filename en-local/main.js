(self["webpackChunk"] = self["webpackChunk"] || []).push([["en-local"],{

/***/ "../../osm-app-component/src/en/local.ts":
/*!***********************************************!*\
  !*** ../../osm-app-component/src/en/local.ts ***!
  \***********************************************/
/*! namespace exports */
/*! export local [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "local": () => /* binding */ local
/* harmony export */ });
// Copyright (C) 2020 Markus Peloso
//
// This file is part of osm-app-component.
//
// osm-app-component is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// osm-app-component is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with osm-app-component.  If not, see <http://www.gnu.org/licenses/>.
var local = {
  code: "",
  documentation: "Documentation",
  floor: function floor(level) {
    return "(".concat(level, "F)");
  },
  groundFloor: function groundFloor(_level) {
    return "(GF)";
  },
  basement: function basement(level) {
    return "(B".concat(Math.abs(level), "F)");
  },
  amenity: {
    hunting_stand: "Hunting stand",
    give_box: "GiveBox"
  },
  shop: {
    books: "Buchhandlung"
  },
  leisure: {
    bird_hide: "Place to observe birds",
    wildlife_hide: "Place to observe wildlife"
  },
  man_made: {
    water_well: "Water well",
    watermill: "Watermill",
    windmill: "Windmill",
    mineshaft: "Mineshaft",
    drinking_fountain: "Drinking fountain",
    tower: "Tower",
    beehive: "Beehive",
    insect_hotel: "Insect hotel",
    nesting_site: "Nesting aid"
  },
  landuse: {
    apiary: "Beehive"
  },
  natural: {
    anthill: "Anthill",
    termite_mound: "Termite mound"
  },
  sport: {
    bowls: "Bowls",
    boules: "Boules"
  },
  boules: {
    petanque: "Pétanque",
    lyonnaise: "Jeu provençal",
    boule_de_fort: "Boule de fort",
    pétanque: "Pétanque",
    bocce: "Bocce"
  },
  "piste:difficulty": {
    novice: "Novice",
    easy: "Easy",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
    freeride: "Freeride",
    extreme: "Extreme"
  },
  fitness_station: {
    balance_beam: "Exercise Balance Beam",
    box: "Exercise Box",
    horizontal_bar: "Exercise Horizontal Bar",
    horizontal_ladder: "Exercise Monkey Bars",
    hyperextension: "Hyperextension Station",
    parallel_bars: "Parallel Bars",
    "push-up": "Push-Up Station",
    rings: "Exercise Rings",
    sign: "Exercise Instruction Sign",
    "sit-up": "Sit-Up Station",
    stairs: "Exercise Stairs",
    beam_jump: "Beam jump",
    stepping_stone: "Stepping stone",
    bench: "Bench",
    body_raise: "Body raise",
    slalom: "Slalom",
    stretch_bars: "Stretch bars"
  },
  historic: {
    aircraft: "Aircraft",
    aqueduct: "Aqueduct",
    archaeological_site: "Archaeological site",
    battlefield: "Battlefield",
    boundary_stone: "Boundary stone",
    building: "Building",
    cannon: "Cannon",
    castle: "Castle",
    castle_wall: "Castle wall",
    church: "Church",
    city_gate: "City gate",
    citywalls: "Citywalls",
    farm: "Farm",
    fort: "Fort",
    gallows: "Gallows",
    highwater_mark: "Highwater mark",
    locomotive: "Locomotive",
    manor: "Manor",
    memorial: "Memorial",
    mine: "Mine",
    mine_shaft: "Mine shaft",
    milestone: "Milestone",
    monastery: "Monastery",
    monument: "Monument",
    optical_telegraph: "Optical telegraph",
    pillory: "Pillory",
    railway_car: "Railway car",
    ruins: "Ruins",
    rune_stone: "Rune stone",
    ship: "Ship",
    tomb: "Tomb",
    tower: "Tower",
    tree_shrine: "Tree shrine",
    wayside_cross: "Wayside cross",
    wayside_shrine: "Wayside shrine",
    wreck: "Wreck"
  },
  site_type: {
    megalith: "Megalith",
    bigstone: "Bigstone",
    tumulus: "Tumulus",
    fortification: "Fortification",
    petroglyph: "Petroglyph",
    geoglyph: "Geoglyph",
    city: "Historic city",
    settlement: "Settlement",
    hut_circle: "Hut circle",
    roman_villa: "Roman villa",
    domus: "Domus",
    roman_circus: "Roman circus",
    necropolis: "Necropolis"
  },
  castle_type: {
    defensive: "Defensive castle",
    palace: "Palace",
    stately: "Stately home",
    manor: "Manor house",
    fortress: "Fortress",
    castrum: "Roman fort ",
    shiro: "Shiro",
    kremlin: "Kremlin",
    hillfort: "Hillfort"
  },
  "garden:type": {
    botanical: "Botanical garden",
    community: "Community garden",
    residential: "Residential garden",
    roof_garden: "Roof garden"
  },
  "garden:style": {
    english: "English landscape garden",
    french: "Garden à la française",
    chinese: "Chinese garden",
    japanese: "Japanese garden",
    zen: "Zen garden",
    monastery: "Medieval monastery garden",
    rosarium: "Rose garden",
    herb_garden: "Herb garden",
    medical_garden: "Physic garden",
    kitchen: "Kitchen garden",
    flower_garden: "Flower garden",
    cottage_garden: "Cottage garden",
    walled_garden: "Walled garden"
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
  seasonal: {
    yes: "Seasonal",
    no: "Not seasonal",
    spring: "During spring",
    summer: "During summer",
    autumn: "During autumn",
    winter: "During winter",
    wet_season: "During wet season",
    dry_season: "During dry season"
  }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vb3NtLWFwcC1jb21wb25lbnQvc3JjL2VuL2xvY2FsLnRzIl0sIm5hbWVzIjpbImxvY2FsIiwiY29kZSIsImRvY3VtZW50YXRpb24iLCJmbG9vciIsImxldmVsIiwiZ3JvdW5kRmxvb3IiLCJfbGV2ZWwiLCJiYXNlbWVudCIsIk1hdGgiLCJhYnMiLCJhbWVuaXR5IiwiaHVudGluZ19zdGFuZCIsImdpdmVfYm94Iiwic2hvcCIsImJvb2tzIiwibGVpc3VyZSIsImJpcmRfaGlkZSIsIndpbGRsaWZlX2hpZGUiLCJtYW5fbWFkZSIsIndhdGVyX3dlbGwiLCJ3YXRlcm1pbGwiLCJ3aW5kbWlsbCIsIm1pbmVzaGFmdCIsImRyaW5raW5nX2ZvdW50YWluIiwidG93ZXIiLCJiZWVoaXZlIiwiaW5zZWN0X2hvdGVsIiwibmVzdGluZ19zaXRlIiwibGFuZHVzZSIsImFwaWFyeSIsIm5hdHVyYWwiLCJhbnRoaWxsIiwidGVybWl0ZV9tb3VuZCIsInNwb3J0IiwiYm93bHMiLCJib3VsZXMiLCJwZXRhbnF1ZSIsImx5b25uYWlzZSIsImJvdWxlX2RlX2ZvcnQiLCJww6l0YW5xdWUiLCJib2NjZSIsIm5vdmljZSIsImVhc3kiLCJpbnRlcm1lZGlhdGUiLCJhZHZhbmNlZCIsImV4cGVydCIsImZyZWVyaWRlIiwiZXh0cmVtZSIsImZpdG5lc3Nfc3RhdGlvbiIsImJhbGFuY2VfYmVhbSIsImJveCIsImhvcml6b250YWxfYmFyIiwiaG9yaXpvbnRhbF9sYWRkZXIiLCJoeXBlcmV4dGVuc2lvbiIsInBhcmFsbGVsX2JhcnMiLCJyaW5ncyIsInNpZ24iLCJzdGFpcnMiLCJiZWFtX2p1bXAiLCJzdGVwcGluZ19zdG9uZSIsImJlbmNoIiwiYm9keV9yYWlzZSIsInNsYWxvbSIsInN0cmV0Y2hfYmFycyIsImhpc3RvcmljIiwiYWlyY3JhZnQiLCJhcXVlZHVjdCIsImFyY2hhZW9sb2dpY2FsX3NpdGUiLCJiYXR0bGVmaWVsZCIsImJvdW5kYXJ5X3N0b25lIiwiYnVpbGRpbmciLCJjYW5ub24iLCJjYXN0bGUiLCJjYXN0bGVfd2FsbCIsImNodXJjaCIsImNpdHlfZ2F0ZSIsImNpdHl3YWxscyIsImZhcm0iLCJmb3J0IiwiZ2FsbG93cyIsImhpZ2h3YXRlcl9tYXJrIiwibG9jb21vdGl2ZSIsIm1hbm9yIiwibWVtb3JpYWwiLCJtaW5lIiwibWluZV9zaGFmdCIsIm1pbGVzdG9uZSIsIm1vbmFzdGVyeSIsIm1vbnVtZW50Iiwib3B0aWNhbF90ZWxlZ3JhcGgiLCJwaWxsb3J5IiwicmFpbHdheV9jYXIiLCJydWlucyIsInJ1bmVfc3RvbmUiLCJzaGlwIiwidG9tYiIsInRyZWVfc2hyaW5lIiwid2F5c2lkZV9jcm9zcyIsIndheXNpZGVfc2hyaW5lIiwid3JlY2siLCJzaXRlX3R5cGUiLCJtZWdhbGl0aCIsImJpZ3N0b25lIiwidHVtdWx1cyIsImZvcnRpZmljYXRpb24iLCJwZXRyb2dseXBoIiwiZ2VvZ2x5cGgiLCJjaXR5Iiwic2V0dGxlbWVudCIsImh1dF9jaXJjbGUiLCJyb21hbl92aWxsYSIsImRvbXVzIiwicm9tYW5fY2lyY3VzIiwibmVjcm9wb2xpcyIsImNhc3RsZV90eXBlIiwiZGVmZW5zaXZlIiwicGFsYWNlIiwic3RhdGVseSIsImZvcnRyZXNzIiwiY2FzdHJ1bSIsInNoaXJvIiwia3JlbWxpbiIsImhpbGxmb3J0IiwiYm90YW5pY2FsIiwiY29tbXVuaXR5IiwicmVzaWRlbnRpYWwiLCJyb29mX2dhcmRlbiIsImVuZ2xpc2giLCJmcmVuY2giLCJjaGluZXNlIiwiamFwYW5lc2UiLCJ6ZW4iLCJyb3Nhcml1bSIsImhlcmJfZ2FyZGVuIiwibWVkaWNhbF9nYXJkZW4iLCJraXRjaGVuIiwiZmxvd2VyX2dhcmRlbiIsImNvdHRhZ2VfZ2FyZGVuIiwid2FsbGVkX2dhcmRlbiIsImdsYXNzX2NhYmluZXQiLCJtZXRhbF9jYWJpbmV0IiwibW92YWJsZV9jYWJpbmV0IiwicGhvbmVfYm94IiwicmVhZGluZ19ib3giLCJzY3VscHR1cmUiLCJzaGVsZiIsInNoZWx0ZXIiLCJ3b29kZW5fY2FiaW5ldCIsInNlYXNvbmFsIiwieWVzIiwibm8iLCJzcHJpbmciLCJzdW1tZXIiLCJhdXR1bW4iLCJ3aW50ZXIiLCJ3ZXRfc2Vhc29uIiwiZHJ5X3NlYXNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLElBQU1BLEtBQUssR0FBRztBQUNuQkMsTUFBSSxFQUFFLEVBRGE7QUFHbkJDLGVBQWEsRUFBRSxlQUhJO0FBS25CQyxPQUFLLEVBQUUsZUFBQ0MsS0FBRDtBQUFBLHNCQUF1QkEsS0FBdkI7QUFBQSxHQUxZO0FBTW5CQyxhQUFXLEVBQUUscUJBQVVDLE1BQVYsRUFBMEI7QUFDckM7QUFDRCxHQVJrQjtBQVNuQkMsVUFBUSxFQUFFLGtCQUFVSCxLQUFWLEVBQXlCO0FBQ2pDLHVCQUFZSSxJQUFJLENBQUNDLEdBQUwsQ0FBU0wsS0FBVCxDQUFaO0FBQ0QsR0FYa0I7QUFZbkJNLFNBQU8sRUFBRTtBQUNQQyxpQkFBYSxFQUFFLGVBRFI7QUFFUEMsWUFBUSxFQUFFO0FBRkgsR0FaVTtBQWdCbkJDLE1BQUksRUFBRTtBQUNKQyxTQUFLLEVBQUU7QUFESCxHQWhCYTtBQW1CbkJDLFNBQU8sRUFBRTtBQUNQQyxhQUFTLEVBQUUsd0JBREo7QUFFUEMsaUJBQWEsRUFBRTtBQUZSLEdBbkJVO0FBdUJuQkMsVUFBUSxFQUFFO0FBQ1JDLGNBQVUsRUFBRSxZQURKO0FBRVJDLGFBQVMsRUFBRSxXQUZIO0FBR1JDLFlBQVEsRUFBRSxVQUhGO0FBSVJDLGFBQVMsRUFBRSxXQUpIO0FBS1JDLHFCQUFpQixFQUFFLG1CQUxYO0FBTVJDLFNBQUssRUFBRSxPQU5DO0FBT1JDLFdBQU8sRUFBRSxTQVBEO0FBUVJDLGdCQUFZLEVBQUUsY0FSTjtBQVNSQyxnQkFBWSxFQUFFO0FBVE4sR0F2QlM7QUFrQ25CQyxTQUFPLEVBQUU7QUFDUEMs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QUhPO0FBSXRCQyxtQkFBZSxFQUFFLGlCQUpLO0FBS3RCQyxhQUFTLEVBQUUsaUJBTFc7QUFNdEJDLGVBQVcsRUFBRSxpQkFOUztBQU90QkMsYUFBUyxFQUFFLGlCQVBXO0FBUXRCQyxTQUFLLEVBQUUsaUJBUmU7QUFTdEJDLFdBQU8sRUFBRSxpQkFUYTtBQVV0QkMsa0JBQWMsRUFBRTtBQVZNLEdBbEtMO0FBOEtuQkMsVUFBUSxFQUFFO0FBQ1JDLE9BQUcsRUFBRSxVQURHO0FBRVJDLE1BQUUsRUFBRSxjQUZJO0FBR1JDLFVBQU0sRUFBRSxlQUhBO0FBSVJDLFVBQU0sRUFBRSxlQUpBO0FBS1JDLFVBQU0sRUFBRSxlQUxBO0FBTVJDLFVBQU0sRUFBRSxlQU5BO0FBT1JDLGNBQVUsRUFBRSxtQkFQSjtBQVFSQyxjQUFVLEVBQUU7QUFSSjtBQTlLUyxDQUFkLEMiLCJmaWxlIjoiZW4tbG9jYWwvbWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAoQykgMjAyMCBNYXJrdXMgUGVsb3NvXHJcbi8vXHJcbi8vIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIG9zbS1hcHAtY29tcG9uZW50LlxyXG4vL1xyXG4vLyBvc20tYXBwLWNvbXBvbmVudCBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XHJcbi8vIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXHJcbi8vIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZVxyXG4vLyBMaWNlbnNlLCBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxyXG4vL1xyXG4vLyBvc20tYXBwLWNvbXBvbmVudCBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxyXG4vLyBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxyXG4vLyBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXHJcbi8vIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxyXG4vL1xyXG4vLyBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcclxuLy8gYWxvbmcgd2l0aCBvc20tYXBwLWNvbXBvbmVudC4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cclxuXHJcbmV4cG9ydCBjb25zdCBsb2NhbCA9IHtcclxuICBjb2RlOiBcIlwiLFxyXG5cclxuICBkb2N1bWVudGF0aW9uOiBcIkRvY3VtZW50YXRpb25cIixcclxuXHJcbiAgZmxvb3I6IChsZXZlbDogbnVtYmVyKSA9PiBgKCR7bGV2ZWx9RilgLFxyXG4gIGdyb3VuZEZsb29yOiBmdW5jdGlvbiAoX2xldmVsOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBgKEdGKWA7XHJcbiAgfSxcclxuICBiYXNlbWVudDogZnVuY3Rpb24gKGxldmVsOiBudW1iZXIpIHtcclxuICAgIHJldHVybiBgKEIke01hdGguYWJzKGxldmVsKX1GKWA7XHJcbiAgfSxcclxuICBhbWVuaXR5OiB7XHJcbiAgICBodW50aW5nX3N0YW5kOiBcIkh1bnRpbmcgc3RhbmRcIixcclxuICAgIGdpdmVfYm94OiBcIkdpdmVCb3hcIlxyXG4gIH0sXHJcbiAgc2hvcDoge1xyXG4gICAgYm9va3M6IFwiQnVjaGhhbmRsdW5nXCJcclxuICB9LFxyXG4gIGxlaXN1cmU6IHtcclxuICAgIGJpcmRfaGlkZTogXCJQbGFjZSB0byBvYnNlcnZlIGJpcmRzXCIsXHJcbiAgICB3aWxkbGlmZV9oaWRlOiBcIlBsYWNlIHRvIG9ic2VydmUgd2lsZGxpZmVcIlxyXG4gIH0sXHJcbiAgbWFuX21hZGU6IHtcclxuICAgIHdhdGVyX3dlbGw6IFwiV2F0ZXIgd2VsbFwiLFxyXG4gICAgd2F0ZXJtaWxsOiBcIldhdGVybWlsbFwiLFxyXG4gICAgd2luZG1pbGw6IFwiV2luZG1pbGxcIixcclxuICAgIG1pbmVzaGFmdDogXCJNaW5lc2hhZnRcIixcclxuICAgIGRyaW5raW5nX2ZvdW50YWluOiBcIkRyaW5raW5nIGZvdW50YWluXCIsXHJcbiAgICB0b3dlcjogXCJUb3dlclwiLFxyXG4gICAgYmVlaGl2ZTogXCJCZWVoaXZlXCIsXHJcbiAgICBpbnNlY3RfaG90ZWw6IFwiSW5zZWN0IGhvdGVsXCIsXHJcbiAgICBuZXN0aW5nX3NpdGU6IFwiTmVzdGluZyBhaWRcIlxyXG4gIH0sXHJcbiAgbGFuZHVzZToge1xyXG4gICAgYXBpYXJ5OiBcIkJlZWhpdmVcIlxyXG4gIH0sXHJcbiAgbmF0dXJhbDoge1xyXG4gICAgYW50aGlsbDogXCJBbnRoaWxsXCIsXHJcbiAgICB0ZXJtaXRlX21vdW5kOiBcIlRlcm1pdGUgbW91bmRcIlxyXG4gIH0sXHJcbiAgc3BvcnQ6IHsgYm93bHM6IFwiQm93bHNcIiwgYm91bGVzOiBcIkJvdWxlc1wiIH0sXHJcbiAgYm91bGVzOiB7XHJcbiAgICBwZXRhbnF1ZTogXCJQw6l0YW5xdWVcIixcclxuICAgIGx5b25uYWlzZTogXCJKZXUgcHJvdmVuw6dhbFwiLFxyXG4gICAgYm91bGVfZGVfZm9ydDogXCJCb3VsZSBkZSBmb3J0XCIsXHJcbiAgICBww6l0YW5xdWU6IFwiUMOpdGFucXVlXCIsXHJcbiAgICBib2NjZTogXCJCb2NjZVwiXHJcbiAgfSxcclxuICBcInBpc3RlOmRpZmZpY3VsdHlcIjoge1xyXG4gICAgbm92aWNlOiBcIk5vdmljZVwiLFxyXG4gICAgZWFzeTogXCJFYXN5XCIsXHJcbiAgICBpbnRlcm1lZGlhdGU6IFwiSW50ZXJtZWRpYXRlXCIsXHJcbiAgICBhZHZhbmNlZDogXCJBZHZhbmNlZFwiLFxyXG4gICAgZXhwZXJ0OiBcIkV4cGVydFwiLFxyXG4gICAgZnJlZXJpZGU6IFwiRnJlZXJpZGVcIixcclxuICAgIGV4dHJlbWU6IFwiRXh0cmVtZVwiXHJcbiAgfSxcclxuICBmaXRuZXNzX3N0YXRpb246IHtcclxuICAgIGJhbGFuY2VfYmVhbTogXCJFeGVyY2lzZSBCYWxhbmNlIEJlYW1cIixcclxuICAgIGJveDogXCJFeGVyY2lzZSBCb3hcIixcclxuICAgIGhvcml6b250YWxfYmFyOiBcIkV4ZXJjaXNlIEhvcml6b250YWwgQmFyXCIsXHJcbiAgICBob3Jpem9udGFsX2xhZGRlcjogXCJFeGVyY2lzZSBNb25rZXkgQmFyc1wiLFxyXG4gICAgaHlwZXJleHRlbnNpb246IFwiSHlwZXJleHRlbnNpb24gU3RhdGlvblwiLFxyXG4gICAgcGFyYWxsZWxfYmFyczogXCJQYXJhbGxlbCBCYXJzXCIsXHJcbiAgICBcInB1c2gtdXBcIjogXCJQdXNoLVVwIFN0YXRpb25cIixcclxuICAgIHJpbmdzOiBcIkV4ZXJjaXNlIFJpbmdzXCIsXHJcbiAgICBzaWduOiBcIkV4ZXJjaXNlIEluc3RydWN0aW9uIFNpZ25cIixcclxuICAgIFwic2l0LXVwXCI6IFwiU2l0LVVwIFN0YXRpb25cIixcclxuICAgIHN0YWlyczogXCJFeGVyY2lzZSBTdGFpcnNcIixcclxuICAgIGJlYW1fanVtcDogXCJCZWFtIGp1bXBcIixcclxuICAgIHN0ZXBwaW5nX3N0b25lOiBcIlN0ZXBwaW5nIHN0b25lXCIsXHJcbiAgICBiZW5jaDogXCJCZW5jaFwiLFxyXG4gICAgYm9keV9yYWlzZTogXCJCb2R5IHJhaXNlXCIsXHJcbiAgICBzbGFsb206IFwiU2xhbG9tXCIsXHJcbiAgICBzdHJldGNoX2JhcnM6IFwiU3RyZXRjaCBiYXJzXCJcclxuICB9LFxyXG4gIGhpc3RvcmljOiB7XHJcbiAgICBhaXJjcmFmdDogXCJBaXJjcmFmdFwiLFxyXG4gICAgYXF1ZWR1Y3Q6IFwiQXF1ZWR1Y3RcIixcclxuICAgIGFyY2hhZW9sb2dpY2FsX3NpdGU6IFwiQXJjaGFlb2xvZ2ljYWwgc2l0ZVwiLFxyXG4gICAgYmF0dGxlZmllbGQ6IFwiQmF0dGxlZmllbGRcIixcclxuICAgIGJvdW5kYXJ5X3N0b25lOiBcIkJvdW5kYXJ5IHN0b25lXCIsXHJcbiAgICBidWlsZGluZzogXCJCdWlsZGluZ1wiLFxyXG4gICAgY2Fubm9uOiBcIkNhbm5vblwiLFxyXG4gICAgY2FzdGxlOiBcIkNhc3RsZVwiLFxyXG4gICAgY2FzdGxlX3dhbGw6IFwiQ2FzdGxlIHdhbGxcIixcclxuICAgIGNodXJjaDogXCJDaHVyY2hcIixcclxuICAgIGNpdHlfZ2F0ZTogXCJDaXR5IGdhdGVcIixcclxuICAgIGNpdHl3YWxsczogXCJDaXR5d2FsbHNcIixcclxuICAgIGZhcm06IFwiRmFybVwiLFxyXG4gICAgZm9ydDogXCJGb3J0XCIsXHJcbiAgICBnYWxsb3dzOiBcIkdhbGxvd3NcIixcclxuICAgIGhpZ2h3YXRlcl9tYXJrOiBcIkhpZ2h3YXRlciBtYXJrXCIsXHJcbiAgICBsb2NvbW90aXZlOiBcIkxvY29tb3RpdmVcIixcclxuICAgIG1hbm9yOiBcIk1hbm9yXCIsXHJcbiAgICBtZW1vcmlhbDogXCJNZW1vcmlhbFwiLFxyXG4gICAgbWluZTogXCJNaW5lXCIsXHJcbiAgICBtaW5lX3NoYWZ0OiBcIk1pbmUgc2hhZnRcIixcclxuICAgIG1pbGVzdG9uZTogXCJNaWxlc3RvbmVcIixcclxuICAgIG1vbmFzdGVyeTogXCJNb25hc3RlcnlcIixcclxuICAgIG1vbnVtZW50OiBcIk1vbnVtZW50XCIsXHJcbiAgICBvcHRpY2FsX3RlbGVncmFwaDogXCJPcHRpY2FsIHRlbGVncmFwaFwiLFxyXG4gICAgcGlsbG9yeTogXCJQaWxsb3J5XCIsXHJcbiAgICByYWlsd2F5X2NhcjogXCJSYWlsd2F5IGNhclwiLFxyXG4gICAgcnVpbnM6IFwiUnVpbnNcIixcclxuICAgIHJ1bmVfc3RvbmU6IFwiUnVuZSBzdG9uZVwiLFxyXG4gICAgc2hpcDogXCJTaGlwXCIsXHJcbiAgICB0b21iOiBcIlRvbWJcIixcclxuICAgIHRvd2VyOiBcIlRvd2VyXCIsXHJcbiAgICB0cmVlX3NocmluZTogXCJUcmVlIHNocmluZVwiLFxyXG4gICAgd2F5c2lkZV9jcm9zczogXCJXYXlzaWRlIGNyb3NzXCIsXHJcbiAgICB3YXlzaWRlX3NocmluZTogXCJXYXlzaWRlIHNocmluZVwiLFxyXG4gICAgd3JlY2s6IFwiV3JlY2tcIlxyXG4gIH0sXHJcbiAgc2l0ZV90eXBlOiB7XHJcbiAgICBtZWdhbGl0aDogXCJNZWdhbGl0aFwiLFxyXG4gICAgYmlnc3RvbmU6IFwiQmlnc3RvbmVcIixcclxuICAgIHR1bXVsdXM6IFwiVHVtdWx1c1wiLFxyXG4gICAgZm9ydGlmaWNhdGlvbjogXCJGb3J0aWZpY2F0aW9uXCIsXHJcbiAgICBwZXRyb2dseXBoOiBcIlBldHJvZ2x5cGhcIixcclxuICAgIGdlb2dseXBoOiBcIkdlb2dseXBoXCIsXHJcbiAgICBjaXR5OiBcIkhpc3RvcmljIGNpdHlcIixcclxuICAgIHNldHRsZW1lbnQ6IFwiU2V0dGxlbWVudFwiLFxyXG4gICAgaHV0X2NpcmNsZTogXCJIdXQgY2lyY2xlXCIsXHJcbiAgICByb21hbl92aWxsYTogXCJSb21hbiB2aWxsYVwiLFxyXG4gICAgZG9tdXM6IFwiRG9tdXNcIixcclxuICAgIHJvbWFuX2NpcmN1czogXCJSb21hbiBjaXJjdXNcIixcclxuICAgIG5lY3JvcG9saXM6IFwiTmVjcm9wb2xpc1wiXHJcbiAgfSxcclxuICBjYXN0bGVfdHlwZToge1xyXG4gICAgZGVmZW5zaXZlOiBcIkRlZmVuc2l2ZSBjYXN0bGVcIixcclxuICAgIHBhbGFjZTogXCJQYWxhY2VcIixcclxuICAgIHN0YXRlbHk6IFwiU3RhdGVseSBob21lXCIsXHJcbiAgICBtYW5vcjogXCJNYW5vciBob3VzZVwiLFxyXG4gICAgZm9ydHJlc3M6IFwiRm9ydHJlc3NcIixcclxuICAgIGNhc3RydW06IFwiUm9tYW4gZm9ydCBcIixcclxuICAgIHNoaXJvOiBcIlNoaXJvXCIsXHJcbiAgICBrcmVtbGluOiBcIktyZW1saW5cIixcclxuICAgIGhpbGxmb3J0OiBcIkhpbGxmb3J0XCJcclxuICB9LFxyXG4gIFwiZ2FyZGVuOnR5cGVcIjoge1xyXG4gICAgYm90YW5pY2FsOiBcIkJvdGFuaWNhbCBnYXJkZW5cIixcclxuICAgIGNvbW11bml0eTogXCJDb21tdW5pdHkgZ2FyZGVuXCIsXHJcbiAgICByZXNpZGVudGlhbDogXCJSZXNpZGVudGlhbCBnYXJkZW5cIixcclxuICAgIHJvb2ZfZ2FyZGVuOiBcIlJvb2YgZ2FyZGVuXCJcclxuICB9LFxyXG4gIFwiZ2FyZGVuOnN0eWxlXCI6IHtcclxuICAgIGVuZ2xpc2g6IFwiRW5nbGlzaCBsYW5kc2NhcGUgZ2FyZGVuXCIsXHJcbiAgICBmcmVuY2g6IFwiR2FyZGVuIMOgIGxhIGZyYW7Dp2Fpc2VcIixcclxuICAgIGNoaW5lc2U6IFwiQ2hpbmVzZSBnYXJkZW5cIixcclxuICAgIGphcGFuZXNlOiBcIkphcGFuZXNlIGdhcmRlblwiLFxyXG4gICAgemVuOiBcIlplbiBnYXJkZW5cIixcclxuICAgIG1vbmFzdGVyeTogXCJNZWRpZXZhbCBtb25hc3RlcnkgZ2FyZGVuXCIsXHJcbiAgICByb3Nhcml1bTogXCJSb3NlIGdhcmRlblwiLFxyXG4gICAgaGVyYl9nYXJkZW46IFwiSGVyYiBnYXJkZW5cIixcclxuICAgIG1lZGljYWxfZ2FyZGVuOiBcIlBoeXNpYyBnYXJkZW5cIixcclxuICAgIGtpdGNoZW46IFwiS2l0Y2hlbiBnYXJkZW5cIixcclxuICAgIGZsb3dlcl9nYXJkZW46IFwiRmxvd2VyIGdhcmRlblwiLFxyXG4gICAgY290dGFnZV9nYXJkZW46IFwiQ290dGFnZSBnYXJkZW5cIixcclxuICAgIHdhbGxlZF9nYXJkZW46IFwiV2FsbGVkIGdhcmRlblwiXHJcbiAgfSxcclxuICBcInB1YmxpY19ib29rY2FzZTp0eXBlXCI6IHtcclxuICAgIGJ1aWxkaW5nOiBcIlB1YmxpYyBib29rY2FzZVwiLFxyXG4gICAgZ2xhc3NfY2FiaW5ldDogXCJQdWJsaWMgYm9va2Nhc2VcIixcclxuICAgIG1ldGFsX2NhYmluZXQ6IFwiUHVibGljIGJvb2tjYXNlXCIsXHJcbiAgICBtb3ZhYmxlX2NhYmluZXQ6IFwiUHVibGljIGJvb2tjYXNlXCIsXHJcbiAgICBwaG9uZV9ib3g6IFwiUHVibGljIGJvb2tjYXNlXCIsXHJcbiAgICByZWFkaW5nX2JveDogXCJQdWJsaWMgYm9va2Nhc2VcIixcclxuICAgIHNjdWxwdHVyZTogXCJQdWJsaWMgYm9va2Nhc2VcIixcclxuICAgIHNoZWxmOiBcIlB1YmxpYyBib29rY2FzZVwiLFxyXG4gICAgc2hlbHRlcjogXCJQdWJsaWMgYm9va2Nhc2VcIixcclxuICAgIHdvb2Rlbl9jYWJpbmV0OiBcIlB1YmxpYyBib29rY2FzZVwiXHJcbiAgfSxcclxuICBzZWFzb25hbDoge1xyXG4gICAgeWVzOiBcIlNlYXNvbmFsXCIsXHJcbiAgICBubzogXCJOb3Qgc2Vhc29uYWxcIixcclxuICAgIHNwcmluZzogXCJEdXJpbmcgc3ByaW5nXCIsXHJcbiAgICBzdW1tZXI6IFwiRHVyaW5nIHN1bW1lclwiLFxyXG4gICAgYXV0dW1uOiBcIkR1cmluZyBhdXR1bW5cIixcclxuICAgIHdpbnRlcjogXCJEdXJpbmcgd2ludGVyXCIsXHJcbiAgICB3ZXRfc2Vhc29uOiBcIkR1cmluZyB3ZXQgc2Vhc29uXCIsXHJcbiAgICBkcnlfc2Vhc29uOiBcIkR1cmluZyBkcnkgc2Vhc29uXCJcclxuICB9XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=