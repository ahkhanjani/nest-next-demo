import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { type FormikHelpers } from 'formik';
// fm
import { CreateUserMutation, useCreateUserMutation } from 'fm/shared-graphql';
import { toErrorMap } from 'fm/shared-utils';
import type { UnpredictedFormErrors } from 'fm/shared-types';
import type { LoginFormikValues as Values } from '../types/login-formik-values';

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

  async function handleSubmit(values: Values, actions: FormikHelpers<Values>) {
    console.log('first');
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
    values: Values,
    actions: FormikHelpers<Values>
  ) => Promise<void>;
  success: boolean;
}
