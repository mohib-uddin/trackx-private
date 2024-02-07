const { nextui } = require("@nextui-org/theme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(input|button|dropdown|card|modal|radio|spinner|table|pagination|tooltip|chip|user|switch).js",
  ],
  theme: {
    extend: {
      backgroundColor: {
        black1: "#1F1F1F",
        black2: "#383838",
        grey1: "#707070",
        grey2: "#838383",
        lightgrey1: "#A3A3A3",
        lightgrey2: "#f5f5f5",
        lightgrey3: "#EDEDED",
        purple1: "#6B26FF",
        darkPurple1: "#5105BE",
        lightPurple1: "#F4EEFF",
        lightBlue1: "#0793EA",
        lightGreen1: "#7F8F96",
        red1: "#CB1F1F",
        darkBlue: "#2D308D",
      },
      colors: {
        black1: "#1F1F1F",
        black2: "#383838",
        grey1: "#707070",
        grey2: "#838383",
        lightgrey1: "#A3A3A3",
        lightgrey2: "#f5f5f5",
        lightgrey3: "#EDEDED",
        borderGrey: "#F0F0F0",
        purple1: "#6B26FF",
        darkPurple1: "#5105BE",
        lightPurple1: "#F4EEFF",
        lightBlue1: "#0793EA",
        lightGreen1: "#7F8F96",
        red1: "#CB1F1F",
        darkBlue: "#2D308D",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase }: { addBase: any }) {
      addBase({
        ".p-modal": {
          fontSize: "0.75rem",
        },
        ".p-page": {
          fontSize: "0.875rem",
        },
        ".base-labels": {
          fontSize: "0.875rem !important",
        },
        ".main-page-heading": {
          fontSize: "1.5rem",
          lineHeight: "2rem",
          paddingBottom: "0.625rem",
          color: "rgb(56 56 56 / var(--tw-text-opacity))",
          fontWeight: "bold",
          "@media (min-width: 768px)": {
            fontSize: "1.875rem",
            lineHeight: "2.25rem",
            paddingBottom: "2.5rem",
          },
          "@media (min-width:1536px)": {
            fontSize: "2rem",
            lineHeight: 1,
          },
        },
      });
    }),
    nextui({
      addCommonColors: true,
    }),
  ],
};
