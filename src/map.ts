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
import { getHtmlElement } from "./utilities/html";
import { createPricelessOverPassLayer } from "./createPricelessOverPassLayer";

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
  getHtmlElement(".search").addEventListener("submit", (ev) => {
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
      .map((o) => o.edit.map((t) => t.replace(/=/gi, "/")).join(","))
      .filter((o) => o)
      .join(",");
    presets += (presets && p ? "," : "") + p;

    window.location.href = `https://www.openstreetmap.org/edit#editor=id&map=${zoom}/${
      latlng.lat
    }/${latlng.lng}${presets ? `&presets=${presets}` : ``}`;
  });

  moment.locale(local.code || "en");

  const attribution = [
    'Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> contributors',
    'POI via <a href="https://www.overpass-api.de/">Overpass API</a>',
  ];

  const osm = new L.TileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      opacity: 0.7,
      attribution: attribution.join(" | "),
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

  map.on("moveend", () => {
    const center = map.getCenter();
    const state = { lat: center.lat, lng: center.lng, zoom: map.getZoom() };
    set<State>("position", state);
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
        location: value,
      },
      hashchange
    );

    getJson<{ boundingbox: number[] }[]>(
      "https://nominatim.openstreetmap.org/search",
      {
        format: "json",
        q: value,
        limit: 1,
      },
      (r) => {
        const result = r[0];
        if (!result) return;
        map.flyToBounds([
          [result.boundingbox[0], result.boundingbox[2]],
          [result.boundingbox[1], result.boundingbox[3]],
        ]);
      }
    );
  }

  function hashchange() {
    const params = getHashParams();

    if (params["location"]) search(params["location"]);
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
  } else map.locate({ setView: true, maxZoom: 16 });

  map.on("popupopen", function (e) {
    const marker = (e as L.PopupEvent & { popup: { _source: L.Marker } }).popup
      ._source;
    const latLng = marker.getLatLng();
    setHashParams({ location: `${latLng.lat},${latLng.lng}` }, hashchange);
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

  const style = document.createElement("style");
  style.innerHTML = iconColors;
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
  layers[value] = createPricelessOverPassLayer(
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
      locale: localCode,
    });
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}
