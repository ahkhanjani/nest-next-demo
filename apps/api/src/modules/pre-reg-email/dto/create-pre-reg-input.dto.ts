import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { IsEmailAlreadyExisting } from '../validator';

@InputType()
export class CreatePreRegInput {
  @IsEmail()
  @IsEmailAlreadyExisting({ context: { field: 'email' } })
  @Field()
  readonly email: string;
}
