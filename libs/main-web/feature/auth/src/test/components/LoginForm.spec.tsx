import { render } from '@testing-library/react';
// cmp
import LoginForm from '../../lib/components/LoginForm';

describe('LoginForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LoginForm />);
    expect(baseElement).toBeTruthy();
  });
});
