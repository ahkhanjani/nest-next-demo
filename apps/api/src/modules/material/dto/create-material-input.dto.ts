import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMaterialsInput {
  @Field(() => [String])
  readonly materialArray: string[];

  @Field(() => [String])
  readonly category: string[];
}
