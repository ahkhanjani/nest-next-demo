// mui
import Grid from '@mui/material/Grid';
import Dropzone from './UploadPanel/Dropzone';

const ManageFormSchemaContainer: React.FC<
  ManageFormSchemaContainerProps
> = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}></Grid>
      <Grid item xs={12} md={3}>
        <Dropzone />
      </Grid>
    </Grid>
  );
};
export default ManageFormSchemaContainer;

interface ManageFormSchemaContainerProps {
  something?: string;
}
