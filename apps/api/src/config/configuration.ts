const env = process.env['NODE_ENV'] || 'development';

const config = () => ({
  env,
  port: parseInt(process.env['API_PORT']) || 3333,

  mongo: {
    uri: process.env['API_MONGO_URI'],
    username: process.env['API_MONGO_USERNAME'],
    password: process.env['API_MONGO_PWD'],
  },

  redis: {
    host: env === 'development' ? 'localhost' : process.env['API_REDIS_HOST'],
    port: parseInt(process.env['API_REDIS_PORT']) || 6379,
    username: process.env['API_REDIS_USERNAME'],
    password: process.env['API_REDIS_PWD'],
  },

  session: {
    ttl: parseInt(process.env['API_SESSION_TTL']) || 1800,
    secret: process.env['API_SESSION_SECRET'],
    name: process.env['API_SESSION_NAME'],
  },

  cache: {
    ttl:
      parseInt(process.env['API_CACHE_TTL']) ||
      // 5 minutes (in milliseconds)
      300_000,

    namespace: process.env['API_CACHE_NAMESPACE'] || 'cache',
  },

  cors: {
    apollo: {
      // e.g. API_APOLLO_SERVER_ACCESS_CONTROL_ALLOW_ORIGINGS=origin1 origin2 origin3
      origins:
        process.env['API_APOLLO_SERVER_ACCESS_CONTROL_ALLOW_ORIGINGS'].split(
          ' ',
        ),
      headers:
        process.env['API_APOLLO_SERVER_ACCESS_CONTROL_ALLOW_HEADERS'].split(
          ' ',
        ),
    },

    app: {
      origins: process.env['API_APP_ACCESS_CONTROL_ALLOW_ORIGINGS'].split(' '),
      headers: process.env['API_APP_ACCESS_CONTROL_ALLOW_HEADERS'].split(' '),
    },
  },
});

export default config;

export type Config = ReturnType<typeof config>;
