import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEnumDto {
  @IsNotEmpty()
  @IsMongoId()
  @Field(() => ID)
  creatorId: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  enumTitle: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  value: string;
}
