import { ObjectType, Field } from '@nestjs/graphql';
// libs
import { type default as FieldErrorObject } from '../../../types/field-error';

@ObjectType()
export default class FieldError implements FieldErrorObject {
  @Field()
  field: string;

  @Field()
  message: string;
}
