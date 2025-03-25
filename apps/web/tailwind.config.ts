// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@hwei/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: ["./app/**/*.tsx", "./components/**/*.tsx", "./hooks/**/*.ts"],
  theme: {
    extends: {
      fontFamily: {
        sans: ["var(--font-kantumruy-pro)"],
      },
    }
  },
  presets: [sharedConfig],
};

import { withUt } from "uploadthing/tw";

export default withUt(config)

