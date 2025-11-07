import { HomeIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

const testimonial = defineField({
  name: "testimonial",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      description: "Name of the person giving the testimonial",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "review",
      type: "text",
      title: "Review",
      description: "The testimonial review text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "purpose",
      type: "string",
      title: "Purpose",
      description: "Whether this testimonial is from a buyer or renter",
      options: {
        list: [
          { title: "Buyer", value: "buyer" },
          { title: "Renter", value: "renter" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      description: "Photo of the person giving the testimonial",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt Text",
          description:
            "Remember to use alt text for people to be able to read what is happening in the image if they are using a screen reader, it's also important for SEO",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "purpose",
      media: "image",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Testimonial",
        subtitle: subtitle ? ` ${subtitle.charAt(0).toUpperCase() + subtitle.slice(1)}` : "",
      };
    },
  },
});

const faqItem = defineField({
  name: "faqItem",
  type: "object",
  fields: [
    defineField({
      name: "question",
      type: "string",
      title: "Question",
      description: "The FAQ question",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      type: "text",
      title: "Answer",
      description: "The FAQ answer",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "answer",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled FAQ",
        subtitle: subtitle ? `${subtitle.substring(0, 60)}${subtitle.length > 60 ? "..." : ""}` : "",
      };
    },
  },
});

export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: "Home Page Content",
  description: "Content for the home page including testimonials and FAQs",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "testimonialsEnabled",
      type: "boolean",
      title: "Enable Testimonials",
      description: "Toggle to show or hide the testimonials section on the home page",
      initialValue: true,
    }),
    defineField({
      name: "testimonials",
      type: "array",
      title: "Testimonials",
      description: "Customer testimonials to display on the home page",
      of: [testimonial],
    }),
    defineField({
      name: "faqsEnabled",
      type: "boolean",
      title: "Enable FAQs",
      description: "Toggle to show or hide the FAQs section on the home page",
      initialValue: true,
    }),
    defineField({
      name: "faqsTitle",
      type: "string",
      title: "FAQs Title",
      description: "The main title for the FAQs section",
      initialValue: "Most Frequently Asked Questions",
    }),
    defineField({
      name: "faqsDescription",
      type: "text",
      title: "FAQs Description",
      description: "Description text that appears below the FAQs title",
    }),
    defineField({
      name: "faqsImages",
      type: "array",
      title: "FAQs Images",
      description: "Images to display in the FAQs section (exactly 3 images)",
      of: [
        defineField({
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              type: "string",
              title: "Alt Text",
              description:
                "Remember to use alt text for people to be able to read what is happening in the image if they are using a screen reader, it's also important for SEO",
            }),
          ],
        }),
      ],
      validation: (rule) => rule.length(3).error("Exactly 3 images are required"),
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQs",
      description: "Frequently asked questions and answers",
      of: [faqItem],
      validation: (rule) => rule.length(3).error("Exactly 3 FAQs are required"),
    }),
  ],
  preview: {
    select: {
      testimonialsCount: "testimonials",
      faqsCount: "faqs",
    },
    prepare({ testimonialsCount = [], faqsCount = [] }) {
      return {
        title: "Home Page Content",
        subtitle: `${testimonialsCount.length} testimonial${testimonialsCount.length === 1 ? "" : "s"}, ${faqsCount.length} FAQ${faqsCount.length === 1 ? "" : "s"}`,
        media: HomeIcon,
      };
    },
  },
});

