import { PropsWithChildren, useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
// types
import type { FormikValues } from './types/formik';
// store
import {
  useAppDispatch,
  useAppSelector,
  setSelectedMaterialIndex,
} from 'fm/material-web-state';

/**
 * Validation schema used by Formik to validate fields.
 */
const validationSchema = yup.object({
  title: yup.string().required('Title is required.'),
  type: yup.string().required('Please choose a type.'),
});

const formikEmptyState: FormikValues = {
  title: '',
  type: '',
  publish: false,
};

const FormikContainer: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  //
  // ─── STORE ───────────────────────────────────────────────────────
  //

  const { materialDataArray, selectedMaterialIndex } = useAppSelector(
    (state) => state.creatingMaterials,
  );
  const { editMode, editingMaterialData } = useAppSelector(
    (state) => state.editingMaterial,
  );

  const dispatch = useAppDispatch();

  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [formikInitialValues, setFormikInitialValues] =
    useState<FormikValues>(formikEmptyState);

  //
  // ─── EFFECT ──────────────────────────────────────────────────────
  //

  // in edit mode set intial form data
  useEffect(() => {
    function handleSetInitialData() {
      if (!editMode) return;

      const { formData, ...formikValues } = { ...editingMaterialData };
      setFormikInitialValues({ publish, title, type });
    }

    handleSetInitialData();
  }, [editMode, editingMaterialData]);

  // when selected material changes in material-stacker
  useEffect(() => {
    function handleSelectedMaterialChange() {
      if (editMode) return;

      if (materialDataArray.length === 0)
        dispatch(setSelectedMaterialIndex(-1));

      //* 'create new material' tab
      if (selectedMaterialIndex === -1) {
        setFormikInitialValues(formikEmptyState);
        return;
      }

      //* a locally created material material
      const selectedMaterial = { ...materialDataArray[selectedMaterialIndex] };
      // switch to the new values
      const { data, ...formikValues } = { ...selectedMaterial };
      setFormikInitialValues(formikValues);
    }

    handleSelectedMaterialChange();
  }, [dispatch, editMode, materialDataArray, selectedMaterialIndex]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Formik
      onSubmit={() => {
        console.log('');
      }}
      initialValues={formikInitialValues}
      enableReinitialize
      {...{ validationSchema }}
    >
      {children}
    </Formik>
  );
};
export default FormikContainer;
