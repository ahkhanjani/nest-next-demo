import { ObjectType, Field } from '@nestjs/graphql';
import FieldError from '../../../../../../libs/nest/interface/general/field-error.interface';
import { User } from '../interfaces/user.interface';

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
