// mui
import Paper from '@mui/material/Paper';
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
    </Paper>
  );
};
export default UploadPanel;
