import { defineType, defineField } from "sanity";

export default defineType({
  name: "hiddenProducts",
  title: "Hidden Products",
  type: "document",
  fields: [
    defineField({
      name: "partNumbers",
      title: "Hidden Part Numbers",
      description: "Add part numbers of products you want to hide from the catalog. One per line.",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hidden Products List" };
    },
  },
});
