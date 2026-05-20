import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "businessName", title: "Business Name", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "city", title: "City/State", type: "string" }),
    defineField({
      name: "hours",
      title: "Business Hours",
      type: "object",
      fields: [
        defineField({ name: "weekday", title: "Mon-Fri", type: "string" }),
        defineField({ name: "saturday", title: "Saturday", type: "string" }),
        defineField({ name: "sunday", title: "Sunday", type: "string" }),
      ],
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "tiktok", title: "TikTok URL", type: "url" }),
        defineField({ name: "google", title: "Google Reviews URL", type: "url" }),
      ],
    }),
    defineField({ name: "googleMapsEmbed", title: "Google Maps Embed URL", type: "url" }),
    defineField({ name: "whatsapp", title: "WhatsApp Number", type: "string" }),
  ],
});
