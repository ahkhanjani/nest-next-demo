/** @type {import('tailwindcss').Config} */

const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['**/*.{jsx,tsx}', ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        18: '18px',
      },
    },
    colors: {
      blue: '#3A87FF',
      borderColor: '#00000038',
      field: '#f1f1f1',
      gray:'#4F5B62',
      lightGray:'#93999D',
      white:"#ffffff",
      dark:"#263238",
      bgColor:"#FAFAFA"
    },
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1440px',
    }
  },
  prefix: 'tw-', // note: use tailwind styles like "tw-*"
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  // See https://daisyui.com/docs/config/
  daisyui: {
    styled: true,
    themes: ['light', 'dark'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: 'daisy-', // note: use daisyui styles like "tw-daisy-*"
    darkTheme: 'dark',
  },
};
