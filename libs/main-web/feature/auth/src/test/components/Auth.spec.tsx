import { render } from '@testing-library/react';
import { MockedProvider as ApolloProvider } from '@apollo/client/testing';
// cmp
import Auth from '../../lib/components/Auth';

describe('Auth', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Auth />, { wrapper: ApolloProvider });
    expect(baseElement).toBeTruthy();
  });
});
