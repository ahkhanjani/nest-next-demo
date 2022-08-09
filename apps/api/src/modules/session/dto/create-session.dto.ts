import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { IsEnumExist } from '../../enum/validator/enum-exist.validator';

import { IsValidSessionDate } from '../validator/date.validator';

@InputType()
export class CreateSessionDto {
  @IsMongoId()
  @Field(() => ID)
  teacherId: string;

  @IsMongoId()
  @Field(() => ID)
  studentId: string;

  @IsValidSessionDate()
  @Field()
  date: Date;

  @IsEnumExist()
  @Field(() => ID)
  statusId: string;
}
