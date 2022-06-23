function getEnvVar(varName: string): string {
  const unvalidatedEnvVar = process.env[varName];
  if (unvalidatedEnvVar) return unvalidatedEnvVar;
  throw new Error(`Couldn't find environment variable: ${varName}`);
}

const config: Record<EnvVarPolicy, string> = {
  apiBaseUri: getEnvVar('NEXT_PUBLIC_API_BASE_URI'),
};
export default config;

type EnvVarPolicy = 'apiBaseUri';
