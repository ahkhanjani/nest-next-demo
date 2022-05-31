import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { MaterialCategoriesService } from '@fm/api/material-category/material-categories.service';
import { MaterialCategory } from '../interface';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsMaterialCategoryAlreadyExistingConstraint
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly materialCategoriesService: MaterialCategoriesService
  ) {}
  async validate(title: string, args: ValidationArguments) {
    const [props]: Props[] = args.constraints;
    const updating = props.updating;

    let parentId: string;
    if (updating) {
      const id: string = (args.object as any)['id'];
      const selectedCategory: MaterialCategory =
        await this.materialCategoriesService.findOne(id);
      parentId = selectedCategory.parentId;
    } else parentId = (args.object as any)['parentId'];

    const exists: boolean =
      await this.materialCategoriesService.checkAlreadyExists({
        title,
        parentId,
      });

    if (exists) return false;
    return true;
  }
  defaultMessage() {
    return 'A category with this title already exists.';
  }
}

export function IsMaterialCategoryAlreadyExisting(
  props: Props = { updating: false },
  validationOptions?: ValidationOptions
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsMaterialCategoryAlreadyExisting',
      target: object.constructor,
      propertyName,
      constraints: [props],
      options: validationOptions,
      validator: IsMaterialCategoryAlreadyExistingConstraint,
    });
  };
}

interface Props {
  updating: boolean;
}
