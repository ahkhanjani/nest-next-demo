import { Field, InputType } from '@nestjs/graphql';
import {
  IsPassword,
  IsUserAlreadyExisting,
  IsUsername,
} from '@fm/api-lib/user/validator';

@InputType()
export class CreateUserInput {
  @IsUsername({ context: { field: 'username' } })
  @IsUserAlreadyExisting({ context: { field: 'username' } })
  @Field()
  readonly username: string;

  @IsPassword({ context: { field: 'field' } })
  @Field()
  readonly password: string;
}
