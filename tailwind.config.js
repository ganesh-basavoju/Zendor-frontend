/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@shadcn/ui/components/**/*.tsx",
  ],
   theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E63946", // Deep Red (Main CTA Button)
          dark: "#C72F3C", // Slightly Darker for Hover
        },
        secondary: {
          DEFAULT: "#0056D2", // Royal Blue (Alternative CTA)
          dark: "#0046A1", // Darker Shade for Hover
        },
        accent: {
          DEFAULT: "#F39C12", // Vibrant Orange (Accent Elements)
          dark: "#D1800C",
        },
        neutral: {
          black: "#1A1A1A", // Primary Text Color
          gray: "#333333", // Navbar or Card Headings
          lightgray: "#666666", // Subtext
          border: "#E5E7EB", // Light Border Color
          background: "#F5F5F5", // Light Gray Background for Sections
        },
        navbar: {
          darknavy: "#002B5B", // Dark Navy Navbar
          charcoal: "#333333", // Charcoal Navbar Option
          emerald: "#008F5F", // Emerald Green Navbar Option
        },
        button: {
          primary: "#E63946",
          secondary: "#0056D2",
          accent: "#F39C12",
          muted: "#6C757D", // Slate Gray (Less Priority Buttons)
          gold: "#C79833", // Muted Gold (Luxury Feel)
          teal: "#28A79F", // Soft Teal (Alternative)
        },
        background: {
          white: "#FFFFFF", // Default Background
          beige: "#F8F1EB", // Light Beige Section Background
          lightgray: "#F5F5F5", // Subtle Gray for Cards & Sections
        },
      },
    },
  },
  plugins: [],
};



