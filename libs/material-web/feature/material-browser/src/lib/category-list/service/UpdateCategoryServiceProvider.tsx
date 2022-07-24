import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { type FormikHelpers } from 'formik';
// fm
import {
  UpdateMaterialCategoryMutation,
  useUpdateMaterialCategoryMutation,
} from 'fm/shared-graphql';
import { toErrorMap } from 'fm/shared-utils';
import type { UnpredictedFormErrors } from 'fm/shared-types';
import type { UpdateCategoryFormikValues as Values } from '../types/UpdateCategoryValues.interface';

export const UpdateMaterialCategoryServiceContext =
  createContext<UpdateMaterialCategoryServiceContextValue>(
    {} as UpdateMaterialCategoryServiceContextValue
  );

export const UpdateMaterialCategoryServiceProvider: React.FC<
  PropsWithChildren
> = ({ children }) => {
  const [errors, setErrors] = useState<UnpredictedFormErrors>([]);
  const [success, setSuccess] = useState<boolean>(false);

  // ─── Gql ────────────────────────────────────────────────────────────────────────

  const [createCategory, { data, error, loading }] =
    useUpdateMaterialCategoryMutation();

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

      const formErrors = data.updateMaterialCategory.error;
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
    <UpdateMaterialCategoryServiceContext.Provider
      value={{ data, errors, loading, handleSubmit, success }}
    >
      {children}
    </UpdateMaterialCategoryServiceContext.Provider>
  );
};

export const useUpdateMaterialCategoryService = () =>
  useContext(UpdateMaterialCategoryServiceContext);

export interface UpdateMaterialCategoryServiceContextValue {
  data: UpdateMaterialCategoryMutation | null | undefined;
  errors: UnpredictedFormErrors;
  loading: boolean;
  handleSubmit: (
    values: Values,
    actions: FormikHelpers<Values>
  ) => Promise<void>;
  success: boolean;
}
