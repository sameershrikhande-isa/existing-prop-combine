import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { SlidersHorizontalIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { documentSlugField } from "../common";

export const filterDimension = defineType({
  name: "filterDimension",
  title: "Filter Dimension",
  type: "document",
  icon: SlidersHorizontalIcon,
  groups: GROUPS,
  orderings: [orderRankOrdering],
  description:
    "Defines filterable dimensions like Carpet Area or Budget that can be used in property searches",
  fields: [
    orderRankField({ type: "filterDimension" }),
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "The dimension name (e.g., Carpet Area, Budget)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.required().error("Dimension name is required"),
    }),
    documentSlugField("filterDimension", {
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "unit",
      type: "string",
      title: "Unit",
      description: "The unit of measurement (e.g., sqm, INR, USD)",
      validation: (Rule) => Rule.required().error("Unit is required"),
      group: GROUP.MAIN_CONTENT,
    }),
  ],
  preview: {
    select: {
      title: "name",
      unit: "unit",
      slug: "slug.current",
    },
    prepare: ({
      title,
      unit,
      slug,
    }: {
      title: string;
      unit: string;
      slug: string;
    }) => {
      return {
        title: title || "Unnamed Dimension",
        subtitle: `Unit: ${unit || "?"} | 🔗 ${slug || "no-slug"}`,
      };
    },
  },
});

