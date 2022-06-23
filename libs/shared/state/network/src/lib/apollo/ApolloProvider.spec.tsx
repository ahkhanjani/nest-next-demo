import { render } from '@testing-library/react';

import { ApolloProvider } from './ApolloProvider';

describe('ApolloProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApolloProvider />);
    expect(baseElement).toBeTruthy();
  });
});
