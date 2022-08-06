import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSessionDto {
  @Field(() => ID)
  teacherId: string;

  @Field(() => ID)
  studentId: string;

  @Field()
  date: Date;
}
