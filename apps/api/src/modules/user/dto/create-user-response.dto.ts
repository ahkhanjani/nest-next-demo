import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '@fm/types';

@ObjectType()
export class CreateUserResponse {
  @Field({ defaultValue: false })
  success?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
