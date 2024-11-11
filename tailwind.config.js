/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const TWPlugin = require("tw-elements/plugin");
const config = {
  content: [
    "app/javascript/**/*.ts",
    "app/javascript/**/*.tsx",
    "app/views/**/*.html.erb",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4f83cc",
          DEFAULT: "#01579b",
          dark: "#002f6c",
        },
        secondary: {
          light: "#ff8a65",
          DEFAULT: "#ff5722",
          dark: "#e64a19",
        },
        accent: {
          light: "#ffd95b",
          DEFAULT: "#ffca28",
          dark: "#ffb300",
        },
        neutral: {
          light: "#f5f5f5",
          DEFAULT: "#9e9e9e",
          dark: "#616161",
        },
        background: {
          light: "#ffffff",
          DEFAULT: "#f0f0f0",
          dark: "#303030",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  darkMode: "media",
  //plugins: [TWPlugin],
};
module.exports = withMT(config);
