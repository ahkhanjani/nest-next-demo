import { Formik, Form, type FormikHelpers } from 'formik';
import * as yup from 'yup';
// fm
import { InputField, SubmitButton } from '@fm/main-web-ui-form';
// context
import { useLoginService } from '../service/LoginServiceProvider';
// styles
import styles from './LoginForm.module.css';
// types
import type { LoginFormikValues as Values } from '../types/login-formik-values';

const validationSchema = yup.object({
  username: yup.string().min(4),
  password: yup.string().min(8),
});

const initialValues: Values = { username: '', password: '' };
Object.freeze(initialValues);

export const LoginForm: React.FC = () => {
  const { errors, loading, handleSubmit } = useLoginService();

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Formik
      onSubmit={(values: Values, actions: FormikHelpers<Values>) => {
        handleSubmit(values, actions);
      }}
      {...{ initialValues, validationSchema }}
    >
      <Form className={styles['form']}>
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
