import { Attribute } from "./Generator";

const template = (title: string, icon: string, value?: string) =>
  `<span title="${title}" class="attribut"><i class="${icon}"></i>${
    value !== undefined ? " " + value : ""
  }</span>`;

export const attributes: Attribute<{}>[] = [
  {
    check: (tags, value) => !!tags.capacity && value === "book-exchange",
    template: (local, tags) =>
      template(local.capacity, "fas fa-book", tags.capacity)
  },
  {
    check: tags => tags["reuse:policy"] === "free_to_take",
    template: local => template(local.freeToTake, "fas fa-long-arrow-alt-left")
  },
  {
    check: tags =>
      tags["reuse:policy"] === "free_to_take_or_give" ||
      (!tags["reuse:policy"] &&
        (tags["amenity"] === "reuse" ||
          hasPropThatStartsWith(tags, "reuse:", "yes"))),
    template: local => template(local.freeToTakeOrGive, "fas fa-exchange-alt")
  },
  {
    check: tags => tags.amenity === "library" && tags.library !== "booksharing",
    template: local => template(local.borrow, "fas fa-redo-alt")
  },
  {
    check: tags => tags.amenity === "give_box",
    template: local => template(local.giveBox, "fas fa-gift")
  },
  {
    check: tags =>
      tags.location === "indoor" ||
      tags["public_bookcase:type"] === "building" ||
      !!(tags.indoor && tags.indoor !== "no") ||
      !!(tags.building && tags.building !== "no"),
    template: local => template(local.indoor, "far fa-building")
  },
  {
    check: tags =>
      (!!tags.covered && tags.covered !== "no") || tags.amenity === "shelter",
    template: local => template(local.covered, "fas fa-chevron-up")
  },
  {
    check: tags => tags.lit === "yes",
    template: local => template(local.light, "far fa-lightbulb")
  },
  {
    check: tags => (tags.fee && tags.fee !== "no") || !!tags.shop,
    template: local => template(local.fee, "far fa-money-bill-alt")
  },
  {
    check: tags => tags.access === "customers",
    template: local => template(local.customersOnly, "fas fa-ticket-alt")
  },
  {
    check: tags => !!wheelchairAccesIcon(tags),
    template: (local, tags) =>
      `<span title="${wheelchairAccesText(
        tags,
        local
      )}" class="attribut"><i class="fab fa-accessible-icon"></i> <i class="fas fa-${wheelchairAccesIcon(
        tags
      )}" style="color: ${wheelchairAccesColor(tags)};"></i></span>`
  }
];

function wheelchairAccesText(tags: { wheelchair: string }, local: any) {
  switch (tags.wheelchair) {
    case "yes":
    case "designated":
      return local.wheelchairYes;
    case "limited":
      return local.wheelchairLimited;
    case "no":
      return local.wheelchairNo;
    default:
      // do not display for others values or undefined
      return "";
  }
}

function wheelchairAccesColor(tags: { wheelchair: string }) {
  switch (tags.wheelchair) {
    case "yes":
    case "designated":
      return "green";
    case "limited":
      return "orange";
    case "no":
      return "red";
    default:
      // do not display for others values or undefined
      return "black";
  }
}

function wheelchairAccesIcon(tags: { wheelchair: string }) {
  switch (tags.wheelchair) {
    case "yes":
    case "designated":
      return "check-circle";
    case "limited":
      return "exclamation-circle";
    case "no":
      return "times-circle";
    default:
      // do not display icon for others values or undefined
      return undefined;
  }
}

function hasPropThatStartsWith(tags: any, name: string, value: string) {
  for (const tag in tags) {
    if (
      tags.hasOwnProperty(tag) &&
      tag.toUpperCase().startsWith(name.toUpperCase()) &&
      tags[tag] === value
    ) {
      return true;
    }
  }
  return false;
}
