var search;
var locate;

function publicBookCaseMap(local) {
  moment.locale(local.code || "en");

  let attr_site = `<a href="https://public-bookcase.github.io/${local.code}">${
    local.aboutThisSite
  }</a>`;
  let attr_osm =
    'Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> contributors';
  let attr_overpass =
    'POI via <a href="https://www.overpass-api.de/">Overpass API</a>';

  let osm = new L.TileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      opacity: 0.7,
      attribution: [attr_site, attr_osm, attr_overpass].join(" | ")
    }
  );

  let map = new L.Map("map").addLayer(osm).setView(new L.LatLng(47.4, 8.5), 12);

  let opl = new L.OverPassLayer({
    markerIcon: L.icon({
      iconUrl:
        "https://wiki.openstreetmap.org/w/images/b/b2/Public_bookcase-14.svg",
      iconSize: [28, 28]
    }),
    minZoomIndicatorEnabled: true,
    minZoomIndicatorOptions: {
      position: "topleft",
      minZoomMessageNoLayer: local.minZoomMessageNoLayer,
      minZoomMessage: local.minZoomMessage
    },
    minZoom: 12,
    query: `
    (
      // Public bookcases
      node["amenity"="public_bookcase"]({{bbox}});
      way["amenity"="public_bookcase"]({{bbox}});  

      // Reuse facility for books
      node["reuse:books"]({{bbox}});
      way["reuse:books"]({{bbox}});

      // Library for booksharing
      node["library"="booksharing"]({{bbox}});
      way["library"="booksharing"]({{bbox}});

      // Givebox
      node["amenity"="givebox"]({{bbox}});
      way["amenity"="givebox"]({{bbox}});

      // Library free of charge
      node["amenity"="library"]["fee"="no"]({{bbox}});
      way["amenity"="library"]["fee"="no"]({{bbox}});
      
      // Vending machine with free books
      node["amenity"="vending_machine"]["vending"="books"]["fee"="no"]({{bbox}});
      way["amenity"="vending_machine"]["vending"="books"]["fee"="no"]({{bbox}});

      // Charity book shop
      node["shop"="books"]["charity"="yes"]({{bbox}});
      way["shop"="books"]["charity"="yes"]({{bbox}});
      node["shop"="charity"]["books"]({{bbox}});
      way["shop"="charity"]["books"]({{bbox}});
    );
    out center qt;`,
    onSuccess(data) {
      for (let i = 0; i < data.elements.length; i++) {
        let pos;
        let marker;
        const e = data.elements[i];

        if (e.id in this._ids) continue;

        if (e.tags.books === "no") continue;

        this._ids[e.id] = true;

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

        let model = {
          name:
            e.tags["name:" + (local.code || "en")] ||
            e.tags.name ||
            e.tags.operator ||
            e.tags.brand,
          type:
            local.type[e.tags["public_bookcase:type"]] ||
            (e.tags.amenity !== "public_bookcase" &&
            e.tags.amenity === "library" &&
            e.tags.library !== "booksharing" &&
            e.tags.fee === "no"
              ? local.type.library
              : "") ||
            (e.tags.shop === "books" ? local.type.bookshop : "") ||
            local.type.default,
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
          hasOpeningHours: !!e.tags.opening_hours,
          opening: new opening_hours(e.tags.opening_hours || "Th", null, {
            locale: local.code || "en"
          }),
          img: "",

          wheelchair: false,
          light: false,
          indoor: false,
          freeToTakeOrGive: false,
          freeToTake: false,
          borrow: false,
          customersOnly: false,
          capacity: "",
          fee: false,

          website: "",
          email: "",
          phone: "",

          description: ""
        };

        if (!model.img && e.tags.mapillary)
          model.img = `https://d1cuyjsrcm0gby.cloudfront.net/${
            e.tags.mapillary
          }/thumb-320.jpg`;

        model.img =
          model.img ||
          toWikimediaCommensUrl(e.tags.image) ||
          toWikimediaCommensUrl(e.tags.wikimedia_commons) ||
          e.tags.flickr ||
          e.tags.image ||
          e.tags.wikimedia_commons ||
          e.tags.picture;

        switch(e.tags.wheelchair) {
          case "yes":
          case "designated":
            model.wheelchair = true;
            model.wheelchairAccesIcon = "fa-check-circle";
            break;
          case "limited":
            model.wheelchair = true;
            model.wheelchairAccesIcon = "fa-exclamation-circle";
            break;
          case "no":
            model.wheelchair = true;
            model.wheelchairAccesIcon = "fa-times-circle";
            break;
          default:
            // do not display icon for others values or undefined
            model.wheelchair = false;
            break;
        }

        model.light = e.tags.lit === "yes";
        model.indoor =
          e.tags.location === "indoor" ||
          e.tags["public_bookcase:type"] === "building" ||
          (e.tags.indoor && e.tags.indoor !== "no") ||
          (e.tags.building && e.tags.building !== "no");
        model.freeToTake = e.tags["reuse:policy"] === "free_to_take";
        model.freeToTakeOrGive =
          e.tags["reuse:policy"] === "free_to_take_or_give";
        model.borrow =
          e.tags.amenity !== "public_bookcase" &&
          e.tags.amenity === "library" &&
          e.tags.library !== "booksharing" &&
          e.tags.fee === "no";
        model.customersOnly = e.tags["access"] === "customers";
        model.capacity = e.tags.capacity;
        model.fee = e.tags.fee === "yes" || !!e.tags.shop;
        model.website =
          model.website ||
          e.tags.website ||
          (e.tags.wikipedia
            ? `https://wikipedia.org/wiki/${e.tags.wikipedia}`
            : ``) ||
          e.tags.url ||
          e.tags["contact:website"];
        model.email = model.email || e.tags.email || e.tags["contact:email"];
        model.phone =
          model.phone ||
          e.tags.phone ||
          e.tags["contact:phone"] ||
          e.tags["contact:mobile"];
        model.description = [
          e.tags["description:" + (local.code || "en")] || e.tags.description,
          e.tags["wheelchair:description"]
        ]
          .filter(function(el) {
            return el;
          })
          .join(" ");

        let isLoaded = false;
        const contentElement = document.createElement("div");

        contentElement.innerHTML = `<div id="hcard-Name" class="vcard">
        ${`<strong class="name">${model.name ||
          model.address.name ||
          model.type}</strong>${
          new URL(window.location.href).searchParams.get("edit")
            ? ` <a href="https://www.openstreetmap.org/edit?${e.type}=${
                e.id
              }"><i class="fa fa-pencil"></i></a>`
            : ""
        }`}
        <div class="adr">
        
        ${
          model.capacity
            ? `<span title="${
                local.capacity
              }" style="float:right;margin-left:5px;"><i class="fa fa-book"></i> ${
                model.capacity
              }</span>`
            : ``
        }

        ${
          model.freeToTake
            ? `<span title="${
                local.freeToTake
              }" style="float:right;margin-left:5px;"><i class="fa fa-long-arrow-left"></i></span>`
            : ``
        }
        
        ${
          model.freeToTakeOrGive
            ? `<span title="${
                local.freeToTakeOrGive
              }" style="float:right;margin-left:5px;"><i class="fa fa-exchange"></i></span>`
            : ``
        }

        ${
          model.borrow
            ? `<span title="${
                local.borrow
              }" style="float:right;margin-left:5px;"><i class="fa fa-repeat"></i></span>`
            : ``
        }

        ${
          model.indoor
            ? `<span title="${
                local.indoor
              }" style="float:right;margin-left:5px;"><i class="fa fa-building-o"></i></span>`
            : ``
        }
        
        ${
          model.light
            ? `<span title="${
                local.light
              }" style="float:right;margin-left:5px;"><i class="fa fa-lightbulb-o"></i></span>`
            : ``
        }
        
        ${
          model.customersOnly
            ? `<span title="${
                local.customersOnly
              }" style="float:right;margin-left:5px;"><i class="fa fa-ticket"></i></span>`
            : ``
        }

        ${
          model.fee
            ? `<span title="${
                local.fee
              }" style="float:right;margin-left:5px;"><i class="fa fa-money"></i></span>`
            : ``
        }

        ${
          model.wheelchair
            ? `<span title="${
                local.wheelchair
              }" style="float:right;margin-left:5px;"><i class="fa fa-wheelchair"></i> <i class="fa ${
                model.wheelchairAccesIcon
              }"></i></span>`
            : ``
        }
        
         <div class="street-address">${model.address.street} ${
          model.address.houseNumber
        } ${toDisplayLevel(parseFloat(model.address.level), local)}</div>
            <span class="postal-code">${model.address.postcode}</span>
         <span class="region">${model.address.locality}</span>
        </div>
     ${
       model.hasOpeningHours
         ? `<br><div>${getDisplayString(model.opening)}</div>`
         : ``
     }  <br>
        <div class="geo">
         <small>
         <a href="https://maps.apple.com/?${utilQsString({
           ll: `${model.address.latitude},${model.address.longitude}`,
           q: model.name || model.address.name || model.type
         })}">
           ${local.route}
         </a>
         </small>
        </div>
        <div class="img-container">
        ${
          model.img
            ? `<br /><img class="img" style="max-width:300px;max-height:300px;image-orientation:from-image;" src="${
                model.img
              }"/>`
            : ``
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
          model.website || model.email || model.phone
            ? `
          <br />
          ${
            model.website
              ? `<a href="${validateUrl(
                  model.website
                )}" target="_blank"><i class="fa fa-globe fa-lg"></i></a>&ensp;`
              : ``
          } 
          ${
            model.email
              ? `<a href="mailto:${
                  model.email
                }" target="_blank"><i class="fa fa-envelope fa-lg"></i></a>&ensp;`
              : ``
          } 
          ${
            model.phone
              ? `<a href="tel:${
                  model.phone
                }" target="_blank"><i class="fa fa-phone fa-lg"></i></a>&ensp;`
              : ``
          }`
            : ``
        }
        </div>
        </div>`;

        const popup = L.popup({
          minWidth: 200,
          autoPanPaddingTopLeft: [10, 85],
          autoPanPaddingBottomRight: [10, 10]
        }).setContent(function() {
          if (!isLoaded) {
            isLoaded = true;

            {
              // Enrich Address

              let request = new XMLHttpRequest();

              request.onreadystatechange = function() {
                if (request.readyState !== 4) return;
                if (request.status !== 200) return;

                let result = JSON.parse(request.responseText);

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

                contentElement.querySelector(".name").innerHTML =
                  model.name || model.address.name || model.type;
                contentElement.querySelector(".street-address").innerHTML = `${
                  model.address.street
                } ${model.address.houseNumber} ${toDisplayLevel(
                  parseFloat(model.address.level),
                  local
                )}`;
                contentElement.querySelector(".postal-code").innerHTML =
                  model.address.postcode;
                contentElement.querySelector(".region").innerHTML =
                  model.address.locality;

                popup.update();
              };
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
              let qid = e.tags.wikidata;

              let request = new XMLHttpRequest();

              request.onreadystatechange = function() {
                if (request.readyState !== 4) return;
                if (request.status !== 200) return;

                let r = JSON.parse(request.responseText);

                if (r && r.error) return;
                if (!r.entities[qid]) return;

                let entity = r.entities[qid];

                var i;
                var description;
                if (
                  entity.descriptions &&
                  Object.keys(entity.descriptions).length > 0
                ) {
                  description =
                    entity.descriptions[Object.keys(entity.descriptions)[0]]
                      .value;
                }
                var label;
                if (entity.labels && Object.keys(entity.labels).length > 0) {
                  label = entity.labels[Object.keys(entity.labels)[0]].value;
                }

                // prepare result
                // {
                //   title:        'string',
                //   description:  'string',
                //   imageURL:     'string',
                //   wiki:         { title: 'string', url: 'string' }
                // }
                var result = {
                  title: label,
                  description: description
                };

                // add image
                if (entity.claims) {
                  var imageroot = "https://commons.wikimedia.org/w/index.php";
                  var props = ["P154", "P18"]; // logo image, image
                  var prop, image;
                  for (i = 0; i < props.length; i++) {
                    prop = entity.claims[props[i]];
                    if (prop && Object.keys(prop).length > 0) {
                      image =
                        prop[Object.keys(prop)[0]].mainsnak.datavalue.value;
                      if (image) {
                        result.imageURL =
                          imageroot +
                          "?" +
                          utilQsString({
                            title: "Special:Redirect/file/" + image,
                            width: 300
                          });
                      }
                      break;
                    }
                  }
                }

                if (entity.sitelinks) {
                  // check each, in order of preference
                  var w = (local.code || "en") + "wiki";
                  if (entity.sitelinks[w]) {
                    var title = entity.sitelinks[w].title;

                    result.wiki = {
                      title: title,
                      url:
                        "https://" +
                        (local.code || "en") +
                        ".wikipedia.org/wiki/" +
                        title.replace(/ /g, "_")
                    };
                  }
                }

                model.name =
                  model.name ||
                  result.title ||
                  (result.wiki && result.wiki.title);
                model.description = model.description || result.description;
                model.img = model.img || result.imageURL;
                model.website =
                  model.website || (result.wiki && result.wiki.url);

                contentElement.querySelector(".name").innerHTML =
                  model.name || model.address.name || model.type;
                contentElement.querySelector(
                  ".description"
                ).innerHTML = model.description
                  ? `${!model.img ? `<br />` : ``}<small>${
                      model.description
                    }</small>`
                  : ``;
                contentElement.querySelector(
                  ".img-container"
                ).innerHTML = model.img
                  ? `<br /><img class="img" style="max-width:300px;max-height:300px;image-orientation:from-image;" src="${
                      model.img
                    }"/>`
                  : ``;

                contentElement.querySelector(".contact").innerHTML =
                  model.website || model.email || model.phone
                    ? `
                  <br />
                  ${
                    model.website
                      ? `<a href="${validateUrl(
                          model.website
                        )}" target="_blank"><i class="fa fa-globe fa-lg"></i></a>&ensp;`
                      : ``
                  } 
                  ${
                    model.email
                      ? `<a href="mailto:${
                          model.email
                        }" target="_blank"><i class="fa fa-envelope fa-lg"></i></a>&ensp;`
                      : ``
                  } 
                  ${
                    model.phone
                      ? `<a href="tel:${
                          model.phone
                        }" target="_blank"><i class="fa fa-phone fa-lg"></i></a>&ensp;`
                      : ``
                  }`
                    : ``;

                if (model.img) {
                  onImageLoaded(model.img, function(loaded) {
                    if (!loaded) {
                      contentElement.querySelector(
                        ".img"
                      ).outerHTML = `<a class="img" href="${validateUrl(
                        model.img
                      )}" target="_blank"><i class="fa fa-photo fa-2x"></i></a>`;
                    }

                    popup.update();
                  });
                }

                popup.update();
              };
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
              onImageLoaded(model.img, function(loaded) {
                if (!loaded) {
                  contentElement.querySelector(
                    ".img"
                  ).outerHTML = `<a class="img" href="${validateUrl(
                    model.img
                  )}" target="_blank"><i class="fa fa-photo fa-2x"></i></a>`;
                }

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

  // placeholders for the L.marker and L.circle representing user's current position and accuracy
  let current_position, current_accuracy;

  function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    if (current_position) {
      map.removeLayer(current_position);
      map.removeLayer(current_accuracy);
    }

    let radius = e.accuracy / 2;

    current_position = L.marker(e.latlng).addTo(map);

    current_accuracy = L.circle(e.latlng, radius).addTo(map);

    map.locate({ watch: false, maxZoom: 16 });

    map.addLayer(opl);
  }

  function onLocationError(e) {
    map.addLayer(opl);
  }

  map.on("locationfound", onLocationFound);
  map.on("locationerror", onLocationError);

  locate = function() {
    map.stopLocate();
    map.locate({ setView: true, maxZoom: 16 });

    return false;
  };

  search = function(value) {
    value = value || document.getElementById("osm-search").value;

    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          let result = JSON.parse(request.responseText)[0];
          if (!result) return;

          map.flyToBounds([
            [result.boundingbox[0], result.boundingbox[2]],
            [result.boundingbox[1], result.boundingbox[3]]
          ]);
        }
      }
    };

    setHash(value);

    request.open(
      "Get",
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}&limit=1`
    );

    request.send();

    return false;
  };

  function hashchange() {
    if (window.location.hash && window.location.hash.substr(1))
      search(window.location.hash.substr(1));
  }

  function setHash(hash) {
    window.removeEventListener("hashchange", hashchange);
    window.location.hash = "#" + hash;
    setTimeout(function() {
      window.addEventListener("hashchange", hashchange);
    }, 0);
  }

  window.addEventListener("hashchange", hashchange);

  if (window.location.hash && window.location.hash.substr(1)) {
    search(window.location.hash.substr(1));
    map.locate({ setView: false, maxZoom: 16 });
  } else map.locate({ setView: true, maxZoom: 16 });

  map.on("popupopen", function(e) {
    const marker = e.popup._source;
    const latLng = marker.getLatLng();
    setHash(`${latLng.lat},${latLng.lng}`);
  });

  function toWikimediaCommensUrl(source) {
    if (!source) return "";

    let fileName = "";

    if (source.toUpperCase().startsWith("File:".toUpperCase()))
      fileName = source.substring(5, source.length);
    else if (
      decodeURI(source)
        .toUpperCase()
        .startsWith("https://commons.wikimedia.org/wiki/File:".toUpperCase())
    )
      fileName = decodeURI(source).substring(40, source.length);
    else if (
      decodeURI(source)
        .toUpperCase()
        .startsWith("http://commons.wikimedia.org/wiki/File:".toUpperCase())
    )
      fileName = decodeURI(source).substring(39, source.length);

    if (!fileName) return "";

    fileName = fileName.replace(/ /g, "_");

    const hash = md5(fileName);
    return `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash.substring(
      0,
      1
    )}/${hash.substring(0, 2)}/${fileName}/320px-${fileName}`;
  }

  function getDisplayString(oh) {
    let output = "";
    if (oh.getUnknown()) {
      output = `<span class="open">${local.maybeOpen}</span>`(
        oh.getComment()
          ? local.thatDependsOn + ': "' + oh.getComment() + '"'
          : ""
      );
    } else {
      output =
        (oh.getState()
          ? `<span class="open">${local.open}</span>`
          : `<span class="closed">${local.closed}</span>`) +
        (oh.getComment() ? ` "${oh.getComment()}"` : ``);
    }
    if (
      typeof oh.getNextChange() !== `undefined` &&
      oh.getState() !== oh.getState(oh.getNextChange()) &&
      moment(oh.getNextChange()).diff(moment(), "weeks") <= 2
    ) {
      output += ` - `;

      if (oh.getUnknown(oh.getNextChange()))
        output += oh.getState() ? local.maybeCloses : local.maybeOpens;
      else output += oh.getState() ? local.closes : local.opens;

      output += ` ${moment(oh.getNextChange()).calendar()} ${
        oh.getComment(oh.getNextChange())
          ? ` "${oh.getComment(oh.getNextChange())}"`
          : ``
      }`;
    }

    return output;
  }

  function validateUrl(url) {
    url = decodeURI(url);
    if (!/^https?:\/\//i.test(url)) {
      return "http://" + url;
    }
    return url;
  }

  function onImageLoaded(src, handler) {
    const img = new Image();
    img.addEventListener("load", function() {
      handler(true);
    });
    img.addEventListener("error", function() {
      handler(false);
    });
    img.src = src;
    if (img.complete) {
      handler(true);
    }
  }

  function toDisplayLevel(level, local) {
    if (!isNumeric(level)) return ``;

    if (level === 0) return local.groundFloor(level);

    if (level < 0) return local.basement(level);

    if (level > 0) return local.floor(level);

    return ``;
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  
  function utilQsString(obj, noencode) {
    // encode everything except special characters used in certain hash parameters:
    // "/" in map states, ":", ",", {" and "}" in background
    function softEncode(s) {
      return encodeURIComponent(s).replace(
        /(%2F|%3A|%2C|%7B|%7D)/g,
        decodeURIComponent
      );
    }

    return Object.keys(obj)
      .sort()
      .map(function(key) {
        return (
          encodeURIComponent(key) +
          "=" +
          (noencode ? softEncode(obj[key]) : encodeURIComponent(obj[key]))
        );
      })
      .join("&");
  }
}
