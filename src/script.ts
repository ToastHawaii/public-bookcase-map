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

import { initMap } from "./map";
import { filters } from "./filters";
import { attributes } from "./attributes";
import { local } from "./local";
import { local as deLocal } from "./de/local";

initMap(
  filters,
  attributes,
  document.documentElement.lang === "de" ? deLocal : local
);

import { createElement } from "./utilities/html";

document.addEventListener("click", e => {
  const titleElement = document.querySelector(".attribut .title");
  if (titleElement) titleElement.remove();

  for (const target of e.composedPath()) {
    if (
      target &&
      (target as HTMLElement).classList &&
      (target as HTMLElement).classList.contains("attribut")
    ) {
      const titleElement = createElement(
        "span",
        (target as HTMLElement).title,
        ["title"]
      );

      (target as HTMLElement).append(titleElement);

      setTimeout(() => {
        titleElement.remove();
      }, 2000);
    }
  }
});
