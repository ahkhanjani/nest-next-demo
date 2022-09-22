import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

import { SessionState } from '../enums/session-state.enum';
import { IsValidSessionDate } from '../validator/date.validator';

@InputType()
export class CreateSessionDto {
  @IsMongoId()
  @Field(() => [ID])
  participantIds: string[];

  @IsValidSessionDate()
  @Field()
  date: Date;

  @Field(() => SessionState)
  state: SessionState;
}
