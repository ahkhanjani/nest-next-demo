import { Field, InputType } from '@nestjs/graphql';

@InputType()
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
