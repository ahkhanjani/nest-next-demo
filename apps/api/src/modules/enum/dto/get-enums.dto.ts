import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetEnumsDto {
  @Field(() => String, { nullable: true })
  enumTitle?: string;

  @Field(() => ID, { nullable: true })
  creatorId?: string;
}
