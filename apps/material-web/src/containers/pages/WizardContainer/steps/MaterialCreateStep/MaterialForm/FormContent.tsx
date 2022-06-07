import { useCallback, useState } from 'react';
import { Form, useFormikContext } from 'formik';
// cmp
import CheckboxField from '../../../../../../components/form/CheckboxField';
import SubmitButton from '../../../../../../components/form/SubmitButton';
import TitleInputField from './TitleInputField';
import TypeSelectField from './TypeSelectField';
import DynamicForm from './DynamicForm';
import CategorySelectForm from '../../../components/CategorySelectForm';
// types
import type { MaterialData } from '@fm/types';
import type { FormikValues } from './types/formik';
import type { JSONSchema7 } from 'json-schema';
// store
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import {
  addMaterialData,
  editMaterialData,
} from '../../../../../../store/creating-materials';
import { Typography } from '@mui/material';

const FormContent: React.FC = () => {
  const {
    values,
    setSubmitting,
    isValid,
    resetForm: formikReset,
  } = useFormikContext<FormikValues>();

  //
  // ─── STORE ───────────────────────────────────────────────────────
  //

  const { selectedMaterialIndex } = useAppSelector(
    (state) => state.creatingMaterials
  );
  const { editMode } = useAppSelector((state) => state.editingMaterial);

  const dispatch = useAppDispatch();

  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [dynamicFormSchema, setDynamicFormSchema] = useState<JSONSchema7>({});
  const [dynamicFormData, setDynamicFormData] = useState<unknown>(undefined);
  // TODO handle tags
  const [tagIdArray, setTagIdArray] = useState<string[]>([]);

  //
  // ─── HELPERS ────────────────────────────────────────────────────────────────────
  //

  /**
   * Creates a material data object using the data in the current state.
   * @returns The current material data object.
   */
  const createMaterialDataObject = useCallback((): MaterialData => {
    const materialData: MaterialData = {
      ...values,
      data: dynamicFormData,
    };
    return materialData;
  }, [dynamicFormData, values]);

  function clearForm() {
    setDynamicFormSchema({});
    setDynamicFormData(undefined);
    setTagIdArray([]);
    formikReset();
  }

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  /**
   * Adds current material to local list.
   */
  function handleCreateMaterial() {
    const materialData = createMaterialDataObject();
    dispatch(addMaterialData(materialData));
    clearForm();
    // TODO show success message
    // setSuccessMessage('Changes saved successfully.');
  }

  /**
   * Updates selected material in local list.
   */
  function handleEditLocalMaterial() {
    const materialData = createMaterialDataObject();
    dispatch(editMaterialData(materialData));
    // TODO show success message
    // setSuccessMessage('Changes saved successfully.');
  }

  // TODO handle edit
  /**
   * Updates a material that is saved on the server.
   */
  function handleEditSavedMaterial() {
    // const materialData = createMaterialDataObject();
    // setMaterialDataArray([materialData]);
  }

  /**
   * Adds the created material to the local list.
   *
   * First, checks if title already exists.
   */
  async function handleSubmit() {
    setSubmitting(true);

    //* editing material on the server
    if (editMode) {
      handleEditSavedMaterial();
      return;
    }

    //* creating new material
    if (selectedMaterialIndex === -1) {
      handleCreateMaterial();
      return;
    }

    //* editing local material
    handleEditLocalMaterial();

    setSubmitting(false);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <Form>
        <TitleInputField />
        <TypeSelectField
          {...{
            setDynamicFormSchema,
          }}
        />
      </Form>

      <DynamicForm
        schema={dynamicFormSchema}
        formData={dynamicFormData}
        setFormData={setDynamicFormData}
      />

      <Typography sx={{ mb: 2 }}>Tags</Typography>
      <CategorySelectForm idArray={tagIdArray} setIdArray={setTagIdArray} />

      <Form>
        <CheckboxField name="publish" label="Publish" />
        <SubmitButton onClick={handleSubmit} disabled={!isValid}>
          Create
        </SubmitButton>
      </Form>
    </>
  );
};
export default FormContent;
