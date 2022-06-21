import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsMaterialCategoryAlreadyExisting,
  IsMaterialCategoryTitle,
} from '../validator';

@InputType()
export class UpdateMaterialCategoryInput {
  @Field(() => ID)
  readonly id: string;

  @IsMaterialCategoryAlreadyExisting({ updating: true })
  @IsMaterialCategoryTitle()
  @Field()
  readonly title: string;
}
