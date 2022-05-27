import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class MaterialPaginateInput {
  @IsInt()
  @Field(() => Int)
  readonly limit: number;

  @IsInt()
  @Field(() => Int)
  readonly page: number;

  @Field(() => ID)
  readonly categoryId: string;
}
