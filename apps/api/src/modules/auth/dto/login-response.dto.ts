import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from 'fm/shared-types';

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  userId?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
