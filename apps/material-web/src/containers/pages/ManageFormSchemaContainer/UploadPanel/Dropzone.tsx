import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import appAxios from '../../../../axios';
// mui
import Box from '@mui/material/Box';
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
    <Box>
      <div className={styles.fileInput} {...getRootProps()}>
        <input {...getInputProps()} />
        <span>Click...</span>
        <em>or</em>
        <span>Drop the files here...</span>
      </div>
    </Box>
  );
};
export default Dropzone;
