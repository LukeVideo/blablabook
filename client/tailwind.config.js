/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ejs}",
    "./views/**/*.{html,js,ejs}",
    "./public/**/*.{html,js,css}"
  ],
  theme: {
    extend: {
      colors: {
        peacock: '#2c3e50',
        beige: '#f5f5f5'
      }
    }
  },
  plugins: []
}