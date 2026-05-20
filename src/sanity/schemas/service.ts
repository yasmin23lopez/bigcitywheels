import { defineType, defineField } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "description", title: "Short Description", type: "text" }),
    defineField({ name: "content", title: "Full Content", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text" }),
          ],
        },
      ],
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
});
