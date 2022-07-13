import { createContext, PropsWithChildren, useState } from 'react';
import { type FormikHelpers } from 'formik';
// fm
import { CreateUserMutation, useCreateUserMutation } from '@fm/gql';
import { toErrorMap } from '@fm/utils';
import type { UnpredictedFormErrors } from '@fm/main-web/types';
import type { SignupFormValues } from '../types/SignupFormValues';

export const SignupServiceContext = createContext<SignupServiceContextValue>(
  {} as SignupServiceContextValue
);

export const SignupServiceProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [errors, setErrors] = useState<UnpredictedFormErrors>([]);
  const [success, setSuccess] = useState<boolean>(false);

  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const [createUser, { data, error, loading }] = useCreateUserMutation();

  // ─── Handlers ───────────────────────────────────────────────────────────────────

  async function handleSubmit(
    values: SignupFormValues,
    actions: FormikHelpers<SignupFormValues>
  ) {
    resetErrors();

    try {
      await createUser({ variables: values });

      if (error) {
        setErrors([error]);
        return;
      }

      if (!data) {
        setErrors(['Failed to fetch data.']);
        return;
      }

      const formErrors = data.createUser.errors;
      if (formErrors) {
        actions.setErrors(toErrorMap(formErrors));
        return;
      }

      handleSuccess();
    } catch (err) {
      if (err instanceof Error) setErrors([...errors, err]);
    }
  }

  /**
   * Handles the events after a successful signup.
   */
  function handleSuccess() {
    setSuccess(true);
  }

  function resetErrors() {
    setErrors([]);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <SignupServiceContext.Provider
      value={{ data, errors, loading, handleSubmit, success }}
    >
      {children}
    </SignupServiceContext.Provider>
  );
};

interface SignupServiceContextValue {
  data: CreateUserMutation | null | undefined;
  errors: UnpredictedFormErrors;
  loading: boolean;
  handleSubmit: (
    values: SignupFormValues,
    actions: FormikHelpers<SignupFormValues>
  ) => Promise<void>;
  success: boolean;
}
