import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider as ApolloProvider } from '@apollo/client/testing';
// cmp
import {
  PreregServiceProvider,
  PreregServiceContext,
} from '../../lib/service/PreregServiceProvider';
import PreregForm from '../../lib/components/PreregForm';

describe('PreregServiceProvider', () => {
  describe('provider', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<PreregServiceProvider />, {
        wrapper: ApolloProvider,
      });
      expect(baseElement).toBeTruthy();
    });

    it('should handle submit successfully', async () => {
      const handleSubmit = jest.fn();

      render(
        <PreregServiceContext.Provider
          value={{
            handleSubmit,
            data: null,
            errors: [],
            loading: false,
            success: false,
          }}
        >
          <PreregForm />
        </PreregServiceContext.Provider>,
        { wrapper: ApolloProvider }
      );

      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/email/i), 'john.dee@email.com');

      await user.click(screen.getByRole('button', { name: /Register/i }));

      await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          email: 'john.dee@email.com',
        },
        expect.anything()
      );
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('consumer', () => {
    it('should return the default value from provider', () => {
      render(
        <PreregServiceProvider>
          <PreregServiceContext.Consumer>
            {({ data, errors, loading, success }) => {
              expect(data).toBeUndefined();
              expect(errors).toEqual([]);
              expect(loading).toBe(false);
              expect(success).toBe(false);

              return undefined;
            }}
          </PreregServiceContext.Consumer>
        </PreregServiceProvider>,
        { wrapper: ApolloProvider }
      );
    });
  });
});
