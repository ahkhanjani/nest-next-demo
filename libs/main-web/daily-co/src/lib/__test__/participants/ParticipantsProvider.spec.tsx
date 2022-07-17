import { render } from '@testing-library/react';
// cmp
import { ParticipantsProvider } from '../../participants/context/ParticipantsProvider';

describe('ParticipantsProvider', () => {
  it('shoud render successfully', () => {
    const { baseElement } = render(<ParticipantsProvider />);
    expect(baseElement).toBeTruthy();
  });
});
