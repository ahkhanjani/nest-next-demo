import { JSONSchema7 } from 'json-schema';
import { MaterialTypePolicy } from 'src/modules/material/interfaces/material.interface';

export interface MaterialFormSchema {
  type: MaterialTypePolicy;
  schema: JSONSchema7;
}
