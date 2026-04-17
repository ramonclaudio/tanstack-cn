import { defineConfig } from "oxfmt"

export default defineConfig({
  semi: false,
  sortImports: true,
  sortTailwindcss: {
    stylesheet: "src/styles.css",
    functions: ["cn", "cva"],
  },
  ignorePatterns: ["**/routeTree.gen.ts"],
})
