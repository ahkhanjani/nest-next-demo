import { FieldError } from 'fm/shared-types';
import { toErrorMap } from '../lib/toErrorMap';

describe('toErrorMap', () => {
  it('should create an error object', () => {
    const fieldErrorMock: FieldError = {
      field: 'username',
      message: 'Username not found.',
    };

    expect(toErrorMap([fieldErrorMock])).toEqual({
      [fieldErrorMock.field]: fieldErrorMock.message,
    });
  });
});
