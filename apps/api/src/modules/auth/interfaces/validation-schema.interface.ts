import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ValidationSchema {
  @Field()
  usernameSchema: string;

  @Field()
  emailSchema: string;

  @Field()
  passwordSchema: string;
}
