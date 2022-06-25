import { parse } from 'yaml';
// types
import type { JSONSchema7 } from 'json-schema';
import type { MaterialFormSchema } from '@fm/material-web/types';
import 'multer';

export async function parseMaterialFormSchema(
  file: Express.Multer.File
): Promise<MaterialFormSchema> {
  const strYamlSchema: string = file.buffer.toString('utf-8');
  const jsonSchema: JSONSchema7 = parse(strYamlSchema);

  const parsedSchema: MaterialFormSchema = {
    title: jsonSchema.title,
    schema: jsonSchema,
  };
  return parsedSchema;
}
