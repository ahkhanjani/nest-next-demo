import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateMaterialResponse {
  @Field()
  readonly message: string;
}
