// mui
import Grid from '@mui/material/Grid';
import FormSchemaTable from './FormSchemaTable';
// cmp
import UploadPanel from './UploadPanel';

const ManageFormSchemaPage: React.FC<ManageFormSchemaContainerProps> = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <FormSchemaTable />
      </Grid>
      <Grid item xs={12} md={3}>
        <UploadPanel />
      </Grid>
    </Grid>
  );
};
export default ManageFormSchemaPage;

interface ManageFormSchemaContainerProps {
  something?: string;
}
