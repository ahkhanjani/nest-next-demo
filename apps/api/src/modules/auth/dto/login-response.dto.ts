import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from 'fm/shared-types';

@ObjectType()
export class LoginResponse {
  @Field({ defaultValue: false })
  success?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
