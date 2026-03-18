import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#120b08",
        ember: "#8a3b12",
        bone: "#f1e5d2",
        rust: "#cb5a2f",
        gold: "#f0b04b",
        moss: "#4e5c43"
      },
      boxShadow: {
        claw: "0 20px 50px rgba(18, 11, 8, 0.28)"
      },
      backgroundImage: {
        "battle-grid":
          "radial-gradient(circle at top, rgba(240, 176, 75, 0.16), transparent 28%), linear-gradient(135deg, rgba(203, 90, 47, 0.08) 25%, transparent 25%), linear-gradient(225deg, rgba(203, 90, 47, 0.08) 25%, transparent 25%)"
      }
    }
  },
  plugins: []
};

export default config;
