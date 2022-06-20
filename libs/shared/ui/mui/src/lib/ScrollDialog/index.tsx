// mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const ScrollDialog: React.FC<ScrollDialogProps> = ({
  title,
  content,
  isOpen,
  handleClose,
}) => {
  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-content"
    >
      <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText id="scroll-dialog-content">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

interface ScrollDialogProps {
  title: string;
  content: string;
  isOpen: boolean;
  handleClose: () => void;
}
