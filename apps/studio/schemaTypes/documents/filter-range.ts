import { ListFilterIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";

export const filterRange = defineType({
  name: "filterRange",
  title: "Filter Range",
  type: "document",
  icon: ListFilterIcon,
  groups: GROUPS,
  description:
    "Admin-configured filter range options per scope+dimension (e.g., '< ₹20k', '500-1000 sqm')",
  fields: [
    defineField({
      name: "scope",
      type: "reference",
      title: "Scope",
      description: "The property type + purpose combination",
      to: [{ type: "filterScope" }],
      validation: (Rule) => Rule.required().error("Scope is required"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "dimension",
      type: "reference",
      title: "Dimension",
      description: "The filter dimension (e.g., Carpet Area, Budget)",
      to: [{ type: "filterDimension" }],
      validation: (Rule) => Rule.required().error("Dimension is required"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description: "Display label (e.g., '< ₹20k', '500-1000 sqm')",
      validation: (Rule) => Rule.required().error("Label is required"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "minValue",
      type: "number",
      title: "Min Value",
      description: "Minimum value for this range",
      validation: (Rule) =>
        Rule.required().min(0).error("Min value is required and must be >= 0"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "maxValue",
      type: "number",
      title: "Max Value",
      description: "Maximum value (leave empty for unbounded, e.g., '5000+')",
      validation: (Rule) =>
        Rule.custom((maxValue, context) => {
          if (maxValue == null) return true;
          const minValue = (context.document as Record<string, unknown>)
            ?.minValue as number;
          if (minValue != null && maxValue < minValue) {
            return "Max must be >= Min";
          }
          return true;
        }),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "sortOrder",
      type: "number",
      title: "Sort Order",
      description: "Order in which this range appears in filters",
      initialValue: 0,
      group: GROUP.MAIN_CONTENT,
    }),
  ],
  preview: {
    select: {
      label: "label",
      scopePropertyType: "scope.propertyType.name",
      scopePurpose: "scope.purpose.name",
      dimensionName: "dimension.name",
    },
    prepare: ({
      label,
      scopePropertyType,
      scopePurpose,
      dimensionName,
    }: {
      label: string;
      scopePropertyType: string;
      scopePurpose: string;
      dimensionName: string;
    }) => {
      return {
        title: label || "Unnamed Range",
        subtitle: `${scopePropertyType || "?"} + ${scopePurpose || "?"} → ${dimensionName || "?"}`,
      };
    },
  },
});

