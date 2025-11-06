import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { SparklesIcon } from "lucide-react";
import { defineField, defineType } from "sanity";
import React from "react";

import { GROUP, GROUPS } from "../../utils/constant";
import { documentSlugField } from "../common";

export const amenity = defineType({
  name: "amenity",
  title: "Amenity",
  type: "document",
  icon: SparklesIcon,
  groups: GROUPS,
  orderings: [orderRankOrdering],
  description:
    "Reusable amenities with icons that can be assigned to properties",
  fields: [
    orderRankField({ type: "amenity" }),
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "The amenity name (e.g., Swimming Pool, Gym, Parking)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required().error("Amenity name is required"),
    }),
    documentSlugField("amenity", {
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "iconName",
      type: "string",
      title: "Tabler icon name",
      description: "e.g., IconSwimming, IconDumbbell, IconParking",
      validation: (Rule) =>
        Rule.required().error("Icon name is required"),
      group: GROUP.MAIN_CONTENT,
      components: {
        field: (props) =>
          React.createElement(
            "div",
            null,
            props.renderDefault(props),
            React.createElement(
              "div",
              { style: { marginTop: 6 } },
              React.createElement(
                "a",
                {
                  href: "https://tabler.io/icons",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  style: {
                    color: "var(--card-link-color, #0ea5e9)",
                    textDecoration: "underline",
                    fontSize: 12,
                  },
                },
                "Choose an Icon from here · https://tabler.io/icons \u2197"
              )
            )
          ),
      },
    }),
    defineField({
      name: "category",
      type: "string",
      title: "Category",
      description: "Optional category for grouping amenities",
      group: GROUP.MAIN_CONTENT,
      options: {
        list: [
          { title: "Wellness", value: "wellness" },
          { title: "Security", value: "security" },
          { title: "Technology", value: "technology" },
          { title: "Outdoor", value: "outdoor" },
          { title: "Other", value: "other" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "iconName",
      category: "category",
    },
    prepare: ({
      title,
      subtitle,
      category,
    }: {
      title: string;
      subtitle: string;
      category?: string;
    }) => {
      return {
        title: title || "Unnamed Amenity",
        subtitle: `${subtitle || "No icon"} ${category ? `| ${category}` : ""}`,
      };
    },
  },
});

