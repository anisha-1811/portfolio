/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#22D3EE',
        'neon-purple': '#C084FC',
        'neon-pink': '#F472B6',
        'neon-gold': '#FBBF24',
        'deep-space': '#0B0620',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}