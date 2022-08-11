import { Formik, Form, type FormikHelpers } from 'formik';
import * as yup from 'yup';
// fm
import { InputField, SubmitButton } from 'fm/main-web-ui';
// context
import { useSignupService } from '../service/SignupServiceProvider';
// types
import type { SignupFormikValues as Values } from '../types/signup-formik-values';

const validationSchema = yup.object({
  username: yup.string().min(4),
  password: yup.string().min(8),
});

const initialValues: Values = { username: '', password: '' };

export const SignupForm: React.FC = () => {
  const { errors, loading, handleSubmit } = useSignupService();

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
          Signup
        </SubmitButton>
      </Form>
    </Formik>
  );
};
export default SignupForm;
