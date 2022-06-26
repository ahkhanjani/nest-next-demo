import { parse } from 'yaml';
// types
import type { JSONSchema7 } from 'json-schema';

/**
 * Parses YAML string into JSON.
 * @param data The YAML string.
 * @returns Parsed JSON schema.
 */
export function parseYamlSchema(data: string): JSONSchema7 {
  const parsedSchema: JSONSchema7 = parse(data);

  return parsedSchema;
}
