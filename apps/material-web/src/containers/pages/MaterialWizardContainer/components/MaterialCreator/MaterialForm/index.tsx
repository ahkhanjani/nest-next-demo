import { useEffect, useState } from 'react';
import { Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
// mui
import Paper from '@mui/material/Paper';
// cmp
import SnackbarAlert from '~components/SnackbarAlert';
import CheckboxField from '~components/form/CheckboxField';
import SubmitButton from '~components/form/SubmitButton';
import TitleInputField from './components/TitleInputField';
import TypeSelectField from './components/TypeSelectField';
import DynamicForm from './components/DynamicForm';
// types
import { MaterialData } from '../../../types';
import { JSONSchema7 } from 'json-schema';
import { FormikValues } from './types';

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

const MaterialForm: React.FC<MaterialFormProps> = ({
  editMode,
  materialDataArray,
  setMaterialDataArray,
  selectedMaterialIndex,
}) => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [formikInitialValues, setFormikInitialValues] =
    useState<FormikValues>(formikEmptyState);
  const [rjsfSchema, setRjsfSchema] = useState<JSONSchema7>({});
  // data from rjsf form
  // form data will be snapshot right before submitting the form
  const [rjsfFormData, setRjsfFormData] = useState<any>(undefined);
  // alert
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  // in edit mode set intial form data
  useEffect(() => {
    function handleSetInitialData() {
      if (!editMode) return;

      const { data, ...formikValues } = materialDataArray[0];
      setFormikInitialValues(formikValues);
      setRjsfFormData(data);
    }

    handleSetInitialData();
  }, []);

  // triggered when selected material changes in material-stacker
  useEffect(() => {
    function handleSelectedMaterialChange() {
      if (editMode) return;

      //* `-1` means 'create new material' tab
      if (selectedMaterialIndex === -1) {
        // clear the form
        clearForm();
        return;
      }

      //* any material on the list
      const selectedMaterial = materialDataArray[selectedMaterialIndex];
      // switch to the new values
      const { data, ...formikValues } = selectedMaterial;
      setFormikInitialValues(formikValues);
      setRjsfFormData(data);
    }

    handleSelectedMaterialChange();
  }, [selectedMaterialIndex]);

  useEffect(() => {
    if (successMessage !== '') setIsAlertOpen(true);
  }, [successMessage]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  /**
   * Adds the created material to the local list.
   *
   * First, checks if title already exists.
   */
  async function handleSubmit(values: FormikValues) {
    // editing material on the server
    if (editMode) {
      handleEditSavedMaterial(values);
      return;
    }

    //* creating new material
    if (selectedMaterialIndex === -1) {
      handleCreateMaterial(values);
      return;
    }

    //* editing local material
    handleEditLocalMaterial(values);
  }

  /**
   * Updates a material that is saved on the server.
   */
  function handleEditSavedMaterial(values: FormikValues) {
    const materialData = createMaterialDataObject(values);
    setMaterialDataArray([materialData]);
  }

  /**
   * Updates selected material in local list.
   */
  function handleEditLocalMaterial(values: FormikValues) {
    // make a copy of the local list
    const mtrDataArrCopy = [...materialDataArray];
    // replace the existing data
    const materialData = createMaterialDataObject(values);
    mtrDataArrCopy[selectedMaterialIndex] = materialData;
    setMaterialDataArray(mtrDataArrCopy);

    // show success message
    setSuccessMessage('Changes saved successfully.');
  }

  /**
   * Adds current material to local list.
   */
  function handleCreateMaterial(values: FormikValues) {
    const materialData = createMaterialDataObject(values);
    // add to the local list
    setMaterialDataArray([...materialDataArray, materialData]);
    // reset form and prepare to create new material
    clearForm();

    // show success message
    setSuccessMessage('Material created successfully successfully.');
  }

  /**
   * Creates a material data object using the data in the current state.
   * @returns The current material data object.
   */
  function createMaterialDataObject(values: FormikValues): MaterialData {
    const materialData: MaterialData = {
      ...values,
      data: rjsfFormData,
    };

    return materialData;
  }

  //
  // ─── HELPERS ────────────────────────────────────────────────────────────────────
  //

  function clearForm() {
    setFormikInitialValues(formikEmptyState);
    setRjsfSchema({});
    setRjsfFormData(undefined);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <SnackbarAlert
        severity='success'
        message={successMessage}
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
      />
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 'auto',
        }}
      >
        <Formik
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          initialValues={formikInitialValues}
          enableReinitialize
          {...{ validationSchema }}
        >
          {({ handleSubmit }: FormikProps<FormikValues>) => (
            <Form>
              <TitleInputField
                {...{ editMode, materialDataArray, selectedMaterialIndex }}
              />
              <TypeSelectField {...{ setRjsfSchema }} />
              <DynamicForm
                schema={rjsfSchema}
                formData={rjsfFormData}
                setFormData={setRjsfFormData}
              />
              <CheckboxField name='publish' label='Publish' />
              <SubmitButton onClick={() => handleSubmit()}>Submit</SubmitButton>
            </Form>
          )}
        </Formik>
      </Paper>
    </>
  );
};
export default MaterialForm;

interface MaterialFormProps {
  editMode: boolean;
  materialDataArray: MaterialData[];
  setMaterialDataArray: React.Dispatch<React.SetStateAction<MaterialData[]>>;
  selectedMaterialIndex: number;
}
