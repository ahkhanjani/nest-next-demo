function getEnvVar(varName: string): string {
  const unvalidatedEnvVar = process.env[varName];
  if (unvalidatedEnvVar) return unvalidatedEnvVar;
  throw new Error(`Couldn't find environment variable: ${varName}`);
}

export const config = {
  apiBaseUrl: getEnvVar('API_BASE_URL'),
};
