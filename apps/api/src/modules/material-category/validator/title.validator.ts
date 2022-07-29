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
          if (!(isNotEmpty(value) || isString(value) || minLength(value, 3)))
            return false;

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.value} is not a valid title.`;
        },
      },
    });
  };
}
