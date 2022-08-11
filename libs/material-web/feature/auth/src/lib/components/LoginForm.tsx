import { Formik, Form, type FormikHelpers } from 'formik';
import * as yup from 'yup';
// fm
import { InputField, SubmitButton } from 'fm/main-web-ui';
// context
import { useLoginService } from '../services/LoginServiceProvider';
// types
import type { LoginFormikValues as Values } from '../types/login-formik-values';
import { useEffect } from 'react';

const validationSchema = yup.object({
  username: yup.string().min(4),
  password: yup.string().min(8),
});

const initialValues: Values = { username: '', password: '' };
Object.freeze(initialValues);

export const LoginForm: React.FC = () => {
  const { data, errors, loading, handleSubmit } = useLoginService();

  useEffect(() => {
    console.log();
  }, [data]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Formik
      onSubmit={(values: Values, actions: FormikHelpers<Values>) => {
        handleSubmit(values, actions);
      }}
      {...{ initialValues, validationSchema }}
    >
      <Form>
        <InputField name="username" type="text" label="Username" />
        <InputField name="password" type="password" label="Password" />
        <SubmitButton
          color={errors?.length ? 'error' : 'primary'}
          loading={loading}
        >
          Login
        </SubmitButton>
      </Form>
    </Formik>
  );
};
export default LoginForm;
