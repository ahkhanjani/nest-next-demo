import { extractFilenames } from './extract-filenames';
import { generateSchema } from './generate-schema';
// types
import type { MaterialFormSchema } from '@fm/material-web/types';

/** Directory where the schema files are located. */
const DIRNAME =
  'libs/material-web/feature/material-form-schema-generator/src/assets/material-form-schema';

/**
 * Parses and processes the YAML material form schema files.
 * @returns Processed material form schemas.
 */
export function generateMaterialFormSchemas(): MaterialFormSchema[] {
  // get file names
  const filenames = extractFilenames(DIRNAME);
  // generate schemas
  const materialFormSchemas: MaterialFormSchema[] = filenames.map((filename) =>
    generateSchema(DIRNAME, filename)
  );

  return materialFormSchemas;
}
