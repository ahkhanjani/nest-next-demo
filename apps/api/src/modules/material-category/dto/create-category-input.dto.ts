import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsMaterialCategoryAlreadyExisting,
  IsMaterialCategoryTitle,
} from '../validators';

@InputType()
export class CreateCategoryInput {
  @IsMaterialCategoryAlreadyExisting()
  @IsMaterialCategoryTitle()
  @Field()
  readonly title: string;

  @Field(() => ID, { nullable: true })
  readonly parentId: string;
}