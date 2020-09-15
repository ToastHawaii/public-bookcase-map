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

function nw(tag: string) {
  return `node${tag};
way${tag};`;
}

export const filters: {
  value: string;
  icon: string;
  query: string;
  color: string;
  edit: string[];
}[] = [
  {
    value: "book-exchange",
    icon: "https://wiki.openstreetmap.org/w/images/b/b2/Public_bookcase-14.svg",
    query: `
    // Public bookcases
    ${nw(`["amenity"="public_bookcase"]`)}

    // Givebox
    ${nw(`["amenity"="give_box"]`)}

    // Library free of charge
    ${nw(`["amenity"="library"]["fee"="no"]`)}

    // Charity book shop
    ${nw(`["shop"="books"]["charity"="yes"]`)}
    ${nw(`["shop"="charity"]["books"]`)}
    
    // FreeStore
    ${nw(`["shop"="freestore"]`)}
    ${nw(`["shop"="charity"]["payment:none"="yes"]`)}
    ${nw(`["shop"="second_hand"]["payment:none"="yes"]`)}

    ${nw(`["shop"="charity"]["fee"="no"]`)}
    ${nw(`["shop"="second_hand"]["fee"="no"]`)}`,
    color: "#A0522D",
    edit: ["amenity=public_bookcase", "amenity=library", "amenity", "shop"]
  }
];
