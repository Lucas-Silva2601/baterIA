/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'drum-dark': '#323232',
        'drum-gray': '#c8c8c8',
        'drum-blue': '#0000ff',
        'drum-light-blue': '#6464ff',
      },
    },
  },
  plugins: [],
}
