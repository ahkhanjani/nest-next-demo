const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    require('../../tailwind.preset.js'),
    require('../../tailwind-daisyui.preset.js'),
  ],
  content: [
    '**/*.{jsx,tsx}',
    ...createGlobPatternsForDependencies(__dirname, '**/*.{jsx,tsx}'),
  ],
  theme: {
    extend: {
      borderRadius: {
        18: '18px',
      },
      colors: {
        blue: '#3A87FF',
        borderColor: '#00000038',
        field: '#f1f1f1',
        gray: '#4F5B62',
        lightGray: '#93999D',
        white: '#ffffff',
        dark: '#263238',
        bgColor: '#FAFAFA',
        grayText: '#6F777C',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
