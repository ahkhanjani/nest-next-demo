import { utilToErrorMap } from '..';
import { fieldErrorStub } from './stubs/field-error.stub';

describe('utilToErrorMap', () => {
  it('should create an error object', () => {
    expect(utilToErrorMap([fieldErrorStub])).toEqual({
      [fieldErrorStub.field]: fieldErrorStub.message,
    });
  });
});
