import { useContext, useEffect } from 'react';
import { Form, useFormikContext } from 'formik';
// gql
import { useLoginMutation } from '@fm/gql';
// utils
import { utilToErrorMap } from '@fm/util';
// auth
import { AuthContext } from '@fm/auth';
// cmp
import InputField from '../../../components/form/InputField';
import SubmitButton from '../../../components/form/SubmitButton';
import { FormikValues } from './types/formik';
// store
import { useAppDispatch } from '../../../hooks';
import { setSnackbarMessage } from '../../../store/snackbar-message';

const FormContent: React.FC = () => {
  const { setErrors, values } = useFormikContext<FormikValues>();

  //
  // ─── AUTH ───────────────────────────────────────────────────────────────────────
  //

  const authContext = useContext(AuthContext);

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const [login, { loading: loginLoading, error: loginError }] =
    useLoginMutation();

  //
  // ─── EFFECT ──────────────────────────────────────────────────────
  //

  useEffect(() => {
    if (loginError) {
      setErrors({ username: 'Connection error. Please try again.' });
      console.error(loginError);
    }
  }, [loginError, setErrors]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  const dispatch = useAppDispatch();

  async function handleSubmit() {
    // send login request
    const { data: { login: loginData } = {} } = await login({
      variables: values,
    });
    // pass errors to formik
    if (loginData.errors) {
      setErrors(utilToErrorMap(loginData.errors));
      return;
    }

    // set user global context
    const token: string = loginData.token;
    authContext.login(token);

    dispatch(
      setSnackbarMessage({
        message: 'Logged in successfully.',
        severity: 'success',
      })
    );
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Form>
      <InputField label="Username" name="username" type="text" />
      <InputField label="Password" name="password" type="password" />
      <SubmitButton onClick={handleSubmit} loading={loginLoading}>
        Login
      </SubmitButton>
    </Form>
  );
};
export default FormContent;
