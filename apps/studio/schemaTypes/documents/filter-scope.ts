import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { TargetIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";

export const filterScope = defineType({
  name: "filterScope",
  title: "Filter Scope",
  type: "document",
  icon: TargetIcon,
  groups: GROUPS,
  orderings: [orderRankOrdering],
  description:
    "Defines context combinations like Residential + Rent that determine which filter ranges apply",
  fields: [
    orderRankField({ type: "filterScope" }),
    defineField({
      name: "propertyType",
      type: "reference",
      title: "Property Type",
      description: "The property type for this filter scope",
      to: [{ type: "propertyType" }],
      validation: (Rule) =>
        Rule.required().error("Property type is required"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "purpose",
      type: "reference",
      title: "Purpose",
      description: "The purpose (rent/buy) for this filter scope",
      to: [{ type: "purpose" }],
      validation: (Rule) => Rule.required().error("Purpose is required"),
      group: GROUP.MAIN_CONTENT,
    }),
  ],
  preview: {
    select: {
      propertyTypeName: "propertyType.name",
      purposeName: "purpose.name",
    },
    prepare: ({
      propertyTypeName,
      purposeName,
    }: {
      propertyTypeName: string;
      purposeName: string;
    }) => {
      return {
        title: `${propertyTypeName || "?"} + ${purposeName || "?"}`,
        subtitle: "Filter Scope",
      };
    },
  },
});

