// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        blob: "blob 7s infinite",
        "ping-slow": "ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        "ping-slow": {
          "75%, 100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "fade-in-up": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      colors: {
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
