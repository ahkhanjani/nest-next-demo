import { render } from '@testing-library/react';
// cmp
import { ApolloProvider } from '../../lib/apollo/ApolloProvider';

describe('ApolloProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ApolloProvider />);
    expect(baseElement).toBeTruthy();
  });
});
