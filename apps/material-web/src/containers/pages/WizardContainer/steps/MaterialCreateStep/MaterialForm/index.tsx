// mui
import Paper from '@mui/material/Paper';
// types
import type { MaterialSchemaObjectArray } from '@fm/types';
// cmp
import FormikContainer from './FormikContainer';
import FormContent from './FormContent';

const MaterialForm: React.FC<MaterialFormProps> = ({ materialSchemaArray }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      <FormikContainer>
        <FormContent {...{ materialSchemaArray }} />
      </FormikContainer>
    </Paper>
  );
};
export default MaterialForm;

interface MaterialFormProps {
  materialSchemaArray: MaterialSchemaObjectArray;
}
