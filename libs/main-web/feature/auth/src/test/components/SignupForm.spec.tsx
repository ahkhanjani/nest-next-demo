import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// cmp
import SignupForm from '../../feature/signup/components/SignupForm';
import { SignupServiceContext } from '../../feature/signup/service/SignupServiceProvider';

describe('SignupForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignupForm />);
    expect(baseElement).toBeTruthy();
  });

  describe('Formik form', () => {
    it('should render and submit', async () => {
      // mock SignupServiceProvider value
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
        </SignupServiceContext.Provider>
      );

      // user event
      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/username/i), 'john.dee');
      await user.type(screen.getByLabelText(/password/i), 's0mEpAsSw0Rd');

      await user.click(screen.getByRole('button', { name: /signup/i }));

      await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith(
          {
            username: 'john.dee',
            password: 's0mEpAsSw0Rd',
          },
          expect.anything()
        )
      );
    });
  });
});
