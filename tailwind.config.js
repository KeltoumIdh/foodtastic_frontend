/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/@shadcn/ui/**/*.js',
  ],
  theme: {
    themes: ["dark", "winter"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

