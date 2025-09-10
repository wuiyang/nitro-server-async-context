import { writeFile } from "node:fs/promises";
import { defineBuildConfig } from "unbuild";

const typeDefDirs = ["runtime"];

export default defineBuildConfig({
  declaration: true,
  entries: [
    // module entrypoint
    { input: "src/index.ts", outDir: "dist", format: "esm" },
    // Runtime
    { input: "src/runtime/", outDir: "dist/runtime", format: "esm" },
  ],
  hooks: {
    async "build:prepare"() {
      await Promise.all(
        typeDefDirs.map(dir =>
          writeFile(`./${dir}.d.ts`, `export * from "./dist/${dir}/index";`),
        ),
      );
    },
  },
  externals: [
    "nitropack",
    "nitropack/runtime",
    "#custom-server-async-context",
  ],
});
