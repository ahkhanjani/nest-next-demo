import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnumExist } from '../../enum/validator/enum-exist.validator';
import { IsValidSessionDate } from '../validator/date.validator';

@InputType()
export class UpdateSessionDto {
  @IsValidSessionDate()
  @Field()
  date: Date;

  @IsEnumExist()
  @Field(() => ID)
  statusId: string;
}
