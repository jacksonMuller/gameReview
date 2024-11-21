/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Add custom colors
      colors: {
        primary: "#FFFFFF",
        secondary: "#202945",
        // You can also use objects for color variations
        brand: {
          100: "#121726",
          200: "#B3B3FF",
          300: "#8080FF",
          400: "#4D4DFF",
          500: "#1A1AFF",
          600: "#0000FF",
          700: "#0000CC",
          800: "#000099",
          900: "#000066",
        },
      },

      // Add custom font families
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
