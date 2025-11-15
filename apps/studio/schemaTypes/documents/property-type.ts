import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { HomeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { documentSlugField } from "../common";

export const propertyType = defineType({
  name: "propertyType",
  title: "Property Type",
  type: "document",
  icon: HomeIcon,
  groups: GROUPS,
  orderings: [orderRankOrdering],
  description:
    "Categories for different types of properties like Luxury Villa, Apartment, or Office Space.",
  fields: [
    orderRankField({ type: "propertyType" }),
    defineField({
      name: "isVisible",
      type: "boolean",
      title: "Visible",
      description:
        "Toggle to show/hide this property type. When hidden, properties of this type won't appear in listings, filters, or be accessible individually.",
      group: GROUP.MAIN_CONTENT,
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description:
        "The name of the property type (e.g., Luxury Villa, Apartment, Office Space)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule: {
        required: () => { error: (message: string) => unknown };
      }) => Rule.required().error("Property type name is required"),
    }),
    documentSlugField("propertyType", {
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
      description: "A brief description of this property type",
      group: GROUP.MAIN_CONTENT,
    }),
  ],
  preview: {
    select: {
      title: "name",
      slug: "slug.current",
      description: "description",
      isVisible: "isVisible",
    },
    prepare: ({
      title,
      slug,
      description,
      isVisible,
    }: {
      title: string;
      slug: string;
      description?: string;
      isVisible?: boolean;
    }) => {
      const visibilityEmoji = isVisible !== false ? "✅" : "🚫";
      return {
        title: title || "Unnamed Property Type",
        subtitle: `${visibilityEmoji} 🔗 ${slug || "no-slug"}${description ? ` | ${description.substring(0, 50)}...` : ""}`,
      };
    },
  },
});

