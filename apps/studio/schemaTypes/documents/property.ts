import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { Building2Icon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";

import { GROUP, GROUPS } from "../../utils/constant";
import { documentSlugField } from "../common";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  icon: Building2Icon,
  groups: GROUPS,
  orderings: [orderRankOrdering],
  description:
    "A real estate property listing with details like price, location, features, and images that will appear on the website.",
  fields: [
    orderRankField({ type: "property" }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The name or title of the property",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required().error("Property title is required"),
    }),
    documentSlugField("property", {
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      rows: 3,
      description:
        "A short summary of the property that will appear in property cards",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.max(200).warning(
          "Keep the description under 200 characters for better display in cards"
        ),
    }),
    defineField({
      name: "richText",
      type: "richText",
      title: "Full Description",
      description:
        "The complete property description with formatting, including details about rooms, amenities, and features",
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "price",
      type: "string",
      title: "Price",
      description:
        'The property price (e.g., "2.5 Cr", "85 L", or "Enquire for Price")',
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required().error("Price is required"),
    }),
    defineField({
      name: "status",
      type: "string",
      title: "Status",
      description: "The current availability status of the property",
      group: GROUP.MAIN_CONTENT,
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Sold", value: "sold" },
          { title: "Pending", value: "pending" },
        ],
        layout: "radio",
      },
      initialValue: "available",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "propertyType",
      type: "reference",
      title: "Property Type",
      description: "The category this property belongs to",
      group: GROUP.MAIN_CONTENT,
      to: [{ type: "propertyType" }],
      validation: (Rule) => Rule.required().error("Property type is required"),
    }),
    defineField({
      name: "location",
      type: "object",
      title: "Location",
      description: "The property's address and geographic location",
      group: GROUP.MAIN_CONTENT,
      fields: [
        defineField({
          name: "address",
          type: "string",
          title: "Address",
          description: "Street address or location name",
          validation: (Rule) => Rule.required().error("Address is required"),
        }),
        defineField({
          name: "city",
          type: "string",
          title: "City",
          description: "City where the property is located",
          validation: (Rule) => Rule.required().error("City is required"),
        }),
        defineField({
          name: "state",
          type: "string",
          title: "State",
          description: "State or province",
        }),
        defineField({
          name: "country",
          type: "string",
          title: "Country",
          description: "Country",
          initialValue: "India",
        }),
      ],
    }),
    defineField({
      name: "features",
      type: "object",
      title: "Features",
      description: "Key property features like bedrooms, bathrooms, and area",
      group: GROUP.MAIN_CONTENT,
      fields: [
        defineField({
          name: "bedrooms",
          type: "number",
          title: "Bedrooms",
          description: "Number of bedrooms",
          validation: (Rule) =>
            Rule.required()
              .min(0)
              .error("Number of bedrooms is required"),
        }),
        defineField({
          name: "bathrooms",
          type: "number",
          title: "Bathrooms",
          description: "Number of bathrooms",
          validation: (Rule) =>
            Rule.required()
              .min(0)
              .error("Number of bathrooms is required"),
        }),
        defineField({
          name: "areaSqM",
          type: "number",
          title: "Area (m²)",
          description: "Total area in square meters",
          validation: (Rule) =>
            Rule.required()
              .min(0)
              .error("Area is required"),
        }),
      ],
    }),
    defineField({
      name: "amenities",
      type: "array",
      title: "Amenities",
      description:
        "List of amenities and features (e.g., Smart Home Integration, Energy Efficiency, Swimming Pool)",
      group: GROUP.MAIN_CONTENT,
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "thumbnailImage",
      type: "image",
      title: "Thumbnail Image",
      description:
        "Main hero image displayed on the property detail page (left side on desktop)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.required().error("Thumbnail image is required"),
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (Rule) =>
            Rule.required().error("Alt text is required"),
        }),
      ],
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Images",
      description:
        "Gallery images shown in the carousel viewer (can have multiple images)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("At least one image is required")
          .max(10)
          .warning("Maximum 10 images recommended"),
      of: [
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Alternative text describing the image",
              validation: (Rule) =>
                Rule.required().error("Alt text is required for each image"),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "brochures",
      type: "array",
      title: "Brochures",
      description:
        "Add one or more downloadable brochure links for this property",
      group: GROUP.MAIN_CONTENT,
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              description:
                "Optional display title for this brochure link. Defaults to 'Link n' if left blank.",
            }),
            defineField({
              name: "url",
              type: "url",
              title: "URL",
              description: "Direct download or external brochure URL (https://)",
              validation: (Rule) => Rule.required().uri({ allowRelative: false }),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "videoLink",
      type: "url",
      title: "Video link",
      description: "YouTube, Vimeo, or direct MP4 URL",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.uri({ allowRelative: false }),
    }),
    defineField({
      name: "mapLink",
      type: "url",
      title: "Map link",
      description: "Google Maps share URL to view this property's location",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.uri({ allowRelative: false }),
    }),
    defineField({
      name: "agent",
      type: "reference",
      title: "Agent",
      description: "The real estate agent managing this property",
      group: GROUP.MAIN_CONTENT,
      to: [{ type: "agent" }],
      validation: (Rule) => Rule.required().error("Agent is required"),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Published At",
      description: "The date and time this property was listed",
      group: GROUP.MAIN_CONTENT,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      price: "price",
      status: "status",
      city: "location.city",
      bedrooms: "features.bedrooms",
      bathrooms: "features.bathrooms",
      area: "features.areaSqM",
      mediaThumb: "thumbnailImage",
      mediaGallery: "images.0",
      slug: "slug.current",
    },
    prepare: ({
      title,
      price,
      status,
      city,
      bedrooms,
      bathrooms,
      area,
      mediaThumb,
      mediaGallery,
      slug,
    }) => {
      // Status badge
      const statusEmoji =
        status === "available" ? "✅" : status === "sold" ? "🔴" : "🟡";
      const statusText = status || "available";

      // Location and features
      const locationText = city ? `📍 ${city}` : "📍 Location not set";
      const featuresText = `🛏️ ${bedrooms || 0} | 🛁 ${bathrooms || 0} | 📐 ${area || 0}m²`;

      return {
        title: title || "Untitled Property",
        media: mediaThumb || mediaGallery,
        subtitle: `${statusEmoji} ${statusText} | 💰 ${price || "No price"} | ${locationText} | ${featuresText} | 🔗 ${slug || "no-slug"}`,
      };
    },
  },
});

