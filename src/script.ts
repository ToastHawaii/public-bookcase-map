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
