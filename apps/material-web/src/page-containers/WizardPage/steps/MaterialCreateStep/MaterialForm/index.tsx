// mui
import Paper from '@mui/material/Paper';
// cmp
import FormikContainer from './FormikContainer';
import FormContent from './FormContent';
import { MaterialFormSchema } from '@fm/material-web/types';

const MaterialForm: React.FC<MaterialFormProps> = ({ materialFormSchemas }) => {
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
        <FormContent {...{ materialFormSchemas }} />
      </FormikContainer>
    </Paper>
  );
};
export default MaterialForm;

interface MaterialFormProps {
  materialFormSchemas: MaterialFormSchema[];
}
