import { render } from '@testing-library/react';
// import fetch from 'cross-fetch';
// cmp
import { ApolloProvider } from '../../lib/apollo/ApolloProvider';

describe('ApolloProvider', () => {
  describe('provider', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<ApolloProvider />);
      expect(baseElement).toBeTruthy();
    });
  });
});
