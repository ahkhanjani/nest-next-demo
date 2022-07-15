import { capitalizeFirstLetter } from '../lib/capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('should capitalize the first letter of the input', () => {
    expect(capitalizeFirstLetter('letter')).toEqual('Letter');
  });
});
