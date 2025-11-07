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
          type: "string",
          title: "Phone Number",
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

