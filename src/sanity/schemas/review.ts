import { defineType, defineField } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "vehicle", title: "Vehicle", type: "string" }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "text", title: "Review Text", type: "text", validation: (r) => r.required() }),
    defineField({ name: "time", title: "Time Ago", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: true }),
  ],
});
