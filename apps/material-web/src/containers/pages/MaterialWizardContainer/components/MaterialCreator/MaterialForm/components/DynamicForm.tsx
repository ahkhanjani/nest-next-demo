import { MuiForm5 as Form } from '@rjsf/material-ui';
// mui
import Box from '@mui/material/Box';
// types
import { JSONSchema7 } from 'json-schema';

const DynamicForm: React.FC<DynamicFormProps> = ({
  schema,
  formData,
  setFormData,
}) => {
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
