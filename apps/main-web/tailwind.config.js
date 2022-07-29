/** @type {import('tailwindcss').Config} */

const { createGlobPatternsForDependencies } = require('@nrwl/next/tailwind');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    '**/*.{jsx,tsx}',
    ...createGlobPatternsForDependencies(__dirname, '**/*.{jsx,tsx}'),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  prefix: 'tw-', // note: use tailwind styles like "tw-*"
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  // See https://daisyui.com/docs/config/
  daisyui: {
    styled: true,
    themes: ['dark'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: 'daisy-', // note: use daisyui styles like "tw-daisy-*"
    darkTheme: 'dark',
  },
};
