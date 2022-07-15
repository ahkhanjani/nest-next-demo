export function getEnvironmentVariable(variableName: string): string {
  const unvalidatedEnvVar = process.env[variableName];
  if (unvalidatedEnvVar) return unvalidatedEnvVar;
  throw new Error(`Couldn't find environment variable: ${variableName}`);
}
