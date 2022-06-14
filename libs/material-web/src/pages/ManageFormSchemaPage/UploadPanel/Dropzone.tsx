import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import appAxios from '../../../axios';
// mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// styles
import styles from './Dropzone.module.scss';

const Dropzone: React.FC = () => {
  //
  // ─── FILE ───────────────────────────────────────────────────────────────────────
  //

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append('files', file);
    });

    appAxios
      .post('/material-form-schema/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error.response);
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: { 'text/x-yaml': ['.yaml', '.yml'] },
  });

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Box className={styles.fileInput} {...getRootProps()}>
      <input {...getInputProps()} />
      <Typography variant="body1">Click...</Typography>
      <Typography variant="body2">or</Typography>
      <Typography variant="body1">Drop the files here...</Typography>
    </Box>
  );
};
export default Dropzone;
