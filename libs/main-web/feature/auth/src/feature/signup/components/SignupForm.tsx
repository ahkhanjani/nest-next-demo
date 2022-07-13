import { Formik, Form, type FormikHelpers } from 'formik';
import * as yup from 'yup';
// fm
import { InputField, SubmitButton } from '@fm/main-web-ui-form';
// styles
import styles from './SignupForm.module.css';
import { SignupFormValues } from '../types/SignupFormValues';
import { useContext } from 'react';
import { SignupServiceContext } from '../service/SignupServiceProvider';

const validationSchema = yup.object({
  username: yup.string().min(4),
  password: yup.string().min(8),
});

const initialValues: SignupFormValues = { username: '', password: '' };

export const SignupForm: React.FC = () => {
  const { errors, loading, handleSubmit } = useContext(SignupServiceContext);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Formik
      onSubmit={(
        values: SignupFormValues,
        actions: FormikHelpers<SignupFormValues>
      ) => {
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
          Signup
        </SubmitButton>
      </Form>
    </Formik>
  );
};
export default SignupForm;
