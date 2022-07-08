import { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form, type FormikHelpers } from 'formik';
import * as yup from 'yup';
// cmp
import { InputField, SubmitButton } from '@fm/main-web-ui-form';
// gql
import { useCreateUserMutation } from '@fm/gql';
// utils
import { toErrorMap } from '@fm/utils';
// styles
import styles from './SignupForm.module.scss';
// types
import { UnpredictedFormErrors } from '@fm/main-web/types';

const validationSchema = yup.object({
  username: yup.string().min(4),
  password: yup.string().min(8),
});

const initialValues: Values = { username: '', password: '' };

const SignupForm: React.FC = () => {
  const router = useRouter();

  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [errors, setErrors] = useState<UnpredictedFormErrors>([]);

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const [createUser, { error: createUserError, loading: createUserLoading }] =
    useCreateUserMutation({});

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

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
    errors.length > 0 ? (
      errors.map((err, index) => (
        <li key={`error-${index}`} className={styles.errorListItem}>
          {err.toString()}
        </li>
      ))
    ) : (
      <></>
    );

  return (
    <>
      {errors.length > 0 && (
        <div className={styles.errorBox}>
          <ul className={styles.errorList}>{errorListItems}</ul>
        </div>
      )}
      <Formik
        onSubmit={(values: Values, actions: FormikHelpers<Values>) =>
          handleSubmit(values, actions)
        }
        {...{ initialValues, validationSchema }}
      >
        <Form className={styles.form}>
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

interface Values {
  username: string;
  password: string;
}
