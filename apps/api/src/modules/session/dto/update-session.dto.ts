import { Field, InputType } from '@nestjs/graphql';

import { SessionState } from '../enums/session-state.enum';
import { IsValidSessionDate } from '../validator/date.validator';

@InputType()
export class UpdateSessionDto {
  @IsValidSessionDate()
  @Field()
  date: Date;

  @Field(() => SessionState)
  state: SessionState;
}
