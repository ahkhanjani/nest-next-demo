import { Field, ID, InputType } from '@nestjs/graphql';
import { MaterialDto } from './material.dto';

@InputType()
export class CreateMaterialsInput {
  @Field(() => [ID])
  readonly category: string[];

  @Field(() => [MaterialDto])
  readonly materialDtoArray: MaterialDto[];
}
