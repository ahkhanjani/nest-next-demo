import { parseYamlSchema } from './parse-yaml-schema';
import { readYamlFile } from './read-yaml-file';
import { processSchema } from './process-schema';
// types
import type { MaterialFormSchema } from '@fm/material-web/types';

export function generateSchema(
  dirname: string,
  filename: string
): MaterialFormSchema {
  // read yaml file content
  const strYamlSchema = readYamlFile(dirname, filename);
  // parse yaml form schema
  const parsedSchema = parseYamlSchema(strYamlSchema);
  // process the schema
  const processedSchema = processSchema(parsedSchema);

  return processedSchema;
}
