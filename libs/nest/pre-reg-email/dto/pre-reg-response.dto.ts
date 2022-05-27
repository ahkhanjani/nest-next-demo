import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '@fm/nest/_general/field-error';
import { PreRegEmail } from '@fm/nest/pre-reg-email/interface';

@ObjectType()
export class PreRegResponse {
  @Field(() => PreRegEmail, { nullable: true })
  email?: PreRegEmail;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
