import { JSONSchema7 } from 'json-schema';

interface MaterialSchemaObject {
  type: string;
  schema: JSONSchema7;
}

export type MaterialSchemaObjectArray = MaterialSchemaObject[];
