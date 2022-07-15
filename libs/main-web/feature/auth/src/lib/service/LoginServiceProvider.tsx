import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { type FormikHelpers } from 'formik';
// fm
import { CreateUserMutation, useCreateUserMutation } from '@fm/gql';
import { toErrorMap } from '@fm/utils';
import type { UnpredictedFormErrors } from '@fm/main-web/types';
import type { SignupFormikValues } from '../types/signup-formik-values';

export const LoginServiceContext = createContext<LoginServiceContextValue>(
  {} as LoginServiceContextValue
);

export const LoginServiceProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [errors, setErrors] = useState<UnpredictedFormErrors>([]);
  const [success, setSuccess] = useState<boolean>(false);

  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const [createUser, { data, error, loading }] = useCreateUserMutation();

  // ─── Handlers ───────────────────────────────────────────────────────────────────

  async function handleSubmit(
    values: SignupFormikValues,
    actions: FormikHelpers<SignupFormikValues>
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
    <LoginServiceContext.Provider
      value={{ data, errors, loading, handleSubmit, success }}
    >
      {children}
    </LoginServiceContext.Provider>
  );
};

export const useLoginService = () => useContext(LoginServiceContext);

export interface LoginServiceContextValue {
  data: CreateUserMutation | null | undefined;
  errors: UnpredictedFormErrors;
  loading: boolean;
  handleSubmit: (
    values: SignupFormikValues,
    actions: FormikHelpers<SignupFormikValues>
  ) => Promise<void>;
  success: boolean;
}
