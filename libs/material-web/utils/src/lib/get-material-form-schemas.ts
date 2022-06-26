import { parse } from 'yaml';
import * as fs from 'fs';
// types
import type { JSONSchema7 } from 'json-schema';
import type { MaterialFormSchema } from '@fm/material-web/types';

const dirname = 'libs/material-web/assets/src/material-form-schema';

export async function getMaterialFormSchemas(): Promise<MaterialFormSchema[]> {
  const filenames: string[] = fs.readdirSync(dirname);

  const materialFormSchemas: MaterialFormSchema[] = await Promise.all(
    filenames.map(async (filename) => {
      const strYamlSchema = fs.readFileSync(`${dirname}/${filename}`, 'utf-8');
      const parsedSchema = await parseFormSchema(strYamlSchema);
      return parsedSchema;
    })
  );
  return materialFormSchemas;
}

async function parseFormSchema(
  strYamlSchema: string
): Promise<MaterialFormSchema> {
  const jsonSchema: JSONSchema7 = parse(strYamlSchema);

  const parsedSchema: MaterialFormSchema = {
    title: jsonSchema.title,
    schema: jsonSchema,
  };
  return parsedSchema;
}
