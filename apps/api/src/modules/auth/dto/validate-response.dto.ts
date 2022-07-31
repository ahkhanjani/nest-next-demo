import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from 'fm/shared-types';

@ObjectType()
export class ValidateResponse {
  @Field({ nullable: true })
  userId?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
