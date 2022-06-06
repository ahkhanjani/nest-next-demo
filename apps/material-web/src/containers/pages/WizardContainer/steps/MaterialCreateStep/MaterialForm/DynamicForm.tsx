import { useEffect } from 'react';
import Form from '@rjsf/material-ui/v5';
// mui
import Box from '@mui/material/Box';
// types
import type { JSONSchema7 } from 'json-schema';
// store
import { useAppSelector } from '../../../../../../hooks';

const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  formData,
  setFormData,
}) => {
  //
  // ─── STORE ───────────────────────────────────────────────────────
  //

  const { materialDataArray, selectedMaterialIndex } = useAppSelector(
    (state) => state.creatingMaterials
  );
  const { editMode, editingMaterialData } = useAppSelector(
    (state) => state.editingMaterial
  );

  //
  // ─── DATA ───────────────────────────────────────────────────────────────────────
  //

  // in edit mode, set initial data
  useEffect(() => {
    function handleSetInitialData() {
      if (!editMode) return;
      const { data } = { ...editingMaterialData };
      setFormData(data);
    }
    handleSetInitialData();
  }, [editMode, editingMaterialData, setFormData]);

  // when selected material changes in material-stacker
  useEffect(() => {
    function handleSelectedMaterialChange() {
      if (editMode) return;

      //* 'create new material' tab
      // reset the form
      if (selectedMaterialIndex === -1) {
        setFormData(undefined);
        return;
      }

      //* a locally created material material
      // set form data to the selected material
      const selectedMaterial = materialDataArray[selectedMaterialIndex];
      const { data } = { ...selectedMaterial };
      setFormData(data);
    }

    handleSelectedMaterialChange();
  }, [editMode, materialDataArray, selectedMaterialIndex, setFormData]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Box sx={{ mb: 3 }}>
      <Form
        {...{ schema, formData }}
        onChange={({ formData }) => setFormData(formData)}
        uiSchema={{
          'ui:submitButtonOptions': {
            norender: true,
            submitText: '',
            props: {},
          },
        }}
      />
    </Box>
  );
};
export default DynamicForm;

interface DynamicFormProps {
  schema: JSONSchema7;
  formData: unknown;
  setFormData: React.Dispatch<React.SetStateAction<unknown>>;
}
