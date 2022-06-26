import { parse as parseYaml } from 'yaml';
import * as fs from 'fs';
// types
import type { JSONSchema7 } from 'json-schema';
import type { MaterialFormSchema } from '@fm/material-web/types';

/** Directory where the schema files are located. */
const DIRNAME = 'libs/material-web/assets/src/material-form-schema';

/**
 * Parses and processes the YAML material form schema files.
 * @returns {MaterialFormSchema[]} Processed material form schemas.
 */
export function getMaterialFormSchemas(): MaterialFormSchema[] {
  // get file names
  const filenames: string[] = fs.readdirSync(DIRNAME);

  // process files
  const materialFormSchemas: MaterialFormSchema[] = filenames.map(
    (filename) => {
      // read yaml file content
      const strYamlSchema = fs.readFileSync(`${DIRNAME}/${filename}`, 'utf-8');

      // parse yaml form schema
      const parsedSchema: JSONSchema7 = parseYaml(strYamlSchema);

      // process the parsed schema
      const processedSchema: MaterialFormSchema = {
        title: parsedSchema.title,
        schema: parsedSchema,
      };

      return processedSchema;
    }
  );

  return materialFormSchemas;
}
