import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider as ApolloProvider } from '@apollo/client/testing';
// cmp
import {
  LoginServiceProvider,
  LoginServiceContext,
} from '../../lib/service/LoginServiceProvider';
import LoginForm from '../../lib/components/LoginForm';

describe('LoginServiceProvider', () => {
  describe('provider', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<LoginServiceProvider />, {
        wrapper: ApolloProvider,
      });
      expect(baseElement).toBeTruthy();
    });

    it('should handle submit successfully', async () => {
      const handleSubmit = jest.fn();

      render(
        <LoginServiceContext.Provider
          value={{
            handleSubmit,
            data: null,
            errors: [],
            loading: false,
            success: false,
          }}
        >
          <LoginForm />
        </LoginServiceContext.Provider>,
        { wrapper: ApolloProvider },
      );

      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/username/i), 'john.dee');
      await user.type(screen.getByLabelText(/password/i), 's0mEpAsSw0Rd');

      await user.click(screen.getByRole('button', { name: /login/i }));

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
        <LoginServiceProvider>
          <LoginServiceContext.Consumer>
            {({ data, errors, loading, success }) => {
              expect(data).toBeUndefined();
              expect(errors).toEqual([]);
              expect(loading).toBe(false);
              expect(success).toBe(false);

              return undefined;
            }}
          </LoginServiceContext.Consumer>
        </LoginServiceProvider>,
        { wrapper: ApolloProvider },
      );
    });
  });
});
