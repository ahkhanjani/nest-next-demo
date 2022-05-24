import {
  registerDecorator,
  ValidationOptions,
  isString,
  minLength,
  isNotEmpty,
  matches,
} from 'class-validator';
import { passwordRegExp } from '../constants';

export function IsPassword(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (isNotEmpty(value) === false) return false;
          if (isString(value) === false) return false;
          if (minLength(value, 8) === false) return false;
          if (matches(value, passwordRegExp) === false) return false;
          return true;
        },
        defaultMessage() {
          return `Password is not valid.`;
        },
      },
    });
  };
}
