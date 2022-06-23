import { useState } from 'react';
import { render } from '@testing-library/react';
// cmp
import ScrollDialog from '.';

describe('ScrollDialog', () => {
  it('should render successfully', () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { baseElement } = render(
      <ScrollDialog title="title" content="text" {...{ isOpen, setIsOpen }} />
    );
    expect(baseElement).toBeTruthy();
  });
});
