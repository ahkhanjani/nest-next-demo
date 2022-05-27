import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateMaterialsResponse {
  @Field()
  readonly message: string;
}
