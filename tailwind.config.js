/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "transparent-red-600": "rgba(220, 38, 38, 0.9)",
        "transparent-black": "rgba(0, 0, 0, 0.4)",
      },
      keyframes:{
        "0%":{transform: 'translateX(320px)'}
      }
    },
  },
  plugins: [],
}

