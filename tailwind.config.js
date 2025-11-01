const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ For Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ If you use /pages
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ For components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
