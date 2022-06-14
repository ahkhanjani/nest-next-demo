import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  isString,
  minLength,
  isNotEmpty,
} from 'class-validator';

export function IsMaterialCategoryTitle(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isMaterialCategoryTitle',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string) {
          if (isNotEmpty(value) === false) return false;
          if (isString(value) === false) return false;
          if (minLength(value, 3) === false) return false;
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.value} is not a valid title.`;
        },
      },
    });
  };
}
