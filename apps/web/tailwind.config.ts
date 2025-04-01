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
    },
    extend: {
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'top center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'bottom center',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': '0% 0%',
          },
          '25%': {
            'background-position': '100% 0%',
          },
          '50%': {
            'background-position': '100% 100%',
          },
          '75%': {
            'background-position': '0% 100%',
          },
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
    },
  },
  presets: [sharedConfig],
};

import { withUt } from "uploadthing/tw";

export default withUt(config)
