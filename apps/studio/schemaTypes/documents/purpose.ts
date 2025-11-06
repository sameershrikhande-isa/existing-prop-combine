import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { TagIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { documentSlugField } from "../common";

export const purpose = defineType({
  name: "purpose",
  title: "Purpose",
  type: "document",
  icon: TagIcon,
  groups: GROUPS,
  orderings: [orderRankOrdering],
  description:
    "Property purposes like Rent or Buy that define how the property will be used",
  fields: [
    orderRankField({ type: "purpose" }),
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "The purpose name (e.g., Rent, Buy)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required().error("Purpose name is required"),
    }),
    documentSlugField("purpose", {
      group: GROUP.MAIN_CONTENT,
    }),
  ],
  preview: {
    select: {
      title: "name",
      slug: "slug.current",
    },
    prepare: ({ title, slug }: { title: string; slug: string }) => {
      return {
        title: title || "Unnamed Purpose",
        subtitle: `🔗 ${slug || "no-slug"}`,
      };
    },
  },
});

