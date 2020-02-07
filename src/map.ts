import * as L from "leaflet";
import "leaflet-overpass-layer";
import * as opening_hours from "opening_hours";
import * as moment from "moment";
import { Solver } from "./coloriz/Solver";
import { Color, hexToRgb } from "./coloriz/Color";
import {
  toUrl,
  utilQsString,
  setHashParams,
  getHashParams
} from "./utilities/url";
import { Generator, Attribute } from "./Generator";
import { links } from "./links";
import {
  onImageLoaded,
  toWikimediaCommonsUrl,
  toMapillaryUrl
} from "./utilities/image";
import { toTitle, toLevel, toOpenOrClose } from "./view";

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

    window.location.href = `https://www.openstreetmap.org/edit#editor=id&map=${zoom}/${
      latlng.lat
    }/${latlng.lng}${presets ? `&presets=${presets}` : ``}`;
  });

  moment.locale(local.code || "en");

  const attrOsm =
    'Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> contributors';
  const attrOverpass =
    'POI via <a href="https://www.overpass-api.de/">Overpass API</a>';
  const attrSite = `<a href="https://book-exchange.zottelig.ch/${local.code}">${local.aboutThisSite}</a>`;

  const osm = new L.TileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      opacity: 0.7,
      attribution: [attrOsm, attrOverpass, attrSite].join(" | ")
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

    const request = new XMLHttpRequest();

    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const result = JSON.parse(request.responseText)[0];
        if (!result) return;

        map.flyToBounds([
          [result.boundingbox[0], result.boundingbox[2]],
          [result.boundingbox[1], result.boundingbox[3]]
        ]);
      }
    });

    setHashParams(
      {
        location: value
      },
      hashchange
    );

    request.open(
      "Get",
      "https://nominatim.openstreetmap.org/search?" +
        utilQsString({
          format: "json",
          q: value,
          limit: 1
        })
    );

    request.send();
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

  map.on("popupopen", function(e) {
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
  layers[value] = new (L as any).OverPassLayer({
    markerIcon: L.divIcon({
      className: "custom-div-icon",
      html:
        "<div style='background-color:" +
        (color || "#000000") +
        ";' class='marker-pin'></div><img class='" +
        value +
        "-icon' src='" +
        icon +
        "'>",
      iconSize: [36, 48],
      iconAnchor: [18, 48]
    }),
    minZoomIndicatorEnabled: true,
    minZoomIndicatorOptions: {
      position: "bottomleft",
      minZoomMessageNoLayer: local.minZoomMessageNoLayer,
      minZoomMessage: local.minZoomMessage
    },
    minZoom: 12,
    query: `(${query});out center;`,
    onSuccess(data: { elements: any[] }) {
      for (let i = 0; i < data.elements.length; i++) {
        let pos: { lat: number; lng: number };
        let marker;
        const e = data.elements[i];

        if (e.id in this._ids) continue;

        if (e.tags.access && e.tags.access === "no") continue;

        if (e.type === "node") {
          pos = L.latLng(e.lat, e.lon);
        } else {
          pos = L.latLng(e.center.lat, e.center.lon);
        }

        if (this.options.markerIcon) {
          marker = L.marker(pos, { icon: this.options.markerIcon });
        } else {
          marker = L.circle(pos, 20, {
            stroke: false,
            fillColor: "#E54041",
            fillOpacity: 0.9
          });
        }

        const model = {
          name: e.tags["name:" + (local.code || "en")] || e.tags.name,
          type:
            local["public_bookcase:type"][e.tags["public_bookcase:type"]] ||
            (e.tags.amenity === "library" &&
            e.tags.library !== "booksharing" &&
            e.tags.fee === "no"
              ? local.library
              : "") ||
            (e.tags.shop === "books" ? local.bookshop : "") ||
            (e.tags.amenity === "give_box" ? local.giveBox : "") ||
            local.default,
          operator: e.tags.operator || e.tags.brand,
          address: {
            name: "",
            postcode: e.tags["addr:postcode"] || "",
            locality: e.tags["addr:city"] || "",
            street: e.tags["addr:street"] || "",
            houseNumber: e.tags["addr:housenumber"] || "",
            level: e.tags["level"] || "",
            latitude: pos.lat,
            longitude: pos.lng
          },
          opening:
            parseOpeningHours(e.tags.service_times, local.code || "en") ||
            parseOpeningHours(e.tags.opening_hours, local.code || "en"),

          img: "",

          description: ""
        };

        model.img =
          model.img ||
          toWikimediaCommonsUrl(e.tags.wikimedia_commons) ||
          toMapillaryUrl(e.tags.mapillary) ||
          toUrl(e.tags.flickr) ||
          toWikimediaCommonsUrl(e.tags.image) ||
          toUrl(e.tags.picture) ||
          "";

        model.description = [
          e.tags["description:" + (local.code || "en")] || e.tags.description,
          e.tags["wheelchair:description"]
        ]
          .filter(el => el)
          .join(" ");

        const attributesGenerator = new Generator<M>(attributes);
        const linksGenerator = new Generator(links);

        let isLoaded = false;
        const contentElement = document.createElement("div");
        contentElement.innerHTML = `<div id="hcard-Name" class="vcard">
          <a style="float:right;" href="https://www.openstreetmap.org/edit?${
            e.type
          }=${
          e.id
        }"><i class="fas fa-pencil-alt"></i></a><strong class="name" title="${toTitle(
          model
        )}">${toTitle(model)}</strong>
        <div class="adr">
        
        ${attributesGenerator.render(local, e.tags, value, {} as M)}
        
         <div class="street-address">${model.address.street} ${
          model.address.houseNumber
        } ${toLevel(parseFloat(model.address.level), local)}</div>
            <span class="postal-code">${model.address.postcode}</span>
         <span class="region">${model.address.locality}</span>
        </div>
        ${
          model.opening
            ? `<br><div>${toOpenOrClose(model.opening, local)}</div>`
            : ``
        }
        <br/>
        <div class="geo">
         <small>
         <a href="https://maps.apple.com/?${utilQsString({
           ll: `${model.address.latitude},${model.address.longitude}`,
           q: toTitle(model)
         })}">
           ${local.route}
         </a>
         </small>
        </div>
        <div class="img-container">
        ${
          model.img ? `<br /><img class="img" dynamic-src="${model.img}"/>` : ``
        }
        </div>
        <div class="description">
        ${
          model.description
            ? `${!model.img ? `<br />` : ``}<small>${model.description}</small>`
            : ``
        }
        </div>
        <div class="contact">
        ${
          !linksGenerator.empty(e.tags, value, {})
            ? `
          <br />
          ${linksGenerator.render(local, e.tags, value, {})}`
            : ``
        }
        </div>
        </div>`;

        const popup = L.popup({
          minWidth: 200,
          autoPanPaddingTopLeft: [10, 85],
          autoPanPaddingBottomRight: [10, 10]
        }).setContent(() => {
          if (!isLoaded) {
            isLoaded = true;

            const img = contentElement.querySelector(
              ".img"
            ) as HTMLImageElement;
            if (img) img.src = img.getAttribute("dynamic-src") || img.src;

            {
              // Enrich Address

              const request = new XMLHttpRequest();

              request.addEventListener("readystatechange", () => {
                if (request.readyState !== 4 || request.status !== 200) return;

                const result = JSON.parse(request.responseText);

                model.address.name =
                  result.namedetails.name || result.namedetails.official_name;
                model.address.postcode =
                  model.address.postcode || result.address.postcode || "";
                model.address.locality =
                  model.address.locality ||
                  result.address.city ||
                  result.address.town ||
                  result.address.village ||
                  result.address.suburb ||
                  result.address.neighbourhood ||
                  result.address.state ||
                  result.address.county ||
                  "";
                if (!model.address.street) {
                  model.address.street =
                    result.address.path ||
                    result.address.footway ||
                    result.address.road ||
                    result.address.cycleway ||
                    result.address.pedestrian ||
                    result.address.farmyard ||
                    result.address.construction ||
                    result.namedetails.name ||
                    result.namedetails.official_name ||
                    result.address.neighbourhood ||
                    "";
                  model.address.houseNumber =
                    model.address.houseNumber ||
                    result.address.house_number ||
                    "";
                }

                const name = getHtmlElement(".name", contentElement);
                name.innerHTML = toTitle(model);
                name.title = toTitle(model);

                getHtmlElement(
                  ".street-address",
                  contentElement
                ).innerHTML = `${model.address.street} ${
                  model.address.houseNumber
                } ${toLevel(parseFloat(model.address.level), local)}`;

                getHtmlElement(".postal-code", contentElement).innerHTML =
                  model.address.postcode;
                getHtmlElement(".region", contentElement).innerHTML =
                  model.address.locality;

                popup.update();
              });
              request.open(
                "Get",
                "https://nominatim.openstreetmap.org/reverse?" +
                  utilQsString({
                    format: "json",
                    addressdetails: "1",
                    namedetails: "1",
                    lat: pos.lat,
                    lon: pos.lng
                  })
              );
              request.send();
            }

            {
              // Enrich Data
              const qid = e.tags.wikidata;

              const request = new XMLHttpRequest();

              request.addEventListener("readystatechange", () => {
                if (request.readyState !== 4 || request.status !== 200) return;

                const r = JSON.parse(request.responseText);

                if (r && r.error) return;
                if (!r.entities[qid]) return;

                const entity = r.entities[qid];

                let i;
                let description;
                if (
                  entity.descriptions &&
                  Object.keys(entity.descriptions).length > 0
                ) {
                  description =
                    entity.descriptions[Object.keys(entity.descriptions)[0]]
                      .value;
                }
                let label;
                if (entity.labels && Object.keys(entity.labels).length > 0) {
                  label = entity.labels[Object.keys(entity.labels)[0]].value;
                }

                const result: {
                  title: string;
                  description: string;
                  imageURL?: string;
                  wiki?: { title: string; url: string };
                } = {
                  title: label,
                  description: description
                };

                // add image
                if (entity.claims) {
                  const imageroot = "https://commons.wikimedia.org/w/index.php";
                  const props = ["P154", "P18"]; // logo image, image
                  let prop;
                  let image;
                  for (i = 0; i < props.length; i++) {
                    prop = entity.claims[props[i]];
                    if (prop && Object.keys(prop).length > 0) {
                      image =
                        prop[Object.keys(prop)[0]].mainsnak.datavalue.value;
                      if (image) {
                        result.imageURL = `${imageroot}?${utilQsString({
                          title: "Special:Redirect/file/" + image,
                          width: 300
                        })}`;
                      }
                      break;
                    }
                  }
                }

                if (entity.sitelinks) {
                  // check each, in order of preference
                  const w = (local.code || "en") + "wiki";
                  if (entity.sitelinks[w]) {
                    const title = entity.sitelinks[w].title;

                    result.wiki = {
                      title: title,
                      url: `https://${local.code ||
                        "en"}.wikipedia.org/wiki/${title.replace(/ /g, "_")}`
                    };
                  }
                }

                model.name =
                  model.name ||
                  result.title ||
                  (result.wiki && result.wiki.title);
                model.description = model.description || result.description;
                model.img = model.img || result.imageURL || "";

                getHtmlElement(".name", contentElement).innerHTML = toTitle(
                  model
                );
                getHtmlElement(".name", contentElement).title = toTitle(model);
                getHtmlElement(
                  ".description",
                  contentElement
                ).innerHTML = model.description
                  ? `${!model.img ? `<br />` : ``}<small>${
                      model.description
                    }</small>`
                  : ``;
                getHtmlElement(
                  ".img-container",
                  contentElement
                ).innerHTML = model.img
                  ? `<br /><img class="img" src="${model.img}"/>`
                  : ``;

                getHtmlElement(
                  ".contact",
                  contentElement
                ).innerHTML = !linksGenerator.empty(e.tags, value, {
                  website: result.wiki ? result.wiki.url : undefined
                })
                  ? `
                  <br />
                  ${linksGenerator.render(local, e.tags, value, {
                    website: result.wiki ? result.wiki.url : undefined
                  })}`
                  : ``;

                if (model.img) {
                  onImageLoaded(model.img, (loaded: boolean) => {
                    if (!loaded) {
                      getHtmlElement(
                        ".img",
                        contentElement
                      ).outerHTML = `<a class="img" href="${model.img}" target="_blank"><i class="far fa-image fa-2x"></i></a>`;
                    }

                    popup.update();
                  });
                }

                popup.update();
              });
              request.open(
                "Get",
                "https://www.wikidata.org/w/api.php?" +
                  utilQsString({
                    format: "json",
                    action: "wbgetentities",
                    formatversion: "2",
                    ids: qid,
                    props: "labels|descriptions|claims|sitelinks",
                    sitefilter: (local.code || "en") + "wiki",
                    languages: local.code || "en",
                    languagefallback: "0",
                    origin: "*"
                  })
              );
              request.send();
            }

            if (model.img) {
              onImageLoaded(model.img, (loaded: boolean) => {
                if (!loaded)
                  getHtmlElement(
                    ".img",
                    contentElement
                  ).outerHTML = `<a class="img" href="${model.img}" target="_blank"><i class="far fa-image fa-2x"></i></a>`;

                popup.update();
              });
            }
          }

          return contentElement;
        });

        marker.bindPopup(popup);
        this._markers.addLayer(marker);
      }
    }
  });

  map.addLayer(layers[value]);
}

function getHtmlElement<K extends keyof HTMLElementTagNameMap>(
  selectors: K,
  contentElement?: ParentNode
): HTMLElementTagNameMap[K];
function getHtmlElement(
  selectors: string,
  contentElement?: ParentNode
): HTMLElement;
function getHtmlElement(
  selectors: string,
  contentElement: ParentNode = document
): HTMLElement {
  const element = contentElement.querySelector(selectors);

  if (!element) throw `Element ${selectors} not found.`;

  return element as HTMLElement;
}

function parseOpeningHours(openingHours: string, localCode: string) {
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

function set<T extends {}>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function get<T extends {}>(key: string): T | undefined {
  const v = localStorage.getItem(key);
  if (!v) return undefined;
  return JSON.parse(v);
}
