import { render } from '@testing-library/react';
// cmp
import PreregForm from '../../lib/components/PreregForm';

describe('PreregForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PreregForm />);
    expect(baseElement).toBeTruthy();
  });
});
