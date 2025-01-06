import { defineConfig, Options } from "tsup";
import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

export default defineConfig((options: Options) => ({
  entry: ["src/react/**/*.{ts,tsx}", "src/shadcn/**/*.{ts,tsx}", "src/utils/cn.ts"],
  banner: {
    // js: "'use client'",
  },
  clean: true,
  format: ["cjs", "esm"],
  external: ["react"],
  treeshake: true,
  dts: true,
  ...options,
  onSuccess: async () => {
    console.log("Building Tailwind CSS...");
    try {
      await execAsync("tailwindcss -i ./src/styles.css -o ./dist/index.css");
      console.log("Tailwind CSS build completed.");
    } catch (error) {
      console.error("Failed to build Tailwind CSS:", error);
    }
  },
}));
