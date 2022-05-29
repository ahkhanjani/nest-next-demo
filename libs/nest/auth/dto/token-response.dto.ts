import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '@fm/field-error';

@ObjectType()
export class TokenResponse {
  @Field({ nullable: true })
  token?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}