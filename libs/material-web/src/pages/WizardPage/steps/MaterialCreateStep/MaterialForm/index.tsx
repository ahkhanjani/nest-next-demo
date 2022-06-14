// mui
import Paper from '@mui/material/Paper';
// cmp
import FormikContainer from './FormikContainer';
import FormContent from './FormContent';

const MaterialForm: React.FC = () => {
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
        <FormContent />
      </FormikContainer>
    </Paper>
  );
};
export default MaterialForm;
