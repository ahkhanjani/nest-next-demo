import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '@fm/shared-interfaces';
import { PreRegEmail } from '../interface/pre-reg-email.interface';

@ObjectType()
export class PreRegResponse {
  @Field(() => PreRegEmail, { nullable: true })
  email?: PreRegEmail;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
