// mui
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// cmp
import Dropzone from './Dropzone';

const UploadPanel: React.FC = () => {
  return (
    <Paper
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Dropzone />
      <Typography variant="subtitle2" sx={{ mt: 2 }}>
        Files must have *.yaml or *.yml extention.
      </Typography>
    </Paper>
  );
};
export default UploadPanel;
