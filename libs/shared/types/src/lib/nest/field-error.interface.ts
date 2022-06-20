import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
