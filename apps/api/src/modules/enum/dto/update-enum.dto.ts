import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsString } from 'class-validator';

@InputType()
export class UpdateEnumDto {
  @IsMongoId()
  @Field(() => ID, { nullable: true })
  creatorId?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  enumTitle?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  value?: string;
}
