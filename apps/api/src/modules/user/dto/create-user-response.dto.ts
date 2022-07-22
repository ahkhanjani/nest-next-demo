import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '@fm/shared-types';

@ObjectType()
export class CreateUserResponse {
  @Field({ defaultValue: false })
  success?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
