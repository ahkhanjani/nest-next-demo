import { ObjectType, Field } from '@nestjs/graphql';
import FieldError from '../../../../../../libs/nest/interface/general/field-error.interface';

@ObjectType()
export class TokenResponse {
  @Field({ nullable: true })
  token?: string;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
