import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsMaterialCategoryAlreadyExisting,
  IsMaterialCategoryTitle,
} from '../validators';

@InputType()
export class UpdateCategoryInput {
  @Field(() => ID)
  readonly id: string;

  @IsMaterialCategoryAlreadyExisting({ updating: true })
  @IsMaterialCategoryTitle()
  @Field()
  readonly title: string;
}
