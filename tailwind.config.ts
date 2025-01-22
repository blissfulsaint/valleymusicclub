import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/blisskit-ui/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryColor: "var(--primary-color)",
        secondaryColor: "var(--secondary-color)",
        tertiaryColor: "var(--tertiary-color)",
        accent1: "var(--accent1)",
        accent2: "var(--accent2)",
        
        primarySecondary: "var(--primary-secondary)",
      },
    },
  },
  plugins: [],
} satisfies Config;
