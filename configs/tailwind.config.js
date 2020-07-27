const { fontFamily, spacing } = require("tailwindcss/defaultTheme");

module.exports = {
  prefix: "",
  important: true,
  separator: ":",
  theme: {
    fontFamily: {
      sans: ["Poppins", ...fontFamily.sans],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      inset: {
        "1": "1rem",
        "2": "1.5rem",
      },
      spacing: {
        "2-rev": `-${spacing["2"]}`,
      },
      boxShadow: {
        common: "var(--shadow)",
      },
      maxWidth: {
        "32": "8rem",
      },
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
      },
    },
  },
};
