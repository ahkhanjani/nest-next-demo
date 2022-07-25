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
    },
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
