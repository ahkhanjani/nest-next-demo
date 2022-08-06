// types
import type { MaterialFormSchema } from 'fm/material-web-types';
import type { JSONSchema7 } from 'json-schema';

export function processSchema(schema: JSONSchema7): MaterialFormSchema {
  const processedSchema: MaterialFormSchema = {
    title: schema.title,
    schema,
  };

  return processedSchema;
}
