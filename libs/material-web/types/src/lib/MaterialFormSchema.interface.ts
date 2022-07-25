import type { JSONSchema7 } from 'json-schema';

export interface MaterialFormSchema {
  title: string | undefined;
  schema: JSONSchema7;
}
