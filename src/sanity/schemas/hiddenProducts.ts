import { defineType, defineField } from "sanity";

export default defineType({
  name: "hiddenProducts",
  title: "Hidden Products",
  type: "document",
  fields: [
    defineField({
      name: "products",
      title: "Products to Hide",
      description: "Add products you want to remove from the catalog. You can search by name or part number.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Product Name (or part of it)", type: "string" }),
            defineField({ name: "partNumber", title: "Part Number (optional)", type: "string" }),
          ],
          preview: {
            select: { title: "name", subtitle: "partNumber" },
          },
        },
      ],
    }),
    defineField({
      name: "hiddenBrands",
      title: "Brands to Hide (entire brand)",
      description: "Type a brand name to hide ALL of its products from the catalog (e.g. \"Lexani\", \"Goodyear\"). The name just needs to partially match the brand — no need for exact spelling.",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hidden Products List" };
    },
  },
});
