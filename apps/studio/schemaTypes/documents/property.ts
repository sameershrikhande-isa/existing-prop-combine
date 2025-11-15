import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { Building2Icon } from "lucide-react";
import { defineArrayMember, defineField, defineType } from "sanity";
import React from "react";

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
      name: "isVisible",
      type: "boolean",
      title: "Visible",
      description:
        "Toggle to show/hide this property. When hidden, the property won't appear in listings, filters, or be accessible via its individual page.",
      group: GROUP.MAIN_CONTENT,
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The name or title of the property",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.required().error("Property title is required"),
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
      name: "subtitle",
      type: "string",
      title: "Subtitle",
      description:
        "A short subtitle that appears below the property title on listing cards and detail pages",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.max(100).warning("Keep subtitle under 100 characters for better display"),
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
      name: "budgetMin",
      type: "number",
      title: "Budget Min",
      description:
        "Minimum budget/price for this property (in the base currency unit)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.required().min(0).error("Minimum budget is required and must be >= 0"),
    }),
    defineField({
      name: "budgetMax",
      type: "number",
      title: "Budget Max",
      description:
        "Maximum budget/price for this property (leave empty if same as min or negotiable)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.custom((maxValue, context) => {
          if (maxValue == null) return true;
          const minValue = (context.document as Record<string, unknown>)
            ?.budgetMin as number;
          if (minValue != null && maxValue < minValue) {
            return "Budget max must be >= Budget min";
          }
          return true;
        }).min(0),
    }),
    defineField({
      name: "constructionStatus",
      type: "string",
      title: "Construction Status",
      description: "Optional: The construction status of the property. Leave empty to hide this field on the frontend.",
      group: GROUP.MAIN_CONTENT,
      options: {
        list: [
          { title: "Ready", value: "ready" },
          { title: "Under Construction", value: "under-construction" },
        ],
        layout: "radio",
      },
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
      name: "purpose",
      type: "reference",
      title: "Purpose",
      description: "Whether this property is for Rent or Buy",
      group: GROUP.MAIN_CONTENT,
      to: [{ type: "purpose" }],
      validation: (Rule) => Rule.required().error("Purpose is required"),
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
      name: "carpetAreaMin",
      type: "number",
      title: "Carpet Area Min (m²)",
      description: "Minimum carpet area in square meters",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.required()
          .min(0)
          .error("Minimum carpet area is required and must be >= 0"),
    }),
    defineField({
      name: "carpetAreaMax",
      type: "number",
      title: "Carpet Area Max (m²)",
      description:
        "Maximum carpet area in square meters (leave empty if same as min)",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.custom((maxValue, context) => {
          if (maxValue == null) return true;
          const minValue = (context.document as Record<string, unknown>)
            ?.carpetAreaMin as number;
          if (minValue != null && maxValue < minValue) {
            return "Carpet area max must be >= Carpet area min";
          }
          return true;
        }).min(0),
    }),
    defineField({
      name: "features",
      type: "array",
      title: "Feature",
      description:
        "Add a property feature (e.g., BHK type like '2-3 BHK'). Keep value ultra short. Currently limited to 1, but can be increased later if needed.",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) =>
        Rule.max(1).warning("Currently limited to 1 feature. Can be increased later if needed."),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              description: "Feature label (e.g., 'Bedrooms', 'BHK', 'Parking')",
              validation: (Rule) =>
                Rule.required()
                  .max(20)
                  .error("Title is required and must be under 20 characters"),
            }),
            defineField({
              name: "iconName",
              type: "string",
              title: "Tabler Icon Name",
              description: "e.g., IconBed, IconBath, IconHome, IconCar",
              validation: (Rule) => Rule.required(),
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
                        "Choose an Icon from here · https://tabler.io/icons ↗"
                      )
                    )
                  ),
              },
            }),
            defineField({
              name: "value",
              type: "string",
              title: "Value",
              description: "Keep it ultra short (e.g., '2-5 BHK', '3', '2+1', 'Yes')",
              validation: (Rule) =>
                Rule.required()
                  .max(15)
                  .warning("Keep value ultra short (max 15 characters) for better display"),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "value", iconName: "iconName" },
            prepare: ({ title, subtitle, iconName }) => ({
              title: title || "Untitled Feature",
              subtitle: `${subtitle || "No value"} • ${iconName || "No icon"}`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "amenities",
      type: "array",
      title: "Amenities",
      description:
        "Select amenities from the reusable amenity library (e.g., Swimming Pool, Gym, Parking)",
      group: GROUP.MAIN_CONTENT,
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "amenity" }],
        }),
      ],
    }),
    defineField({
      name: "highlights",
      type: "array",
      title: "Top features",
      description: "Up to 3 key features with an icon, title, and description",
      group: GROUP.MAIN_CONTENT,
      validation: (Rule) => Rule.max(3).warning("Limit to 3 for now"),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              type: "text",
              title: "Description",
              rows: 2,
            }),
            defineField({
              name: "iconName",
              type: "string",
              title: "Tabler icon name",
              description:
                "e.g., IconSmartHome, IconBolt, IconDeviceMobile",
              validation: (Rule) => Rule.required(),
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
          ],
          preview: {
            select: { title: "title", subtitle: "iconName" },
          },
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
      name: "videos",
      type: "array",
      title: "Videos",
      description:
        "Add one or more video links (YouTube/Vimeo/MP4) for this property",
      group: GROUP.MAIN_CONTENT,
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              title: "Title",
            }),
            defineField({
              name: "url",
              type: "url",
              title: "URL",
              validation: (Rule) => Rule.required().uri({ allowRelative: false }),
            }),
          ],
        }),
      ],
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
      isVisible: "isVisible",
      budgetMin: "budgetMin",
      budgetMax: "budgetMax",
      status: "status",
      city: "location.city",
      carpetAreaMin: "carpetAreaMin",
      carpetAreaMax: "carpetAreaMax",
      mediaThumb: "thumbnailImage",
      mediaGallery: "images.0",
      slug: "slug.current",
    },
    prepare: ({
      title,
      isVisible,
      budgetMin,
      budgetMax,
      status,
      city,
      carpetAreaMin,
      carpetAreaMax,
      mediaThumb,
      mediaGallery,
      slug,
    }: {
      title: string;
      isVisible?: boolean;
      budgetMin: number;
      budgetMax?: number;
      status: string;
      city: string;
      carpetAreaMin: number;
      carpetAreaMax?: number;
      mediaThumb: unknown;
      mediaGallery: unknown;
      slug: string;
    }) => {
      // Visibility badge
      const visibilityEmoji = isVisible !== false ? "✅" : "🚫";
      
      // Status badge
      const statusEmoji =
        status === "available" ? "✅" : status === "sold" ? "🔴" : "🟡";
      const statusText = status || "available";

      // Budget display
      const budgetDisplay =
        budgetMin && budgetMax && budgetMax !== budgetMin
          ? `💰 ${budgetMin}-${budgetMax}`
          : `💰 ${budgetMin || "No budget"}`;

      // Area display
      const areaDisplay =
        carpetAreaMin && carpetAreaMax && carpetAreaMax !== carpetAreaMin
          ? `📐 ${carpetAreaMin}-${carpetAreaMax}m²`
          : `📐 ${carpetAreaMin || 0}m²`;

      // Location
      const locationText = city ? `📍 ${city}` : "📍 Location not set";

      return {
        title: title || "Untitled Property",
        media: (mediaThumb || mediaGallery) as never,
        subtitle: `${visibilityEmoji} ${statusEmoji} ${statusText} | ${budgetDisplay} | ${locationText} | ${areaDisplay} | 🔗 ${slug || "no-slug"}`,
      };
    },
  },
});

