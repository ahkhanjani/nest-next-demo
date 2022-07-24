import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { type FormikHelpers } from 'formik';
// fm
import {
  CreatePreRegMutation,
  useCreatePreRegMutation,
} from 'fm/shared-graphql';
import { toErrorMap } from 'fm/shared-utils';
import type { UnpredictedFormErrors } from 'fm/shared-types';
import type { RegFormikValues as Values } from '../types/reg-formik-values';

export const PreregServiceContext = createContext<PreregServiceContextValue>(
  {} as PreregServiceContextValue
);

export const PreregServiceProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [errors, setErrors] = useState<UnpredictedFormErrors>([]);
  const [success, setSuccess] = useState<boolean>(false);

  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const [createRegisteration, { data, error, loading }] =
    useCreatePreRegMutation();

  // ─── Handlers ───────────────────────────────────────────────────────────────────

  async function handleSubmit(values: Values, actions: FormikHelpers<Values>) {
    resetErrors();

    try {
      await createRegisteration({ variables: values });

      if (error) {
        setErrors([error]);
        return;
      }

      if (!data) {
        setErrors(['Failed to fetch data.']);
        return;
      }

      const formErrors = data.createPreReg.errors;
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
    <PreregServiceContext.Provider
      value={{ data, errors, loading, handleSubmit, success }}
    >
      {children}
    </PreregServiceContext.Provider>
  );
};

export const usePreregService = () => useContext(PreregServiceContext);

export interface PreregServiceContextValue {
  data: CreatePreRegMutation | null | undefined;
  errors: UnpredictedFormErrors;
  loading: boolean;
  handleSubmit: (
    values: Values,
    actions: FormikHelpers<Values>
  ) => Promise<void>;
  success: boolean;
}
