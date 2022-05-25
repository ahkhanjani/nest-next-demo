import { Alert, AlertColor, Snackbar } from '@mui/material';

const SnackbarAlert: React.FC<ErrorSnackbarProps> = ({
  severity,
  message,
  isOpen,
  setIsOpen,
}) => {
  /**
   *  Closes the alert.
   *
   * _Triggered by:_
   * - Clicking close alert (X) button.
   * - Alert timeout.
   */
  function handleClose() {
    setIsOpen(false);
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SnackbarAlert;

interface ErrorSnackbarProps {
  severity: AlertColor;
  message: string;

  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
