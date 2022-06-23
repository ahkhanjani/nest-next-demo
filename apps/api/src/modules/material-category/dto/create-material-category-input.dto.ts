import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsMaterialCategoryAlreadyExisting,
  IsMaterialCategoryTitle,
} from '../validator';

@InputType()
export class CreateMaterialCategoryInput {
  @IsMaterialCategoryAlreadyExisting()
  @IsMaterialCategoryTitle()
  @Field()
  readonly title: string;

  @Field(() => ID, { nullable: true })
  readonly parentId: string;
}
