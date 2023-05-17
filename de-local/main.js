(self["webpackChunk"] = self["webpackChunk"] || []).push([["de-local"],{

/***/ "../../osm-app-component/src/de/local.ts":
/*!***********************************************!*\
  !*** ../../osm-app-component/src/de/local.ts ***!
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
  code: "de",
  documentation: "Dokumentation",
  floor: function floor(level) {
    return "(".concat(level, ". OG)");
  },
  groundFloor: function groundFloor(_level) {
    return "(EG)";
  },
  basement: function basement(level) {
    return "(".concat(Math.abs(level), ". UG)");
  },
  amenity: {
    hunting_stand: "Hochsitz für Jäger",
    give_box: "GiveBox"
  },
  shop: {
    books: "Buchhandlung"
  },
  leisure: {
    bird_hide: "Versteck um Vögel zu beobachten",
    wildlife_hide: "Versteck um Wildtiere zu beobachten"
  },
  man_made: {
    water_well: "Brunnen",
    watermill: "Wassermühle",
    windmill: "Windmühle",
    mineshaft: "Schacht",
    drinking_fountain: "Trinkbrunnen",
    tower: "Turm",
    beehive: "Bienenstock",
    insect_hotel: "Insektenhotel",
    nesting_site: "Nisthilfe"
  },
  landuse: {
    apiary: "Bienenstock"
  },
  natural: {
    anthill: "Ameisenhügel",
    termite_mound: "Termitenhügel"
  },
  sport: {
    bowls: "Bowls",
    boules: "Boule"
  },
  boules: {
    petanque: "Pétanque",
    lyonnaise: "Jeu Provençal",
    boule_de_fort: "Boule de fort",
    pétanque: "Pétanque",
    bocce: "Boccia"
  },
  "piste:difficulty": {
    novice: "Sehr leicht",
    easy: "Leicht",
    intermediate: "Mittel",
    advanced: "Schwer",
    expert: "Sehr schwer",
    freeride: "Freeride",
    extreme: "Extrem schwer"
  },
  fitness_station: {
    balance_beam: "Schwebebalken",
    box: "Sprungbox",
    horizontal_bar: "Reck",
    horizontal_ladder: "Hangelleiter",
    hyperextension: "Hyperextension-Bank",
    parallel_bars: "Parallelbarren",
    "push-up": "Liegestützstation",
    rings: "Ringe",
    sign: "Übungsanleitungstafel",
    "sit-up": "Sit-Up-Station",
    stairs: "Übungsstiege",
    beam_jump: "Beam jump",
    stepping_stone: "Stepping stone",
    bench: "Bank",
    body_raise: "Körper heben",
    slalom: "Slalom",
    stretch_bars: "Dehnen"
  },
  historic: {
    aircraft: "Flugzeug",
    aqueduct: "Aquädukt",
    archaeological_site: "Ausgrabungsstätte",
    battlefield: "Schlachtfeld",
    boundary_stone: "Grenzstein",
    building: "Gebäude",
    cannon: "Kanone",
    castle: "Burg",
    castle_wall: "Stadtmauer",
    church: "Kirche",
    city_gate: "Stadttor",
    citywalls: "Stadtmauer",
    farm: "Farm",
    fort: "Fort",
    gallows: "Galgen",
    highwater_mark: "Hochwassermarke",
    locomotive: "Lokomotive",
    manor: "Herrenhaus",
    memorial: "Denkmal",
    mine: "Mine",
    mine_shaft: "Schacht",
    milestone: "Meilenstein",
    monastery: "Kloster",
    monument: "Monument",
    optical_telegraph: "Optischer Telegraf",
    pillory: "Pranger",
    railway_car: "Eisenbahnwagen",
    ruins: "Ruine",
    rune_stone: "Runenstein",
    ship: "Schiff",
    tomb: "Grab",
    tower: "Turm",
    tree_shrine: "Baum",
    wayside_cross: "Wegkreuz",
    wayside_shrine: "Schrein",
    wreck: "Wrack"
  },
  site_type: {
    megalith: "Steinsetzung",
    bigstone: "Bearbeiteter Grossstein",
    tumulus: "Hügelgrab",
    fortification: "Befestigungsanlage",
    petroglyph: "Felsbild",
    geoglyph: "Erdzeichnung",
    city: "Historische Stadt",
    settlement: "Siedlung",
    hut_circle: "Hüttenkreis",
    roman_villa: "Römische Villa",
    domus: "Domus",
    roman_circus: "Zirkus (Antikes Rom)",
    necropolis: "Totenstadt, Nekropolis"
  },
  castle_type: {
    defensive: "Burg",
    palace: "Palast",
    stately: "Schloss ",
    manor: "Herrenhaus",
    fortress: "Festung",
    castrum: "Römische Militärlager",
    shiro: "Shiro",
    kremlin: "Kreml",
    hillfort: "Hügelfort"
  },
  "garden:type": {
    botanical: "Botanischer Garten",
    community: "Gemeinschaftsgarten",
    residential: "Hausgarten",
    roof_garden: "Dachgarten"
  },
  "garden:style": {
    english: "Englischer Garten",
    french: "Französischer Garten",
    chinese: "Chinesischer Garten",
    japanese: "Japanischer Garten",
    zen: "Zen Garten",
    monastery: "Klostergarten",
    rosarium: "Rosengarten",
    herb_garden: "Kräutergarten",
    medical_garden: "Apothekergarten",
    kitchen: "Nutzgarten",
    flower_garden: "Ziergarten",
    cottage_garden: "Bauerngarten",
    walled_garden: "Ummauerter Garten"
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
  seasonal: {
    yes: "Saisonal",
    no: "Nicht saisonal",
    spring: "Während des Frühlings",
    summer: "Während des Sommers",
    autumn: "Während des Herbstes",
    winter: "Während des Winters",
    wet_season: "Während der Regenzeit",
    dry_season: "Während der Trockenzeit"
  }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vb3NtLWFwcC1jb21wb25lbnQvc3JjL2RlL2xvY2FsLnRzIl0sIm5hbWVzIjpbImxvY2FsIiwiY29kZSIsImRvY3VtZW50YXRpb24iLCJmbG9vciIsImxldmVsIiwiZ3JvdW5kRmxvb3IiLCJfbGV2ZWwiLCJiYXNlbWVudCIsIk1hdGgiLCJhYnMiLCJhbWVuaXR5IiwiaHVudGluZ19zdGFuZCIsImdpdmVfYm94Iiwic2hvcCIsImJvb2tzIiwibGVpc3VyZSIsImJpcmRfaGlkZSIsIndpbGRsaWZlX2hpZGUiLCJtYW5fbWFkZSIsIndhdGVyX3dlbGwiLCJ3YXRlcm1pbGwiLCJ3aW5kbWlsbCIsIm1pbmVzaGFmdCIsImRyaW5raW5nX2ZvdW50YWluIiwidG93ZXIiLCJiZWVoaXZlIiwiaW5zZWN0X2hvdGVsIiwibmVzdGluZ19zaXRlIiwibGFuZHVzZSIsImFwaWFyeSIsIm5hdHVyYWwiLCJhbnRoaWxsIiwidGVybWl0ZV9tb3VuZCIsInNwb3J0IiwiYm93bHMiLCJib3VsZXMiLCJwZXRhbnF1ZSIsImx5b25uYWlzZSIsImJvdWxlX2RlX2ZvcnQiLCJww6l0YW5xdWUiLCJib2NjZSIsIm5vdmljZSIsImVhc3kiLCJpbnRlcm1lZGlhdGUiLCJhZHZhbmNlZCIsImV4cGVydCIsImZyZWVyaWRlIiwiZXh0cmVtZSIsImZpdG5lc3Nfc3RhdGlvbiIsImJhbGFuY2VfYmVhbSIsImJveCIsImhvcml6b250YWxfYmFyIiwiaG9yaXpvbnRhbF9sYWRkZXIiLCJoeXBlcmV4dGVuc2lvbiIsInBhcmFsbGVsX2JhcnMiLCJyaW5ncyIsInNpZ24iLCJzdGFpcnMiLCJiZWFtX2p1bXAiLCJzdGVwcGluZ19zdG9uZSIsImJlbmNoIiwiYm9keV9yYWlzZSIsInNsYWxvbSIsInN0cmV0Y2hfYmFycyIsImhpc3RvcmljIiwiYWlyY3JhZnQiLCJhcXVlZHVjdCIsImFyY2hhZW9sb2dpY2FsX3NpdGUiLCJiYXR0bGVmaWVsZCIsImJvdW5kYXJ5X3N0b25lIiwiYnVpbGRpbmciLCJjYW5ub24iLCJjYXN0bGUiLCJjYXN0bGVfd2FsbCIsImNodXJjaCIsImNpdHlfZ2F0ZSIsImNpdHl3YWxscyIsImZhcm0iLCJmb3J0IiwiZ2FsbG93cyIsImhpZ2h3YXRlcl9tYXJrIiwibG9jb21vdGl2ZSIsIm1hbm9yIiwibWVtb3JpYWwiLCJtaW5lIiwibWluZV9zaGFmdCIsIm1pbGVzdG9uZSIsIm1vbmFzdGVyeSIsIm1vbnVtZW50Iiwib3B0aWNhbF90ZWxlZ3JhcGgiLCJwaWxsb3J5IiwicmFpbHdheV9jYXIiLCJydWlucyIsInJ1bmVfc3RvbmUiLCJzaGlwIiwidG9tYiIsInRyZWVfc2hyaW5lIiwid2F5c2lkZV9jcm9zcyIsIndheXNpZGVfc2hyaW5lIiwid3JlY2siLCJzaXRlX3R5cGUiLCJtZWdhbGl0aCIsImJpZ3N0b25lIiwidHVtdWx1cyIsImZvcnRpZmljYXRpb24iLCJwZXRyb2dseXBoIiwiZ2VvZ2x5cGgiLCJjaXR5Iiwic2V0dGxlbWVudCIsImh1dF9jaXJjbGUiLCJyb21hbl92aWxsYSIsImRvbXVzIiwicm9tYW5fY2lyY3VzIiwibmVjcm9wb2xpcyIsImNhc3RsZV90eXBlIiwiZGVmZW5zaXZlIiwicGFsYWNlIiwic3RhdGVseSIsImZvcnRyZXNzIiwiY2FzdHJ1bSIsInNoaXJvIiwia3JlbWxpbiIsImhpbGxmb3J0IiwiYm90YW5pY2FsIiwiY29tbXVuaXR5IiwicmVzaWRlbnRpYWwiLCJyb29mX2dhcmRlbiIsImVuZ2xpc2giLCJmcmVuY2giLCJjaGluZXNlIiwiamFwYW5lc2UiLCJ6ZW4iLCJyb3Nhcml1bSIsImhlcmJfZ2FyZGVuIiwibWVkaWNhbF9nYXJkZW4iLCJraXRjaGVuIiwiZmxvd2VyX2dhcmRlbiIsImNvdHRhZ2VfZ2FyZGVuIiwid2FsbGVkX2dhcmRlbiIsImdsYXNzX2NhYmluZXQiLCJtZXRhbF9jYWJpbmV0IiwibW92YWJsZV9jYWJpbmV0IiwicGhvbmVfYm94IiwicmVhZGluZ19ib3giLCJzY3VscHR1cmUiLCJzaGVsZiIsInNoZWx0ZXIiLCJ3b29kZW5fY2FiaW5ldCIsInNlYXNvbmFsIiwieWVzIiwibm8iLCJzcHJpbmciLCJzdW1tZXIiLCJhdXR1bW4iLCJ3aW50ZXIiLCJ3ZXRfc2Vhc29uIiwiZHJ5X3NlYXNvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLElBQU1BLEtBQUssR0FBRztBQUNuQkMsTUFBSSxFQUFFLElBRGE7QUFHbkJDLGVBQWEsRUFBRSxlQUhJO0FBS25CQyxPQUFLLEVBQUUsZUFBVUMsS0FBVixFQUF5QjtBQUM5QixzQkFBV0EsS0FBWDtBQUNELEdBUGtCO0FBUW5CQyxhQUFXLEVBQUUscUJBQVVDLE1BQVYsRUFBMEI7QUFDckM7QUFDRCxHQVZrQjtBQVduQkMsVUFBUSxFQUFFLGtCQUFVSCxLQUFWLEVBQXlCO0FBQ2pDLHNCQUFXSSxJQUFJLENBQUNDLEdBQUwsQ0FBU0wsS0FBVCxDQUFYO0FBQ0QsR0Fia0I7QUFjbkJNLFNBQU8sRUFBRTtBQUNQQyxpQkFBYSxFQUFFLG9CQURSO0FBRVBDLFlBQVEsRUFBRTtBQUZILEdBZFU7QUFrQm5CQyxNQUFJLEVBQUU7QUFDSkMsU0FBSyxFQUFFO0FBREgsR0FsQmE7QUFxQm5CQyxTQUFPLEVBQUU7QUFDUEMsYUFBUyxFQUFFLGlDQURKO0FBRVBDLGlCQUFhLEVBQUU7QUFGUixHQXJCVTtBQXlCbkJDLFVBQVEsRUFBRTtBQUNSQyxjQUFVLEVBQUUsU0FESjtBQUVSQyxhQUFTLEVBQUUsYUFGSDtBQUdSQyxZQUFRLEVBQUUsV0FIRjtBQUlSQyxhQUFTLEVBQUUsU0FKSDtBQUtSQyxxQkFBaUIsRUFBRSxjQUxYO0FBTVJDLFNBQUssRUFBRSxNQU5DO0FBT1JDLFdBQU8sRUFBRSxhQVBEO0FBUVJDLGdCQUFZLEVBQUUsZUFSTjtBQVNSQyxnQkFBWSxFQUFFO0FBVE4sR0F6QlM7QUFvQ25CQyxTQUFPLEVBQUU7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LDRCQUhPO0FBSXRCQyxtQkFBZSxFQUFFLDRCQUpLO0FBS3RCQyxhQUFTLEVBQUUsd0JBTFc7QUFNdEJDLGVBQVcsRUFBRSx1QkFOUztBQU90QkMsYUFBUyxFQUFFLDRCQVBXO0FBUXRCQyxTQUFLLEVBQUUsMEJBUmU7QUFTdEJDLFdBQU8sRUFBRSwwQkFUYTtBQVV0QkMsa0JBQWMsRUFBRTtBQVZNLEdBcEtMO0FBZ0xuQkMsVUFBUSxFQUFFO0FBQ1JDLE9BQUcsRUFBRSxVQURHO0FBRVJDLE1BQUUsRUFBRSxnQkFGSTtBQUdSQyxVQUFNLEVBQUUsdUJBSEE7QUFJUkMsVUFBTSxFQUFFLHFCQUpBO0FBS1JDLFVBQU0sRUFBRSxzQkFMQTtBQU1SQyxVQUFNLEVBQUUscUJBTkE7QUFPUkMsY0FBVSxFQUFFLHVCQVBKO0FBUVJDLGNBQVUsRUFBRTtBQVJKO0FBaExTLENBQWQsQyIsImZpbGUiOiJkZS1sb2NhbC9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChDKSAyMDIwIE1hcmt1cyBQZWxvc29cclxuLy9cclxuLy8gVGhpcyBmaWxlIGlzIHBhcnQgb2Ygb3NtLWFwcC1jb21wb25lbnQuXHJcbi8vXHJcbi8vIG9zbS1hcHAtY29tcG9uZW50IGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcclxuLy8gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcclxuLy8gcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlXHJcbi8vIExpY2Vuc2UsIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXHJcbi8vXHJcbi8vIG9zbS1hcHAtY29tcG9uZW50IGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXHJcbi8vIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXHJcbi8vIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcclxuLy8gR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXHJcbi8vXHJcbi8vIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxyXG4vLyBhbG9uZyB3aXRoIG9zbS1hcHAtY29tcG9uZW50LiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxyXG5cclxuZXhwb3J0IGNvbnN0IGxvY2FsID0ge1xyXG4gIGNvZGU6IFwiZGVcIixcclxuXHJcbiAgZG9jdW1lbnRhdGlvbjogXCJEb2t1bWVudGF0aW9uXCIsXHJcblxyXG4gIGZsb29yOiBmdW5jdGlvbiAobGV2ZWw6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIGAoJHtsZXZlbH0uIE9HKWA7XHJcbiAgfSxcclxuICBncm91bmRGbG9vcjogZnVuY3Rpb24gKF9sZXZlbDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYChFRylgO1xyXG4gIH0sXHJcbiAgYmFzZW1lbnQ6IGZ1bmN0aW9uIChsZXZlbDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gYCgke01hdGguYWJzKGxldmVsKX0uIFVHKWA7XHJcbiAgfSxcclxuICBhbWVuaXR5OiB7XHJcbiAgICBodW50aW5nX3N0YW5kOiBcIkhvY2hzaXR6IGbDvHIgSsOkZ2VyXCIsXHJcbiAgICBnaXZlX2JveDogXCJHaXZlQm94XCJcclxuICB9LFxyXG4gIHNob3A6IHtcclxuICAgIGJvb2tzOiBcIkJ1Y2hoYW5kbHVuZ1wiXHJcbiAgfSxcclxuICBsZWlzdXJlOiB7XHJcbiAgICBiaXJkX2hpZGU6IFwiVmVyc3RlY2sgdW0gVsO2Z2VsIHp1IGJlb2JhY2h0ZW5cIixcclxuICAgIHdpbGRsaWZlX2hpZGU6IFwiVmVyc3RlY2sgdW0gV2lsZHRpZXJlIHp1IGJlb2JhY2h0ZW5cIlxyXG4gIH0sXHJcbiAgbWFuX21hZGU6IHtcclxuICAgIHdhdGVyX3dlbGw6IFwiQnJ1bm5lblwiLFxyXG4gICAgd2F0ZXJtaWxsOiBcIldhc3Nlcm3DvGhsZVwiLFxyXG4gICAgd2luZG1pbGw6IFwiV2luZG3DvGhsZVwiLFxyXG4gICAgbWluZXNoYWZ0OiBcIlNjaGFjaHRcIixcclxuICAgIGRyaW5raW5nX2ZvdW50YWluOiBcIlRyaW5rYnJ1bm5lblwiLFxyXG4gICAgdG93ZXI6IFwiVHVybVwiLFxyXG4gICAgYmVlaGl2ZTogXCJCaWVuZW5zdG9ja1wiLFxyXG4gICAgaW5zZWN0X2hvdGVsOiBcIkluc2VrdGVuaG90ZWxcIixcclxuICAgIG5lc3Rpbmdfc2l0ZTogXCJOaXN0aGlsZmVcIlxyXG4gIH0sXHJcbiAgbGFuZHVzZToge1xyXG4gICAgYXBpYXJ5OiBcIkJpZW5lbnN0b2NrXCJcclxuICB9LFxyXG4gIG5hdHVyYWw6IHtcclxuICAgIGFudGhpbGw6IFwiQW1laXNlbmjDvGdlbFwiLFxyXG4gICAgdGVybWl0ZV9tb3VuZDogXCJUZXJtaXRlbmjDvGdlbFwiXHJcbiAgfSxcclxuICBzcG9ydDogeyBib3dsczogXCJCb3dsc1wiLCBib3VsZXM6IFwiQm91bGVcIiB9LFxyXG4gIGJvdWxlczoge1xyXG4gICAgcGV0YW5xdWU6IFwiUMOpdGFucXVlXCIsXHJcbiAgICBseW9ubmFpc2U6IFwiSmV1IFByb3ZlbsOnYWxcIixcclxuICAgIGJvdWxlX2RlX2ZvcnQ6IFwiQm91bGUgZGUgZm9ydFwiLFxyXG4gICAgcMOpdGFucXVlOiBcIlDDqXRhbnF1ZVwiLFxyXG4gICAgYm9jY2U6IFwiQm9jY2lhXCJcclxuICB9LFxyXG4gIFwicGlzdGU6ZGlmZmljdWx0eVwiOiB7XHJcbiAgICBub3ZpY2U6IFwiU2VociBsZWljaHRcIixcclxuICAgIGVhc3k6IFwiTGVpY2h0XCIsXHJcbiAgICBpbnRlcm1lZGlhdGU6IFwiTWl0dGVsXCIsXHJcbiAgICBhZHZhbmNlZDogXCJTY2h3ZXJcIixcclxuICAgIGV4cGVydDogXCJTZWhyIHNjaHdlclwiLFxyXG4gICAgZnJlZXJpZGU6IFwiRnJlZXJpZGVcIixcclxuICAgIGV4dHJlbWU6IFwiRXh0cmVtIHNjaHdlclwiXHJcbiAgfSxcclxuICBmaXRuZXNzX3N0YXRpb246IHtcclxuICAgIGJhbGFuY2VfYmVhbTogXCJTY2h3ZWJlYmFsa2VuXCIsXHJcbiAgICBib3g6IFwiU3BydW5nYm94XCIsXHJcbiAgICBob3Jpem9udGFsX2JhcjogXCJSZWNrXCIsXHJcbiAgICBob3Jpem9udGFsX2xhZGRlcjogXCJIYW5nZWxsZWl0ZXJcIixcclxuICAgIGh5cGVyZXh0ZW5zaW9uOiBcIkh5cGVyZXh0ZW5zaW9uLUJhbmtcIixcclxuICAgIHBhcmFsbGVsX2JhcnM6IFwiUGFyYWxsZWxiYXJyZW5cIixcclxuICAgIFwicHVzaC11cFwiOiBcIkxpZWdlc3TDvHR6c3RhdGlvblwiLFxyXG4gICAgcmluZ3M6IFwiUmluZ2VcIixcclxuICAgIHNpZ246IFwiw5xidW5nc2FubGVpdHVuZ3N0YWZlbFwiLFxyXG4gICAgXCJzaXQtdXBcIjogXCJTaXQtVXAtU3RhdGlvblwiLFxyXG4gICAgc3RhaXJzOiBcIsOcYnVuZ3NzdGllZ2VcIixcclxuICAgIGJlYW1fanVtcDogXCJCZWFtIGp1bXBcIixcclxuICAgIHN0ZXBwaW5nX3N0b25lOiBcIlN0ZXBwaW5nIHN0b25lXCIsXHJcbiAgICBiZW5jaDogXCJCYW5rXCIsXHJcbiAgICBib2R5X3JhaXNlOiBcIkvDtnJwZXIgaGViZW5cIixcclxuICAgIHNsYWxvbTogXCJTbGFsb21cIixcclxuICAgIHN0cmV0Y2hfYmFyczogXCJEZWhuZW5cIlxyXG4gIH0sXHJcbiAgaGlzdG9yaWM6IHtcclxuICAgIGFpcmNyYWZ0OiBcIkZsdWd6ZXVnXCIsXHJcbiAgICBhcXVlZHVjdDogXCJBcXXDpGR1a3RcIixcclxuICAgIGFyY2hhZW9sb2dpY2FsX3NpdGU6IFwiQXVzZ3JhYnVuZ3NzdMOkdHRlXCIsXHJcbiAgICBiYXR0bGVmaWVsZDogXCJTY2hsYWNodGZlbGRcIixcclxuICAgIGJvdW5kYXJ5X3N0b25lOiBcIkdyZW56c3RlaW5cIixcclxuICAgIGJ1aWxkaW5nOiBcIkdlYsOkdWRlXCIsXHJcbiAgICBjYW5ub246IFwiS2Fub25lXCIsXHJcbiAgICBjYXN0bGU6IFwiQnVyZ1wiLFxyXG4gICAgY2FzdGxlX3dhbGw6IFwiU3RhZHRtYXVlclwiLFxyXG4gICAgY2h1cmNoOiBcIktpcmNoZVwiLFxyXG4gICAgY2l0eV9nYXRlOiBcIlN0YWR0dG9yXCIsXHJcbiAgICBjaXR5d2FsbHM6IFwiU3RhZHRtYXVlclwiLFxyXG4gICAgZmFybTogXCJGYXJtXCIsXHJcbiAgICBmb3J0OiBcIkZvcnRcIixcclxuICAgIGdhbGxvd3M6IFwiR2FsZ2VuXCIsXHJcbiAgICBoaWdod2F0ZXJfbWFyazogXCJIb2Nod2Fzc2VybWFya2VcIixcclxuICAgIGxvY29tb3RpdmU6IFwiTG9rb21vdGl2ZVwiLFxyXG4gICAgbWFub3I6IFwiSGVycmVuaGF1c1wiLFxyXG4gICAgbWVtb3JpYWw6IFwiRGVua21hbFwiLFxyXG4gICAgbWluZTogXCJNaW5lXCIsXHJcbiAgICBtaW5lX3NoYWZ0OiBcIlNjaGFjaHRcIixcclxuICAgIG1pbGVzdG9uZTogXCJNZWlsZW5zdGVpblwiLFxyXG4gICAgbW9uYXN0ZXJ5OiBcIktsb3N0ZXJcIixcclxuICAgIG1vbnVtZW50OiBcIk1vbnVtZW50XCIsXHJcbiAgICBvcHRpY2FsX3RlbGVncmFwaDogXCJPcHRpc2NoZXIgVGVsZWdyYWZcIixcclxuICAgIHBpbGxvcnk6IFwiUHJhbmdlclwiLFxyXG4gICAgcmFpbHdheV9jYXI6IFwiRWlzZW5iYWhud2FnZW5cIixcclxuICAgIHJ1aW5zOiBcIlJ1aW5lXCIsXHJcbiAgICBydW5lX3N0b25lOiBcIlJ1bmVuc3RlaW5cIixcclxuICAgIHNoaXA6IFwiU2NoaWZmXCIsXHJcbiAgICB0b21iOiBcIkdyYWJcIixcclxuICAgIHRvd2VyOiBcIlR1cm1cIixcclxuICAgIHRyZWVfc2hyaW5lOiBcIkJhdW1cIixcclxuICAgIHdheXNpZGVfY3Jvc3M6IFwiV2Vna3JldXpcIixcclxuICAgIHdheXNpZGVfc2hyaW5lOiBcIlNjaHJlaW5cIixcclxuICAgIHdyZWNrOiBcIldyYWNrXCJcclxuICB9LFxyXG4gIHNpdGVfdHlwZToge1xyXG4gICAgbWVnYWxpdGg6IFwiU3RlaW5zZXR6dW5nXCIsXHJcbiAgICBiaWdzdG9uZTogXCJCZWFyYmVpdGV0ZXIgR3Jvc3NzdGVpblwiLFxyXG4gICAgdHVtdWx1czogXCJIw7xnZWxncmFiXCIsXHJcbiAgICBmb3J0aWZpY2F0aW9uOiBcIkJlZmVzdGlndW5nc2FubGFnZVwiLFxyXG4gICAgcGV0cm9nbHlwaDogXCJGZWxzYmlsZFwiLFxyXG4gICAgZ2VvZ2x5cGg6IFwiRXJkemVpY2hudW5nXCIsXHJcbiAgICBjaXR5OiBcIkhpc3RvcmlzY2hlIFN0YWR0XCIsXHJcbiAgICBzZXR0bGVtZW50OiBcIlNpZWRsdW5nXCIsXHJcbiAgICBodXRfY2lyY2xlOiBcIkjDvHR0ZW5rcmVpc1wiLFxyXG4gICAgcm9tYW5fdmlsbGE6IFwiUsO2bWlzY2hlIFZpbGxhXCIsXHJcbiAgICBkb211czogXCJEb211c1wiLFxyXG4gICAgcm9tYW5fY2lyY3VzOiBcIlppcmt1cyAoQW50aWtlcyBSb20pXCIsXHJcbiAgICBuZWNyb3BvbGlzOiBcIlRvdGVuc3RhZHQsIE5la3JvcG9saXNcIlxyXG4gIH0sXHJcbiAgY2FzdGxlX3R5cGU6IHtcclxuICAgIGRlZmVuc2l2ZTogXCJCdXJnXCIsXHJcbiAgICBwYWxhY2U6IFwiUGFsYXN0XCIsXHJcbiAgICBzdGF0ZWx5OiBcIlNjaGxvc3MgXCIsXHJcbiAgICBtYW5vcjogXCJIZXJyZW5oYXVzXCIsXHJcbiAgICBmb3J0cmVzczogXCJGZXN0dW5nXCIsXHJcbiAgICBjYXN0cnVtOiBcIlLDtm1pc2NoZSBNaWxpdMOkcmxhZ2VyXCIsXHJcbiAgICBzaGlybzogXCJTaGlyb1wiLFxyXG4gICAga3JlbWxpbjogXCJLcmVtbFwiLFxyXG4gICAgaGlsbGZvcnQ6IFwiSMO8Z2VsZm9ydFwiXHJcbiAgfSxcclxuICBcImdhcmRlbjp0eXBlXCI6IHtcclxuICAgIGJvdGFuaWNhbDogXCJCb3RhbmlzY2hlciBHYXJ0ZW5cIixcclxuICAgIGNvbW11bml0eTogXCJHZW1laW5zY2hhZnRzZ2FydGVuXCIsXHJcbiAgICByZXNpZGVudGlhbDogXCJIYXVzZ2FydGVuXCIsXHJcbiAgICByb29mX2dhcmRlbjogXCJEYWNoZ2FydGVuXCJcclxuICB9LFxyXG4gIFwiZ2FyZGVuOnN0eWxlXCI6IHtcclxuICAgIGVuZ2xpc2g6IFwiRW5nbGlzY2hlciBHYXJ0ZW5cIixcclxuICAgIGZyZW5jaDogXCJGcmFuesO2c2lzY2hlciBHYXJ0ZW5cIixcclxuICAgIGNoaW5lc2U6IFwiQ2hpbmVzaXNjaGVyIEdhcnRlblwiLFxyXG4gICAgamFwYW5lc2U6IFwiSmFwYW5pc2NoZXIgR2FydGVuXCIsXHJcbiAgICB6ZW46IFwiWmVuIEdhcnRlblwiLFxyXG4gICAgbW9uYXN0ZXJ5OiBcIktsb3N0ZXJnYXJ0ZW5cIixcclxuICAgIHJvc2FyaXVtOiBcIlJvc2VuZ2FydGVuXCIsXHJcbiAgICBoZXJiX2dhcmRlbjogXCJLcsOkdXRlcmdhcnRlblwiLFxyXG4gICAgbWVkaWNhbF9nYXJkZW46IFwiQXBvdGhla2VyZ2FydGVuXCIsXHJcbiAgICBraXRjaGVuOiBcIk51dHpnYXJ0ZW5cIixcclxuICAgIGZsb3dlcl9nYXJkZW46IFwiWmllcmdhcnRlblwiLFxyXG4gICAgY290dGFnZV9nYXJkZW46IFwiQmF1ZXJuZ2FydGVuXCIsXHJcbiAgICB3YWxsZWRfZ2FyZGVuOiBcIlVtbWF1ZXJ0ZXIgR2FydGVuXCJcclxuICB9LFxyXG4gIFwicHVibGljX2Jvb2tjYXNlOnR5cGVcIjoge1xyXG4gICAgYnVpbGRpbmc6IFwiw5ZmZmVudGxpY2hlIFRhdXNjaGJpYmxpb3RoZWtcIixcclxuICAgIGdsYXNzX2NhYmluZXQ6IFwiw5ZmZmVudGxpY2hlciBCw7xjaGVyc2NocmFua1wiLFxyXG4gICAgbWV0YWxfY2FiaW5ldDogXCLDlmZmZW50bGljaGVyIELDvGNoZXJzY2hyYW5rXCIsXHJcbiAgICBtb3ZhYmxlX2NhYmluZXQ6IFwiw5ZmZmVudGxpY2hlciBCw7xjaGVyc2NocmFua1wiLFxyXG4gICAgcGhvbmVfYm94OiBcIsOWZmZlbnRsaWNoZSBCdWNoa2FiaW5lXCIsXHJcbiAgICByZWFkaW5nX2JveDogXCLDlmZmZW50bGljaGUgQsO8Y2hlcmJveFwiLFxyXG4gICAgc2N1bHB0dXJlOiBcIsOWZmZlbnRsaWNoZXIgQsO8Y2hlcnNjaHJhbmtcIixcclxuICAgIHNoZWxmOiBcIsOWZmZlbnRsaWNoZXMgQsO8Y2hlcnJlZ2FsXCIsXHJcbiAgICBzaGVsdGVyOiBcIsOWZmZlbnRsaWNoZXMgQsO8Y2hlcnJlZ2FsXCIsXHJcbiAgICB3b29kZW5fY2FiaW5ldDogXCLDlmZmZW50bGljaGVyIELDvGNoZXJzY2hyYW5rXCJcclxuICB9LFxyXG4gIHNlYXNvbmFsOiB7XHJcbiAgICB5ZXM6IFwiU2Fpc29uYWxcIixcclxuICAgIG5vOiBcIk5pY2h0IHNhaXNvbmFsXCIsXHJcbiAgICBzcHJpbmc6IFwiV8OkaHJlbmQgZGVzIEZyw7xobGluZ3NcIixcclxuICAgIHN1bW1lcjogXCJXw6RocmVuZCBkZXMgU29tbWVyc1wiLFxyXG4gICAgYXV0dW1uOiBcIlfDpGhyZW5kIGRlcyBIZXJic3Rlc1wiLFxyXG4gICAgd2ludGVyOiBcIlfDpGhyZW5kIGRlcyBXaW50ZXJzXCIsXHJcbiAgICB3ZXRfc2Vhc29uOiBcIlfDpGhyZW5kIGRlciBSZWdlbnplaXRcIixcclxuICAgIGRyeV9zZWFzb246IFwiV8OkaHJlbmQgZGVyIFRyb2NrZW56ZWl0XCJcclxuICB9XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=