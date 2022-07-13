import { toErrorMap } from '../toErrorMap';
import { fieldErrorStub } from './stubs/field-error.stub';

describe('toErrorMap', () => {
  it('should create an error object', () => {
    expect(toErrorMap([fieldErrorStub])).toEqual({
      [fieldErrorStub.field]: fieldErrorStub.message,
    });
  });
});
