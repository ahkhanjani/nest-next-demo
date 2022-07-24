import { render } from '@testing-library/react';
import { MockedProvider as ApolloProvider } from '@apollo/client/testing';
// cmp
import Prereg from '../../lib/components/Prereg';

describe('Prereg', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Prereg />, { wrapper: ApolloProvider });
    expect(baseElement).toBeTruthy();
  });
});
