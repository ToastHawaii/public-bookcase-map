import { Attribute } from "./Generator";

const template = (icon: string, description: string) =>
  `<div><i class="${icon}"></i> ${description}</div>`;

export const attributeDescriptions: Attribute<{ website?: string }>[] = [
  {
    check: (tags, _value, _model, local) =>
      !!tags.wheelchair &&
      !!(
        tags["wheelchair:description:" + (local.code || "en")] ||
        tags["wheelchair:description"]
      ),
    template: (local, tags) =>
      template(
        "fab fa-accessible-icon",
        tags["wheelchair:description:" + (local.code || "en")] ||
          tags["wheelchair:description"]
      )
  }
];
