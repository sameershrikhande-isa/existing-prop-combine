import { Phone } from "lucide-react";
import { defineField, defineType } from "sanity";

export const contactInfo = defineType({
  name: "contactInfo",
  type: "document",
  title: "Contact Information",
  description: "Contact information displayed throughout the website",
  icon: Phone,
  fields: [
    defineField({
      name: "contactName",
      type: "string",
      title: "Contact Name",
      description: "The name of the contact person or business",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneNumbers",
      type: "array",
      title: "Phone Numbers",
      description: "Phone numbers to display (at least one required)",
      of: [
        defineField({
          type: "object",
          name: "phoneNumber",
          title: "Phone Number",
          fields: [
            defineField({
              name: "actualNumber",
              type: "string",
              title: "Actual Phone Number",
              description: "The actual phone number used for calling (e.g., +919999988888). This will be used in the tel: link.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "displayNumber",
              type: "string",
              title: "Display Phone Number",
              description: "The phone number as you want it displayed on the website (e.g., 99999 88888). This is what users will see.",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              actual: "actualNumber",
              display: "displayNumber",
            },
            prepare({ actual, display }) {
              return {
                title: display || "Untitled",
                subtitle: actual || "",
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).error("At least one phone number is required"),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      description: "Contact email address",
      validation: (rule) => rule.required().email(),
    }),
  ],
  preview: {
    select: {
      title: "contactName",
      email: "email",
      phoneCount: "phoneNumbers",
    },
    prepare({ title, email, phoneCount = [] }) {
      return {
        title: title || "Untitled Contact",
        subtitle: `${email || ""} • ${phoneCount.length} phone number${phoneCount.length === 1 ? "" : "s"}`,
        media: Phone,
      };
    },
  },
});

