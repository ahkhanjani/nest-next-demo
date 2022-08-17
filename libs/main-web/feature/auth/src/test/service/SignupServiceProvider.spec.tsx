import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider as ApolloProvider } from '@apollo/client/testing';
// cmp
import {
  SignupServiceProvider,
  SignupServiceContext,
} from '../../lib/service/SignupServiceProvider';
import SignupForm from '../../lib/components/SignupForm';

describe('SignupServiceProvider', () => {
  describe('provider', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<SignupServiceProvider />, {
        wrapper: ApolloProvider,
      });
      expect(baseElement).toBeTruthy();
    });

    it('should handle submit successfully', async () => {
      const handleSubmit = jest.fn();

      render(
        <SignupServiceContext.Provider
          value={{
            handleSubmit,
            data: null,
            errors: [],
            loading: false,
            success: false,
          }}
        >
          <SignupForm />
        </SignupServiceContext.Provider>,
        { wrapper: ApolloProvider },
      );

      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/username/i), 'john.dee');
      await user.type(screen.getByLabelText(/password/i), 's0mEpAsSw0Rd');

      await user.click(screen.getByRole('button', { name: /signup/i }));

      await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          username: 'john.dee',
          password: 's0mEpAsSw0Rd',
        },
        expect.anything(),
      );
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('consumer', () => {
    it('should return the default value from provider', () => {
      render(
        <SignupServiceProvider>
          <SignupServiceContext.Consumer>
            {({ data, errors, loading, success }) => {
              expect(data).toBeUndefined();
              expect(errors).toEqual([]);
              expect(loading).toBe(false);
              expect(success).toBe(false);

              return undefined;
            }}
          </SignupServiceContext.Consumer>
        </SignupServiceProvider>,
        { wrapper: ApolloProvider },
      );
    });
  });
});
