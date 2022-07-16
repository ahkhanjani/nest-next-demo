import { render, screen } from '@testing-library/react';
// cmp
import { UIStateProvider } from '../context/UIStateProvider';

describe('UIStateProvider', () => {
  it('shoud render', () => {
    render(<UIStateProvider />);

    screen.debug();
  });
});
