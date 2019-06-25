var search;
var locate;

function publicBookCaseMap(local) {
  moment.locale(local.code || "en");

  var attr_side = `<a href="https://public-bookcase.github.io/${local.code}">${
    local.aboutThisSide
  }</a>`;
  var attr_osm =
    'Map data &copy; <a href="https://openstreetmap.org/">OpenStreetMap</a> contributors';
  var attr_overpass =
    'POI via <a href="https://www.overpass-api.de/">Overpass API</a>';

  var osm = new L.TileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      opacity: 0.7,
      attribution: [attr_side, attr_osm, attr_overpass].join(" | ")
    }
  );

  var map = new L.Map("map").addLayer(osm).setView(new L.LatLng(47.4, 8.5), 12);

  var opl = new L.OverPassLayer({
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
          address: {
            name:
              e.tags["name:" + (local.code || "en")] ||
              e.tags.name ||
              e.tags.operator ||
              e.tags.brand ||
              local.type[e.tags["public_bookcase:type"]] ||
              local.type.default,
            postcode: e.tags["addr:postcode"] || "",
            locality: e.tags["addr:city"] || "",
            street: e.tags["addr:street"] || "",
            houseNumber: e.tags["addr:housenumber"] || "",
            level: e.tags["level"] || "",
            latitude: e.lat,
            longitude: e.lon
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

        model.wheelchair = e.tags.wheelchair === "yes";
        model.light = e.tags.lit === "yes";
        model.indoor =
          e.tags.location === "indoor" ||
          e.tags["public_bookcase:type"] === "building" ||
          (e.tags.indoor && e.tags.indoor !== "no") ||
          (e.tags.building && e.tags.building !== "no");
        model.freeToTake = e.tags["reuse:policy"] === "free_to_take";
        model.freeToTakeOrGive =
          e.tags["reuse:policy"] === "free_to_take_or_give";
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
        ${
          model.address.name
            ? `<strong class="name fn">${model.address.name}</strong>`
            : ""
        }
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
          model.wheelchair
            ? `<span title="${
                local.wheelchair
              }" style="float:right;margin-left:5px;"><i class="fa fa-wheelchair"></i></span>`
            : ``
        }

        ${
          model.fee
            ? `<span title="${
                local.fee
              }" style="float:right;margin-left:5px;"><i class="fa fa-money"></i></span>`
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
         <a href="https://maps.apple.com/?ll=${model.address.latitude},${
          model.address.longitude
        }&q=${model.address.name}">
           ${local.route}
         </a>
         </small>
        </div>
        ${
          model.img
            ? `<br /><img class="img" style="max-width:300px;max-height:300px;" src="${
                model.img
              }"/>`
            : ``
        }
        ${
          model.description
            ? `<div>${!model.img ? `<br />` : ``}<small>${
                model.description
              }</small></div>`
            : ``
        }
        ${
          model.website || model.email || model.phone
            ? `
        <div>
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
          }
       </div>`
            : ``
        }</div>`;

        const popup = L.popup({
          minWidth: 200,
          autoPanPaddingTopLeft: [10, 85],
          autoPanPaddingBottomRight: [10, 10]
        }).setContent(function() {
          if (!isLoaded) {
            isLoaded = true;

            let request = new XMLHttpRequest();

            request.onreadystatechange = function() {
              if (request.readyState !== 4) return;
              if (request.status !== 200) return;

              let result = JSON.parse(request.responseText);

              model.address.name =
                e.tags.name ||
                e.tags.operator ||
                e.tags.brand ||
                result.namedetails.name ||
                result.namedetails.official_name ||
                local.type[e.tags["public_bookcase:type"]] ||
                local.type.default;
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
                model.address.name;
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
              "https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&namedetails=1&lat=" +
                e.lat +
                "&lon=" +
                e.lon
            );
            request.send();

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
  var current_position, current_accuracy;

  function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    if (current_position) {
      map.removeLayer(current_position);
      map.removeLayer(current_accuracy);
    }

    var radius = e.accuracy / 2;

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
}
