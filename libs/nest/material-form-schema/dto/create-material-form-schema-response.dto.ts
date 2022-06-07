import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '../../_general/field-error';
import { MaterialFormSchema } from '../interface/material-form-schema.interface';

@ObjectType()
export class CreateMaterialFormSchemaResponse {
  @Field(() => [MaterialFormSchema])
  createdSchemas?: MaterialFormSchema[];

  @Field(() => [FieldError])
  errors?: FieldError[];
}
