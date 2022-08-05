// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
};

module.exports = withNx(withPWA(nextConfig));

// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self';
//   child-src example.com;
//   style-src 'self' example.com;
//   font-src 'self';
// `;
//
// const securityHeaders = [
//   {
//     key: 'X-DNS-Prefetch-Control',
//     value: 'on',
//   },
//   process.env === 'production' && {
//     key: 'Strict-Transport-Security',
//     value: 'max-age=63072000; includeSubDomains; preload',
//   },
//   {
//     key: 'X-XSS-Protection',
//     value: '1; mode=block',
//   },
//   {
//     key: 'X-Frame-Options',
//     value: 'SAMEORIGIN',
//   },
//   {
//     key: 'Permissions-Policy',
//     value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
//   },
//   {
//     key: 'X-Content-Type-Options',
//     value: 'nosniff',
//   },
//   {
//     key: 'Referrer-Policy',
//     value: 'origin-when-cross-origin',
//   },
//   {
//     key: 'Content-Security-Policy',
//     value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
//   },
// ];
//
// module.exports = {
//   async headers() {
//     return [
//       {
//         source: '/:path*',
//         headers: securityHeaders,
//       },
//     ];
//   },
// };
