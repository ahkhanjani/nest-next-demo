const env = process.env['NODE_ENV'] || 'development';

export default () => ({
  env,
  port: process.env['API_PORT'] || 3333,

  mongodb: {
    uri: process.env['API_MONGODB_URI'],
  },

  redis: {
    host: env === 'development' ? 'localhost' : process.env['API_REDIS_HOST'],
    port: process.env['API_REDIS_PORT'] || 6379,
  },

  session: {
    ttl: parseInt(process.env['API_SESSION_TTL']) || 1800,
    secret: process.env['API_SESSION_SECRET'],
    name: process.env['API_SESSION_NAME'],
  },

  cors: {
    apollo: {
      // e.g. API_APOLLO_SERVER_ACCESS_CONTROL_ALLOW_ORIGINGS=origin1 origin2 origin3
      origins:
        process.env['API_APOLLO_SERVER_ACCESS_CONTROL_ALLOW_ORIGINGS'].split(
          ' '
        ),
      headers:
        process.env['API_APOLLO_SERVER_ACCESS_CONTROL_ALLOW_HEADERS'].split(
          ' '
        ),
    },

    app: {
      origins: process.env['API_APP_ACCESS_CONTROL_ALLOW_ORIGINGS'].split(' '),
      headers: process.env['API_APP_ACCESS_CONTROL_ALLOW_HEADERS'].split(' '),
    },
  },
});
