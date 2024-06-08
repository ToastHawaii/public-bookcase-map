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
import "./initI18next";
import { useTranslation } from "react-i18next";
import { App } from "./App";

export function Root(attributes: {
  lang: string;
  color: string;
  baseUrl: string;
}) {
  let { t } = useTranslation();
  return (
    <html className="help" lang={attributes.lang}>
      <head>
        <title>{t("meta.title")}</title>
        <meta charSet="utf-8" />
        <link rel="manifest" href={`/manifest.${attributes.lang}.json`} />
        <meta
          name="viewport"
          content="width=device-width, target-densitydpi=device-dpi, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content={t("meta.description")} />

        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={t("meta.titleShort")} />
        <meta
          name="apple-mobile-web-app-title"
          content={t("meta.titleShort")}
        />
        <meta name="theme-color" content={attributes.color} />
        <meta name="msapplication-navbutton-color" content={attributes.color} />
        <meta name="msapplication-starturl" content="/" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="mask-icon"
          href="/icons/safari-pinned-tab.svg"
          color={attributes.color}
        />
        <link rel="shortcut icon" href="/icons/favicon.ico" />
        <meta name="msapplication-TileColor" content={attributes.color} />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />

        <link rel="stylesheet" href="/lib/leaflet.css" type="text/css" />
        <link rel="stylesheet" href="/lib/OverPassLayer.css" type="text/css" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"
          media="print"
        />

        <meta name="monetization" content="$ilp.uphold.com/BwpBDr48YqPi" />

        <script src="/serviceWorkerRegister.js"></script>
      </head>

      <body>
        <App></App>
        <script
          async
          src="https://code.jquery.com/jquery-1.12.4.min.js"
          integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
          crossOrigin="anonymous"
        ></script>
        <script
          async
          type="text/javascript"
          src="https://taginfo.openstreetmap.org/js/taglists.js"
        ></script>
      </body>
    </html>
  );
}