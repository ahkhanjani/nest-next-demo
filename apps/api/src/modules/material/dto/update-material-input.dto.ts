import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMaterialInput {
  @Field(() => ID)
  readonly materialId: string;

  @Field()
  readonly type: string;

  @Field()
  readonly title: string;

  @Field()
  readonly status: string;

  @Field(() => [ID])
  readonly category: string[];

  @Field()
  readonly formData: string;
}
