import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FailedMaterialResponse {
  @Field()
  readonly materialTitle: string;

  @Field()
  readonly message: string;
}
