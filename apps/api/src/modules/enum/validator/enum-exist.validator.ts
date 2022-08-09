import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { EnumsService } from '../enums.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEnumExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly enumsService: EnumsService) {}
  async validate(id: string) {
    const enumValue = await this.enumsService.findOne(id);
    if (!enumValue) return false;
    return true;
  }
  defaultMessage() {
    return 'The selected session status does not exist.';
  }
}

export function IsEnumExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEnumExist',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsEnumExistConstraint,
    });
  };
}
