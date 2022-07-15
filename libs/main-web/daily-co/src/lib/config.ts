import { getEnvironmentVariable } from '@fm/utils';

const config = {
  // daily.co
  // - domain excluding 'https://' and 'daily.co' e.g. 'somedomain'
  domain: getEnvironmentVariable('DAILY_DOMAIN'),
  // - obtained from https://dashboard.daily.co/developers
  apiKey: getEnvironmentVariable('DAILY_API_KEY'),
  // - Daily REST API endpoint
  restDomain: getEnvironmentVariable('DAILY_REST_DOMAIN'),
  // - run in demo mode (will create a demo room for you to try)
  demoMode: !!getEnvironmentVariable('DAILY_DEMO_MODE'),
};
export default config;
