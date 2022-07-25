// fm
import {
  useAppDispatch,
  useAppSelector,
  closeSnackbar,
} from 'fm/material-web-state';
// mui
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export const SnackbarAlert: React.FC = () => {
  // ─── State ──────────────────────────────────────────────────────────────────────

  const { show, message, severity } = useAppSelector(
    (state) => state.snackbarMessage
  );
  const dispatch = useAppDispatch();

  // ─── Handlers ───────────────────────────────────────────────────────────────────

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
