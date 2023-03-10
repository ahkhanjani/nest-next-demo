import { useEffect } from 'react';
import Form from '@rjsf/material-ui/v5';
// mui
import Box from '@mui/material/Box';
// types
import type { JSONSchema7 } from 'json-schema';
// store
import { useAppSelector } from 'fm/material-web-state';

const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  formData,
  setFormData,
}) => {
  // ─── Store ──────────────────────────────────────────────────────────────────────

  const { materialDataArray, selectedMaterialIndex } = useAppSelector(
    (state) => state.creatingMaterials,
  );
  const { editMode, editingMaterialData } = useAppSelector(
    (state) => state.editingMaterial,
  );

  // ─── Data ───────────────────────────────────────────────────────────────────────

  // in edit mode, set initial data
  useEffect(() => {
    function handleSetInitialData() {
      if (!editMode) return;
      const data = { ...editingMaterialData }.formData;
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
      const data = { ...materialDataArray[selectedMaterialIndex] }.formData;
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
