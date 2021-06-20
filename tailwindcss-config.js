module.exports = {
  purge: {
    enabled: true,
    layers: ["components", "utilities"],
    content: ["./src/**/*.tsx"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
