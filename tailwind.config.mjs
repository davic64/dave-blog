/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecf0ff",
          100: "#dde3ff",
          200: "#c1ccff",
          300: "#9ca9ff",
          400: "#757aff",
          500: "#5954ff",
          600: "#4b36f5",
          700: "#4029d9",
          800: "#3424ae",
          900: "#2f258a",
          950: "#1d1650",
        },
        "lemon-ginger": {
          50: "#fafbeb",
          100: "#f1f5cc",
          200: "#e5ec9c",
          300: "#dae064",
          400: "#d5d639",
          500: "#c6c12c",
          600: "#ae9e24",
          700: "#89741f",
          800: "#725d21",
          900: "#624d21",
          950: "#392a0f",
        },
        apple: {
          50: "#f0fdf3",
          100: "#ddfbe4",
          200: "#bdf5cc",
          300: "#8aeba4",
          400: "#4fd974",
          500: "#24ae4a",
          600: "#1b9e3f",
          700: "#197c35",
          800: "#19622e",
          900: "#165128",
          950: "#062d12",
        },
        "mexican-red": {
          50: "#fdf3f3",
          100: "#fce4e5",
          200: "#fbcdce",
          300: "#f7aaac",
          400: "#f1787c",
          500: "#e64d51",
          600: "#d23035",
          700: "#ae2428",
          800: "#922225",
          900: "#7a2225",
          950: "#420d0f",
        },
        seashell: {
          50: "#f8f8f8",
          100: "#f0f0f0",
          200: "#dcdcdc",
          300: "#bdbdbd",
          400: "#989898",
          500: "#7c7c7c",
          600: "#656565",
          700: "#525252",
          800: "#464646",
          900: "#3d3d3d",
          950: "#292929",
        },
      },
    },
  },
  plugins: [],
};
