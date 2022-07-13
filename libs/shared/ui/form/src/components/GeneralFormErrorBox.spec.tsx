import { render } from '@testing-library/react';

import GeneralFormErrorBox from './GeneralFormErrorBox';

describe('GeneralFormErrorBox', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GeneralFormErrorBox errors={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
