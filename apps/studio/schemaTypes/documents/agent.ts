import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { documentSlugField } from "../common";

export const agent = defineType({
  name: "agent",
  title: "Agent",
  type: "document",
  icon: UserIcon,
  groups: GROUPS,
  orderings: [orderRankOrdering],
  description:
    "A real estate agent who manages properties. Add their contact information and profile to help buyers connect with them.",
  fields: [
    orderRankField({ type: "agent" }),
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "The full name of the agent",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required().error("Agent name is required"),
    }),
    documentSlugField("agent", {
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "position",
      type: "string",
      title: "Position",
      description:
        "The agent's job title or role (e.g., Senior Property Consultant)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required().error("Position is required"),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      description: "Contact email address for the agent",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.required()
          .email()
          .error("A valid email address is required"),
    }),
    defineField({
      name: "phone",
      type: "string",
      title: "Phone",
      description: "Contact phone number for the agent",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "bio",
      type: "text",
      title: "Bio",
      rows: 3,
      description: "A short biography or description about the agent",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "A professional photo of the agent",
      type: "image",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required().error("Agent image is required"),
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          description: "Alternative text for accessibility and SEO",
          title: "Alt Text",
          validation: (Rule) =>
            Rule.required().error("Alt text is required for images"),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "image",
      slug: "slug.current",
    },
    prepare: ({ title, subtitle, media, slug }) => {
      return {
        title: title || "Unnamed Agent",
        subtitle: `${subtitle || "No position"} | 🔗 ${slug || "no-slug"}`,
        media,
      };
    },
  },
});

