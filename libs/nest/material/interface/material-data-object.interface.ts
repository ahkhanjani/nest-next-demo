import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MaterialDataObject {
  @Field()
  readonly title: string;

  @Field()
  readonly type: string;

  @Field()
  readonly formData: string;

  @Field()
  readonly status: string;
}
