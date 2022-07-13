import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, type FormikHelpers } from 'formik';
import * as yup from 'yup';
// fm
import { InputField, SubmitButton } from '@fm/main-web-ui-form';
import { useCreateUserMutation } from '@fm/gql';
import { toErrorMap } from '@fm/utils';
import type { UnpredictedFormErrors } from '@fm/main-web/types';
// styles
import styles from './SignupForm.module.css';

const validationSchema = yup.object({
  username: yup.string().min(4),
  password: yup.string().min(8),
});

const initialValues: Values = { username: '', password: '' };

export const SignupForm: React.FC<SubmitFormProps> = ({ onSubmit }) => {
  const router = useRouter();

  // ─── State ──────────────────────────────────────────────────────────────────────

  const [errors, setErrors] = useState<UnpredictedFormErrors>([]);

  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const [createUser, { error: createUserError, loading: createUserLoading }] =
    useCreateUserMutation({});

  // ─── Handlers ───────────────────────────────────────────────────────────────────

  async function handleSubmit(values: Values, actions: FormikHelpers<Values>) {
    resetErrors();

    try {
      const res = await createUser({ variables: values });

      if (res.errors) {
        setErrors(res.errors);
        return;
      }

      const formErrors = res.data?.createUser.errors;
      if (formErrors) {
        actions.setErrors(toErrorMap(formErrors));
        return;
      }

      handleSuccess();
    } catch (err) {
      if (err instanceof Error) {
        setErrors([...errors, err]);
      }
    }
  }

  /**
   * Handles the events after a successful signup.
   */
  function handleSuccess() {
    router.push('/');
  }

  function resetErrors() {
    setErrors([]);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  const errorListItems =
    errors.length > 0
      ? errors.map((err, index) => (
          <li key={`error-${index}`} className={styles['errorListItem']}>
            {err.toString()}
          </li>
        ))
      : null;

  return (
    <>
      {errors.length > 0 && (
        <div className={styles['errorBox']}>
          <ul className={styles['errorList']}>{errorListItems}</ul>
        </div>
      )}
      <Formik
        onSubmit={(values: Values, actions: FormikHelpers<Values>) =>
          onSubmit ? onSubmit() : handleSubmit(values, actions)
        }
        {...{ initialValues, validationSchema }}
      >
        <Form className={styles['form']}>
          <InputField name="username" type="text" label="Username" />
          <InputField name="password" type="password" label="Password" />
          <SubmitButton
            color={errors.length || createUserError ? 'error' : 'primary'}
            loading={createUserLoading}
          >
            Sign Up
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
};
export default SignupForm;

interface SubmitFormProps {
  onSubmit?: () => void;
}

export interface Values {
  username: string;
  password: string;
}
