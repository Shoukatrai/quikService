/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4f46e5", // Indigo 600 (Main buttons, Active states, Branding)
          hover: "#4338ca", // Indigo 700 (Button Hover state)
          accent: "#10b981", // Emerald 500 (Prices, Success badges, Online status)
        },
        surface: {
          main: "#f8fafc", // Slate 50 (Poore project ka default page background)
          card: "#ffffff", // Pure White (Cards, Dashboard sections, Modals)
          border: "#e2e8f0", // Slate 200 (Clean structural lines/dividers)
        },
        content: {
          heading: "#0f172a", // Slate 900 (Bold Headings ke liye)
          body: "#475569", // Slate 600 (Normal text aur paragraphs)
          muted: "#94a3b8", // Slate 400 (Placeholder ya secondary info)
        },
      },
      borderRadius: {
        marketplace: "1.5rem", // Uniform roundness for all cards, buttons, inputs
      },
    },
  },
  plugins: [],
};
