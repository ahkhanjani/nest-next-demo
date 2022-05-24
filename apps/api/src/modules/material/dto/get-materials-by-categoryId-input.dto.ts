import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetMaterialsByCategoryIdInput {
  @Field(() => ID)
  readonly categoryId: string;
}
