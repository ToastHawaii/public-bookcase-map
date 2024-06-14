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

import { initMap } from "../osm-app-component";
import { filters } from "./filters";
import "../osm-app-component/style.scss";
import { attributes } from "./attributes";
import { TFunction } from "i18next";

export function init(t: TFunction<"translation", undefined>) {
  initMap(
    "https://book-exchange.zottelig.ch/",
    filters,
    attributes,
    t,
    tags => {
      if (tags.access && tags.access === "no") return true;
      return false;
    },
    12
  );
}
