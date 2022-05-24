import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistingConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly usersService: UsersService) {}
  async validate(userName: any) {
    const res = await this.usersService.findOneByUsername(userName);

    if (res.user) return false;
    return true;
  }
  defaultMessage() {
    return 'This username is already taken.';
  }
}

export function IsUserAlreadyExisting(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUserAlreadyExisting',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsUserAlreadyExistingConstraint,
    });
  };
}
