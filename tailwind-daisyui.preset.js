/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require('daisyui')],
  // See https://daisyui.com/docs/config/
  daisyui: {
    styled: true,
    themes: ['dark'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: 'daisy-', // use daisyui styles wiht 'tw-daisy-' prefix
    darkTheme: 'dark',
  },
};
