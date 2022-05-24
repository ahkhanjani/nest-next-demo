import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '../../../app/interfaces/field-error.interface';
import { PreRegEmail } from '../interfaces/pre-reg-email.interface';

@ObjectType()
export class PreRegResponse {
  @Field(() => PreRegEmail, { nullable: true })
  email?: PreRegEmail;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
