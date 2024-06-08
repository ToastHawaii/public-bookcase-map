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

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { init } from "../client/init";
import { local } from "../client/en/local";
import "./initI18next";

export function App() {
  let { t } = useTranslation();

  useEffect(() => {
    init(local);
  });

  return (
    <>
      <div id="map"></div>
      <h1>
        <a href={`/docs/`}>
          <img
            className="book-exchange-icon"
            src="https://wiki.openstreetmap.org/w/images/b/b2/Public_bookcase-14.svg"
            style={{ width: "24px", verticalAlign: "text-bottom" }}
          />
          {t("meta.titleShort")}
        </a>
      </h1>
      <div className="box">
        <div className="container">
          <form className="search">
            <button className="geo" type="button">
              <i className="far fa-dot-circle"></i>
            </button>
            <input
              type="search"
              id="osm-search"
              placeholder={t("search.placeholder")}
              required
            />
            <button className="icon" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      <div className="info-container">
        <div className="info">
          <h4></h4>
          <span className="text"></span>
          <hr />
          <small>
            <details>
              <summary>
                <strong>{t("info.osmTags")}</strong>
              </summary>
              <br />
              <div className="wiki"></div>
              <strong>{t("info.query")}</strong>
              <code className="query"></code>
              <a className="link" target="_blank">
                {t("info.overpassTurbo")}
              </a>
            </details>
          </small>
          <small className="external"></small>
        </div>
        <button className="close-button">×</button>
      </div>
      <div className="menu-group collapsed">
        <button
          className="menu note help-text"
          type="button"
          title={t("menu.note")}
        >
          <i className="fas fa-comment-alt"></i>
        </button>
        <button
          className="menu edit help-text"
          type="button"
          title={t("menu.edit")}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <button
          className="menu share help-text"
          type="button"
          title={t("menu.share")}
        >
          <i className="fas fa-share-alt"></i>
        </button>
        <button
          className="menu theme theme-mode-dark-visible help-text"
          type="button"
          title={t("menu.theme")}
        >
          <i className="fas fa-circle"></i>
        </button>
        <button
          className="menu theme theme-mode-light-visible help-text"
          type="button"
          title={t("menu.theme")}
        >
          <i className="far fa-circle"></i>
        </button>
        <button
          className="menu theme theme-mode-system-visible help-text"
          type="button"
          title={t("menu.theme")}
        >
          <i className="fas fa-adjust"></i>
        </button>
        <a className="menu about help-text" title={t("menu.about")}>
          <i className="fas fa-info"></i>
        </a>
        <a
          className="menu donate help-text"
          target="_blank"
          title={t("menu.donate")}
        >
          <i className="fas fa-mug-hot"></i>
        </a>
      </div>
      <a className="menu toggle">
        <i className="fas fa-ellipsis-v"></i>
      </a>
    </>
  );
}
