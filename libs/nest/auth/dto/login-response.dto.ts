import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '../../_general/field-error';

@ObjectType()
export class LoginResponse {
  @Field({ nullable: true })
  userId?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
