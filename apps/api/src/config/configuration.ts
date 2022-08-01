export default () => ({
  env: process.env['NODE_ENV'] || 'development',
  port: process.env['API_PORT'] || 3333,

  mongodb: {
    host: process.env['API_MONGODB_HOST'],
    port: process.env['API_MONGODB_PORT'] || 27017,
  },

  redis: {
    host: process.env['API_REDIS_HOST'],
    port: process.env['API_REDIS_PORT'] || 6379,
  },

  session: {
    ttl: parseInt(process.env['API_SESSION_TTL']) || 1800,
    secret: process.env['API_SESSION_SECRET'],
  },

  cors: {
    // e.g. API_APOLLO_SERVER_ACCESS_CONTROL_ALLOW_ORIGINGS=origin1 origin2 origin3
    apolloOrigins:
      process.env['API_APOLLO_SERVER_ACCESS_CONTROL_ALLOW_ORIGINGS'].split(' '),

    apolloHeaders:
      process.env['API_APOLLO_SERVER_ACCESS_CONTROL_ALLOW_HEADERS'].split(' '),

    appOrigins: process.env['API_APP_ACCESS_CONTROL_ALLOW_ORIGINGS'].split(' '),

    appHeaders: process.env['API_APP_ACCESS_CONTROL_ALLOW_HEADERS'].split(' '),
  },
});
