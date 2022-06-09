import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '../../_general/field-error';
import { User } from '../interface';

@ObjectType()
export class CreateUserResponse {
  @Field({ defaultValue: false })
  success?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
