function getEnvVar(varName: string): string {
  const unvalidatedEnvVar = process.env[varName];
  if (unvalidatedEnvVar) return unvalidatedEnvVar;
  throw new Error(`Couldn't find environment variable: ${varName}`);
}

export const config = {
  // nodeEnv: getEnvVar('NODE_ENV'),
  sessionSecret: getEnvVar('SESSION_SECRET'),
};
