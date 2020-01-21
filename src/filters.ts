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

    // Reuse facility
    ${nw(`["amenity"="reuse"][!"reuse:books"]`)}
    ${nw(`["reuse:books"]["reuse:books"!="no"]`)}

    // Library for booksharing
    ${nw(`["library"="booksharing"]`)}

    // Givebox
    ${nw(`["amenity"="give_box"]`)}
    ${nw(`["amenity"="givebox"]`)}

    // Library free of charge
    ${nw(`["amenity"="library"]["fee"="no"]`)}
    
    // Vending machine with free books
    ${nw(`["amenity"="vending_machine"]["vending"="books"]["fee"="no"]`)}

    // Charity book shop
    ${nw(`["shop"="books"]["charity"="yes"]`)}
    ${nw(`["shop"="charity"]["books"]`)}
    
    // FreeStore
    ${nw(`["shop"="charity"]["payment:none"="yes"]`)}
    ${nw(`["shop"]["charity"="yes"]["payment:none"="yes"]`)}
    ${nw(`["shop"="second_hand"]["payment:none"="yes"]`)}
    ${nw(`["shop"]["second_hand"="yes"]["payment:none"="yes"]`)}

    ${nw(`["shop"="charity"]["fee"="no"]`)}
    ${nw(`["shop"]["charity"="yes"]["fee"="no"]`)}
    ${nw(`["shop"="second_hand"]["fee"="no"]`)}
    ${nw(`["shop"]["second_hand"="yes"]["fee"="no"]`)}`,
    color: "#A0522D",
    edit: ["amenity=public_bookcase", "amenity=library", "amenity", "shop"]
  }
];
