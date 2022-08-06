import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider as ApolloProvider } from '@apollo/client/testing';
// cmp
import { LoginServiceContext } from '../LoginServiceProvider';
import LoginForm from '../../components/LoginForm';

describe('LoginServiceProvider', () => {
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
      { wrapper: ApolloProvider }
    );

    const fakeUsername = 'john.dee';
    const fakePassword = 's0mEpAsSw0Rd';

    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/username/i), fakeUsername);
    await user.type(screen.getByLabelText(/password/i), fakePassword);

    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalled());
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        username: fakeUsername,
        password: fakePassword,
      },
      expect.anything()
    );
  });
});
