// fm
import {
  useAppDispatch,
  useAppSelector,
  closeSnackbar,
} from 'fm/material-web-state';
// mui
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

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
