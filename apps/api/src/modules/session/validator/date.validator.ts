import { registerDecorator, ValidationOptions, isDate } from 'class-validator';

export function IsValidSessionDate(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidSessionDate',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: Date) {
          if (!isDate(value)) return false;
          return true;
        },
        defaultMessage() {
          return `The selected date is not valid.`;
        },
      },
    });
  };
}
