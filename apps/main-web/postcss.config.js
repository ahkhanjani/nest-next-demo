const { join } = require('path');

module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {},
    tailwindcss: { config: join(__dirname, 'tailwind.config.js') },
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production'
      ? { cssnano: { preset: 'advanced' } }
      : {}),
  },
};
