import { render } from '@testing-library/react';
// cmp
import SignupForm from '../../lib/components/SignupForm';

describe('SignupForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignupForm />);
    expect(baseElement).toBeTruthy();
  });
});
