/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': "#38A3A5",
        'secondary': '#57CC99',
        'active': '#80ED99',
    },
  },
  plugins: [],
}
}