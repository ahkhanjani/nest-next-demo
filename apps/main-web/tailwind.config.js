/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./libs/**/*.{tsx,}', './apps/**/*.{tsx,}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('daisyui')],

  // See https://daisyui.com/docs/config/
  daisyui: {
    styled: true, // See https://daisyui.com/docs/config/#styled
    themes: ['light', 'dark'], // See https://daisyui.com/docs/config/#themes
    base: true, // See https://daisyui.com/docs/config/#base
    utils: true, // See https://daisyui.com/docs/config/#utils
    logs: true, // See https://daisyui.com/docs/config/#logs
    rtl: false, // See https://daisyui.com/docs/config/#rtl
    prefix: 'daisy-', // See https://daisyui.com/docs/config/#prefix
    darkTheme: 'dark', // See https://daisyui.com/docs/config/#darktheme
  },
};
