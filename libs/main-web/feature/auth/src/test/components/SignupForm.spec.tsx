import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// cmp
import SignupForm from '../../components/SignupForm/SignupForm';

describe('SignupForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignupForm />);
    expect(baseElement).toBeTruthy();
  });

  describe('Formik form', () => {
    it('should render and submit', async () => {
      const handleSubmit = jest.fn();
      render(<SignupForm onSubmit={handleSubmit} />);
      const user = userEvent.setup();

      await user.type(screen.getByLabelText(/username/i), 'john.dee');
      await user.type(screen.getByLabelText(/password/i), 's0mEpAsSw0Rd');

      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
          username: 'john.dee',
          password: 's0mEpAsSw0Rd',
        })
      );
    });
  });
});
