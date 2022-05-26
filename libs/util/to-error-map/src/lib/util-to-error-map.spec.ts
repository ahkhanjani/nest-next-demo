import { utilToErrorMap } from './util-to-error-map';
// types
import FieldError from 'libs/interface/FieldError';

const testField1: string = 'username';
const testMessage1: string = 'Username error message.';
const testFieldError1: FieldError = {
  field: testField1,
  message: testMessage1,
};

const testField2: string = 'password';
const testMessage2: string = 'Password error message.';
const testFieldError2: FieldError = {
  field: testField2,
  message: testMessage2,
};

const testFieldErrorArray: FieldError[] = [testFieldError1, testFieldError2];

const testMappedErrorObject: Record<string, string> = {
  [testField1]: testMessage1,
  [testField2]: testMessage2,
};

describe('utilToErrorMap', () => {
  it('field error mapping', () => {
    expect(utilToErrorMap(testFieldErrorArray)).toEqual(testMappedErrorObject);
  });
});
