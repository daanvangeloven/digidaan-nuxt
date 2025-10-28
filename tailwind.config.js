/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
  ],
  theme: {
    extend: {
      colors: {
        w95: {
          'teal': '#008081',
          'gray': '#c0c0c0',
          'blue': '#000181',
          'dark-gray': '#808080',
          'border-light': '#fcfcfc',
          'border-dark': '#08080e',
        },
      },
      fontFamily: {
        w95: ['"Windows 95"', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.w95-button-border': {
          borderTop: '2px solid #fcfcfc',
          borderLeft: '2px solid #fcfcfc',
          borderBottom: '2px solid #08080e',
          borderRight: '2px solid #08080e',
        },
        '.w95-border': {
          borderTop: '1px solid #fcfcfc',
          borderLeft: '1px solid #fcfcfc',
          borderBottom: '1px solid #08080e',
          borderRight: '1px solid #08080e',
        },
        '.w95-border-inverse': {
          borderTop: '1px solid #08080e',
          borderLeft: '1px solid #08080e',
          borderBottom: '1px solid #fcfcfc',
          borderRight: '1px solid #fcfcfc',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
