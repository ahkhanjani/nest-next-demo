import { JSONSchema7 } from 'json-schema';
import { MaterialTypePolicy } from '../../material/interface';

export interface MaterialFormSchema {
  type: MaterialTypePolicy;
  schema: JSONSchema7;
}
