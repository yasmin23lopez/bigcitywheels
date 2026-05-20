import { defineType, defineField } from "sanity";

export default defineType({
  name: "promo",
  title: "Promotion",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "ctaText", title: "CTA Button Text", type: "string" }),
    defineField({ name: "ctaLink", title: "CTA Link", type: "string" }),
    defineField({
      name: "location",
      title: "Where to show",
      type: "string",
      options: {
        list: [
          { title: "Hero Banner", value: "hero" },
          { title: "Announcement Bar", value: "announcement" },
          { title: "Grand Opening Section", value: "grand-opening" },
          { title: "Footer Banner", value: "footer" },
        ],
      },
    }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
  ],
});
