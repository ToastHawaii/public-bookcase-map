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

import * as L from "leaflet";
import "leaflet-overpass-layer";
import * as opening_hours from "opening_hours";
import * as moment from "moment";
import { Solver } from "./coloriz/Solver";
import { Color, hexToRgb } from "./coloriz/Color";
import { setHashParams, getHashParams } from "./utilities/url";
import { Attribute } from "./Generator";
import { getJson } from "./utilities/jsonRequest";
import { get, set } from "./utilities/storage";
import { getHtmlElement, createElement } from "./utilities/html";
import { createOverPassLayer, isIOS, shareLink } from "./createOverPassLayer";
import { funding } from "./funding";

let map: L.Map;
const layers: { [name: string]: L.Layer } = {};

export function initMap<M>(
  filterOptions: {
    value: string;
    icon: string;
    query: string;
    color: string;
    edit: string[];
  }[],
  attributes: Attribute<M>[],
  local: any
) {
  getHtmlElement(".search").addEventListener("submit", ev => {
    ev.preventDefault();
    search();
    return false;
  });

  getHtmlElement(".geo").addEventListener("click", () => {
    map.stopLocate();
    map.locate({ setView: true, maxZoom: 16 });

    return false;
  });

  getHtmlElement(".about").addEventListener("click", () => {
    window.location.href = `https://book-exchange.zottelig.ch${
      local.code ? `/${local.code}` : ""
    }/docs`;
  });

  getHtmlElement(".donate").addEventListener("click", () => {
    window.open(funding[local.code] || funding.en);
  });

  const shareButton = getHtmlElement(".share");
  shareButton.addEventListener("click", e => {
    e.preventDefault();

    const bbox = map.getBounds();
    shareLink(
      `${window.location.origin}${window.location.pathname}#b=${toString(
        bbox.getSouth(),
        4
      )},${toString(bbox.getWest(), 4)},${toString(
        bbox.getNorth(),
        4
      )},${toString(bbox.getEast(), 4)}`,
      shareButton,
      local,
      local.title,
      local.description
    );
  });

  getHtmlElement(".note").addEventListener("click", () => {
    const latlng = map.getCenter();
    const zoom = map.getZoom();

    window.location.href = `https://www.openstreetmap.org/note/new#map=${zoom}/${latlng.lat}/${latlng.lng}`;
  });

  getHtmlElement(".edit").addEventListener("click", () => {
    const latlng = map.getCenter();
    const zoom = map.getZoom();

    let presets = "";
    const p = filterOptions
      .map(o => o.edit.map(t => t.replace(/=/gi, "/")).join(","))
      .filter(o => o)
      .join(",");
    presets += (presets && p ? "," : "") + p;

    if (isIOS())
      window.location.href = `https://gomaposm.com/edit?center=${latlng.lat},${latlng.lng}&zoom=${zoom}`;
    else
      window.location.href = `https://www.openstreetmap.org/edit#editor=id&map=${zoom}/${
        latlng.lat
      }/${latlng.lng}${presets ? `&presets=${presets}` : ``}`;
  });

  moment.locale(local.code || "en");

  const attribution = [
    'Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> contributors',
    'POI via <a href="https://www.overpass-api.de/">Overpass API</a>'
  ];

  const osm = new L.TileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      opacity: 0.7,
      attribution: attribution.join(" | ")
    }
  );

  type State = { lat: number; lng: number; zoom: number };

  const state = get<State>("position") || { lat: 47.37, lng: 8.54, zoom: 12 };

  map = new L.Map("map")
    .addLayer(osm)
    .setView(new L.LatLng(state.lat, state.lng), state.zoom);

  // placeholders for the L.marker and L.circle representing user's current position and accuracy
  let currentPosition: L.Layer | L.Marker<any>;
  let currentAccuracy: L.Layer | L.Circle<any>;

  map.on("moveend zoomend", () => {
    updateCount(local);
    const center = map.getCenter();
    const state = { lat: center.lat, lng: center.lng, zoom: map.getZoom() };
    set<State>("position", state);
  });

  let timeoutToken: any;
  let popopopen = false;
  map
    .on("movestart zoomstart popupopen", () => {
      if (timeoutToken) clearTimeout(timeoutToken);
      getHtmlElement("html").classList.remove("help");
    })
    .on("moveend zoomend popupclose", () => {
      timeoutToken = setTimeout(() => {
        if (!popopopen) getHtmlElement("html").classList.add("help");
      }, 1500);
    });
  map
    .on("popupopen", () => {
      popopopen = true;
    })
    .on("popupclose", () => {
      popopopen = false;
    });

  map.on(
    "locationfound",
    (e: { accuracy: number; latlng: L.LatLngExpression }) => {
      // if position defined, then remove the existing position marker and accuracy circle from the map
      if (currentPosition) {
        map.removeLayer(currentPosition);
        map.removeLayer(currentAccuracy);
      }

      const radius = e.accuracy / 2;

      currentPosition = L.marker(e.latlng).addTo(map);

      currentAccuracy = L.circle(e.latlng, radius).addTo(map);

      map.locate({ watch: false, maxZoom: 16 });
    }
  );

  function search(value?: string) {
    value =
      value ||
      (document.getElementById("osm-search") as HTMLInputElement).value;

    setHashParams(
      {
        location: value
      },
      hashchange
    );

    getJson("https://nominatim.openstreetmap.org/search", {
      format: "json",
      q: value,
      limit: 1
    }).then(r => {
      const result = r[0];
      if (!result) return;
      map.flyToBounds([
        [result.boundingbox[0], result.boundingbox[2]],
        [result.boundingbox[1], result.boundingbox[3]]
      ]);
    });
  }

  function hashchange() {
    const params = getHashParams();

    if (params["location"]) search(params["location"]);
    else if (params["b"]) {
      const bounds = params["b"].split(",").map(b => parseFloat(b));
      map.fitBounds([
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]]
      ]);
    }
  }

  window.addEventListener("hashchange", hashchange);

  setTimeout(() => {
    for (const f of filterOptions)
      init(f.value, f.icon, f.query, attributes, local, f.color);
    hashchange();
  }, 0);

  const params = getHashParams();

  if (params["location"]) {
    search(params["location"]);
    map.locate({ setView: false, maxZoom: 16 });
  } else if (params["b"]) {
    const bounds = params["b"].split(",").map(b => parseFloat(b));
    map.fitBounds([
      [bounds[0], bounds[1]],
      [bounds[2], bounds[3]]
    ]);
    map.locate({ setView: false, maxZoom: 16 });
  } else map.locate({ setView: true, maxZoom: 16 });

  map.on("popupopen", e => {
    const marker = (e as L.PopupEvent & { popup: { _source: L.Marker } }).popup
      ._source;
    const latLng = marker.getLatLng();
    setHashParams(
      {
        location: `${latLng.lat},${latLng.lng}`
      },
      hashchange
    );
  });

  let iconColors = "";

  for (const f of filterOptions) {
    if (f.color) {
      const rgb = hexToRgb(f.color);
      const color = new Color(rgb[0], rgb[1], rgb[2]);
      const solver = new Solver(color);
      const result = solver.solve();

      iconColors += `.${f.value}-icon{${result.filter.replace(
        /filter:/gi,
        "filter: brightness(0%)"
      )}}`;
    }
  }

  const style = createElement("style", iconColors);
  document.head.appendChild(style);
}

function init<M>(
  value: string,
  icon: string,
  query: string,
  attributes: Attribute<M>[],
  local: any,
  color: string
) {
  layers[value] = createOverPassLayer(
    value,
    icon,
    query,
    attributes,
    local,
    color
  );
  map.addLayer(layers[value]);
}

export function parseOpeningHours(openingHours: string, localCode: string) {
  if (!openingHours) return undefined;

  try {
    return new opening_hours(openingHours, null, {
      locale: localCode
    });
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

let emptyIndicatorElement: HTMLDivElement | undefined;

export function updateCount(local: any) {
  const visible = countMarkersInView(map) === 0 && map.getZoom() >= 12;
  if (visible && !emptyIndicatorElement) {
    emptyIndicatorElement = createElement(
      "div",
      `<div class="leaflet-control-emptyIndicator leaflet-control">${local.emptyIndicator}</div>`,
      ["leaflet-bottom", "leaflet-left"]
    );

    getHtmlElement(".leaflet-control-container").appendChild(
      emptyIndicatorElement
    );
  } else if (!visible && emptyIndicatorElement) {
    emptyIndicatorElement.remove();
    emptyIndicatorElement = undefined;
  }
}

function countMarkersInView(map: L.Map) {
  let count = 0;
  const mapBounds = map.getBounds();
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      if (mapBounds.contains(layer.getLatLng())) {
        count++;
      }
    }
  });
  return count;
}

function toString(value: number, precision: number) {
  const power = Math.pow(10, precision || 0);
  return (Math.round(value * power) / power).toFixed(precision);
}
