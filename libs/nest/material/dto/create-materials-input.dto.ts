import { Field, ID, InputType } from '@nestjs/graphql';
import { MaterialDataObject } from '../interface/material-data-object.interface';

@InputType()
export class CreateMaterialsInput {
  @Field(() => [MaterialDataObject])
  readonly materialDataArray: MaterialDataObject[];

  @Field(() => [ID])
  readonly category: string[];
}
