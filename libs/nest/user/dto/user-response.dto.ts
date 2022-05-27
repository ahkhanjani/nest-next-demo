import { ObjectType, Field } from '@nestjs/graphql';
import { FieldError } from '../../_general/field-error';
import { User } from '../interface';

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
