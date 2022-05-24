import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PreRegEmailsService as PreRegEmailsService } from '../pre-reg-email.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistingConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly preRegEmailsService: PreRegEmailsService) {}
  async validate(email: string) {
    const exists = await this.preRegEmailsService.checkExisting(email);
    return !exists;
  }
  defaultMessage() {
    return 'This username is already taken.';
  }
}

export function IsEmailAlreadyExisting(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isEmailAlreadyExisting',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsEmailAlreadyExistingConstraint,
    });
  };
}
