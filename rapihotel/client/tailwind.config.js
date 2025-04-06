/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");
export default {
  content: [
    "./index.html", "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      transitionProperty: {
        custom: "0.5s",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        backgroundAlt: "var(--color-background-alt)",
        
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          alt: "var(--color-text-alt)",
        },
        accent: "var(--color-accent)",
        borderAlt: "var(--color-borderAlt)",
        borderr: "var(--color-borderr)",
      },
      boxShadow: {
        "border-blur": "0 0 10px 3px var(--color-borderr)",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)"
            
           },
          "100%": { transform: "translateX(0)" },
        },
        slideOut: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseText: {
          "0%, 100%": { color: "#111827" }, // gray-900
          "50%": { color: "#374151" },       // gray-700
        },
      },
      animation: {
        slideIn: "slideIn 0.3s ease-in forwards",
        slideOut: "slideOut 0.3s ease-out forwards",
        spin: "spin 1s linear infinite",
        pulseText: "pulseText 1.5s ease-in-out infinite",
      },
      media: {
        "xxs-up": "(min-width: 320px)",
        "xs-up": "(min-width: 410px)",
        "sm-up": "(min-width: 575px)",
        "md-up": "(min-width: 768px)",
        "lg-up": "(min-width: 1024px)",
        "xl-up": "(min-width: 1280px)",
        "2xl-up": "(min-width: 1536px)",
      },
      screens: {
        xxs: "320px",
        xs: "410px",
        sm: "575px",
        md: "768px",
        lg: "990px",
        xl: "1280px",
        xxl: "1536px",
        xxxl: "1920px"

            },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};


