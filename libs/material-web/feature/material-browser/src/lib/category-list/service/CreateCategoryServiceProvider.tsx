import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { type FormikHelpers } from 'formik';
// fm
import {
  CreateMaterialCategoryMutation,
  useCreateMaterialCategoryMutation,
} from '@fm/gql';
import { toErrorMap } from '@fm/utils';
import type { UnpredictedFormErrors } from '@fm/shared-types';
import type { CreateCategoryServiceValues as Values } from '../types/CreateCategoryValues.interface';

export const CreateMaterialCategoryServiceContext =
  createContext<CreateMaterialCategoryServiceContextValue>(
    {} as CreateMaterialCategoryServiceContextValue
  );

export const CreateMaterialCategoryServiceProvider: React.FC<
  PropsWithChildren
> = ({ children }) => {
  const [errors, setErrors] = useState<UnpredictedFormErrors>([]);
  const [success, setSuccess] = useState<boolean>(false);

  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const [createCategory, { data, error, loading }] =
    useCreateMaterialCategoryMutation();

  // ─── Handlers ───────────────────────────────────────────────────────────────────

  async function handleSubmit(values: Values, actions: FormikHelpers<Values>) {
    resetErrors();

    try {
      await createCategory({ variables: values });

      if (error) {
        setErrors([error]);
        return;
      }

      if (!data) {
        setErrors(['Failed to fetch data.']);
        return;
      }

      const formErrors = data.createMaterialCategory.message;
      if (formErrors) {
        actions.setErrors(
          toErrorMap([{ field: 'title', message: formErrors }])
        );
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
    <CreateMaterialCategoryServiceContext.Provider
      value={{ data, errors, loading, handleSubmit, success }}
    >
      {children}
    </CreateMaterialCategoryServiceContext.Provider>
  );
};

export const useCreateMaterialCategoryService = () =>
  useContext(CreateMaterialCategoryServiceContext);

export interface CreateMaterialCategoryServiceContextValue {
  data: CreateMaterialCategoryMutation | null | undefined;
  errors: UnpredictedFormErrors;
  loading: boolean;
  handleSubmit: (
    values: Values,
    actions: FormikHelpers<Values>
  ) => Promise<void>;
  success: boolean;
}
