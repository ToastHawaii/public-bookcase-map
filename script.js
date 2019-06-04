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

  var map = new L.Map("map").addLayer(osm).setView(new L.LatLng(47, 8), 10);

  var opl = new L.OverPassLayer({
    markerIcon: L.icon({
      iconUrl:
        "https://wiki.openstreetmap.org/w/images/b/b2/Public_bookcase-14.svg",
      iconSize: [28, 28]
    }),
    minZoomIndicatorEnabled: false,
    minZoom: 10,
    query: '(node["amenity"="public_bookcase"]({{bbox}}););out qt;',
    onSuccess(data) {
      for (let i = 0; i < data.elements.length; i++) {
        let pos;
        let marker;
        const e = data.elements[i];

        if (e.id in this._ids) {
          continue;
        }

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
              e.tags.name ||
              e.tags.operator ||
              e.tags.brand ||
              local.type[e.tags["public_bookcase:type"]] ||
              local.type.default,
            postcode: e.tags["addr:postcode"] || "",
            locality: e.tags["addr:city"] || "",
            street: e.tags["addr:street"] || "",
            houseNumber: e.tags["addr:housenumber"] || "",
            latitude: e.lat,
            longitude: e.lon
          },
          hasOpeningHours: !!e.tags.opening_hours,
          opening: new opening_hours(e.tags.opening_hours || "Th", null, {
            locale: local.code || "en"
          }),
          img: "",
          imgExtern: false,

          wheelchair: false,
          light: false,
          indoor: false,
          capacity: "",

          website: "",
          email: "",
          phone: ""
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
        model.indoor = e.tags.location === "indoor" || e.tags.indoor === "yes";
        model.capacity = e.tags.capacity;
        model.website =
          model.website ||
          e.tags.website ||
          (e.tags.wikipedia
            ? `https://wikipedia.org/wiki/${e.tags.wikipedia}`
            : ``) ||
          e.tags.url ||
          e.tags["contact:website"];
        model.email = model.email || e.tags.email || e.tags["contact:email"];
        model.phone = model.phone || e.tags.phone || e.tags["contact:phone"];

        let loaded = false;
        const popup = L.popup({
          minWidth: 200,
          autoPanPaddingTopLeft: [10, 85],
          autoPanPaddingBottomRight: [10, 10]
        }).setContent(function() {
          if (!loaded) {
            loaded = true;

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

              popup.update();
              setTimeout(function() {
                popup.update();
              }, 100);
              if (model.img) {
                const imageElement = new Image();
                imageElement.onload = function() {
                  setTimeout(function() {
                    popup.update();
                  }, 1);
                };
                imageElement.src = model.img;
              }
            };

            request.open(
              "Get",
              "https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&namedetails=1&lat=" +
                e.lat +
                "&lon=" +
                e.lon
            );

            request.send();
          }

          const el = document.createElement("div");
          el.innerHTML = `<div id="hcard-Name" class="vcard">
                  ${
                    model.address.name
                      ? `<strong class="fn">${model.address.name}</strong>`
                      : ""
                  }
                  <div class="adr">
                  
                  ${
                    model.capacity
                      ? `<span style="float:right;margin-left:5px;"><i class="fa fa-book"></i> ${
                          model.capacity
                        }</span>`
                      : ``
                  }

                  ${
                    model.indoor
                      ? `<span style="float:right;margin-left:5px;"><i class="fa fa-building-o"></i></span>`
                      : ``
                  }
                  
                  ${
                    model.light
                      ? `<span style="float:right;margin-left:5px;"><i class="fa fa-lightbulb-o"></i></span>`
                      : ``
                  }

                  ${
                    model.wheelchair
                      ? `<span style="float:right;margin-left:5px;"><i class="fa fa-wheelchair"></i></span>`
                      : ``
                  }
                  
                   <div class="street-address">${model.address.street} ${
            model.address.houseNumber
          }</div>
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
                   <a href="https://maps.apple.com/?ll=${
                     model.address.latitude
                   },${model.address.longitude}&q=${model.address.name}">
                     ${local.route}
                   </a>
                   </small>
                  </div>
                  ${
                    model.img
                      ? !model.imgExtern
                        ? `<br /><img style="max-width:300px;max-height:300px;" src="${
                            model.img
                          }"/>`
                        : `<br /><a href="${validateUrl(
                            model.img
                          )}" target="_blank"><i class="fa fa-photo fa-2x"></i></a>`
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

          return el;
        });

        if (model.img) {
          const imageElement = new Image();
          imageElement.onload = function() {
            setTimeout(function() {
              popup.update();
            }, 1);
          };
          imageElement.onerror = function() {
            model.imgExtern = true;
            setTimeout(function() {
              popup.update();
            }, 1);
          };
          imageElement.src = model.img;
        }

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
      oh.getState() !==
        oh.getState(
          oh.getNextChange() &&
            moment().diff(moment(oh.getNextChange()), "weeks") > 2
        )
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
}
