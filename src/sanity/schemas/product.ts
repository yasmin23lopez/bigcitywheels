import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "partNumber", title: "Part Number", type: "string" }),
    defineField({ name: "brand", title: "Brand", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Wheels", value: "wheels" },
          { title: "Tires", value: "tires" },
          { title: "Lift Kits", value: "lift-kits" },
          { title: "Accessories", value: "accessories" },
        ],
      },
    }),
    defineField({ name: "subcategory", title: "Subcategory", type: "string" }),
    defineField({ name: "price", title: "Price", type: "number" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageUrl", title: "External Image URL", type: "url" }),
    defineField({ name: "inStock", title: "In Stock", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "brand", media: "image" },
  },
});
