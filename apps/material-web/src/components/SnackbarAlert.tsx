// mui
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
// store
import { useAppDispatch, useAppSelector } from '../hooks';
import { closeSnackbar } from 'fm/material-web-state';

const SnackbarAlert: React.FC = () => {
  //
  // ─── STORE ──────────────────────────────────────────────────────────────────────
  //

  const { show, message, severity } = useAppSelector(
    (state) => state.snackbarMessage
  );

  const dispatch = useAppDispatch();

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleClose() {
    dispatch(closeSnackbar());
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Snackbar open={show} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SnackbarAlert;
