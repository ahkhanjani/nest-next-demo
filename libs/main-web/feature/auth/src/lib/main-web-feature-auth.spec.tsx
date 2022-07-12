import { render } from '@testing-library/react';

import MainWebFeatureAuth from './main-web-feature-auth';

describe('MainWebFeatureAuth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MainWebFeatureAuth />);
    expect(baseElement).toBeTruthy();
  });
});
