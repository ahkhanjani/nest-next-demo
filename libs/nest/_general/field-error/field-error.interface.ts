import { ObjectType, Field } from '@nestjs/graphql';
import { FieldErrorType } from '.';

@ObjectType()
export class FieldError implements FieldErrorType {
  @Field()
  field: string;

  @Field()
  message: string;
}
