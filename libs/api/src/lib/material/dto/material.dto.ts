import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MaterialDto {
  @Field()
  readonly type: string;

  @Field()
  readonly title: string;

  @Field()
  readonly status: string;

  @Field()
  readonly formData: string;
}
