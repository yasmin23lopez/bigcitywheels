import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/config";

export default defineConfig({
  name: "bigcitywheels",
  title: "Big City Wheels & Tires",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
