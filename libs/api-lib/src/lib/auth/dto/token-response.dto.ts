import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '@fm/shared-interfaces';

@ObjectType()
export class TokenResponse {
  @Field({ nullable: true })
  token?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
