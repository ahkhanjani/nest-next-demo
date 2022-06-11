// fm
import { useDeleteMaterialFormSchemaMutation } from '@fm/gql';
// mui
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// - icons
import DeleteIcon from '@mui/icons-material/Delete';
// store
import { useAppDispatch } from '../../../../hooks';
import { setSnackbarMessage } from '../../../../store/snackbar-message';

const DeleteButton: React.FC<DeleteButtonProps> = ({
  handleClose,
  selectedRowId,
}) => {
  //
  // ─── STORE ──────────────────────────────────────────────────────────────────────
  //

  const dispatch = useAppDispatch();

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const [deleteMaterialFormSchema] = useDeleteMaterialFormSchemaMutation();

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  async function handleDelete() {
    const res = await deleteMaterialFormSchema({
      variables: { id: selectedRowId },
    });

    if (res.errors) {
      dispatch(
        setSnackbarMessage({
          message: 'Delete failed.',
          severity: 'error',
        })
      );

      console.error(res.errors);

      return;
    }

    if (res.data.deleteMaterialFormSchema === true) {
      dispatch(
        setSnackbarMessage({
          message: 'Form deleted successfully.',
          severity: 'success',
        })
      );

      return;
    }

    dispatch(
      setSnackbarMessage({
        message: 'Delete failed.',
        severity: 'error',
      })
    );
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <MenuItem
      onClick={() => {
        handleClose();
        handleDelete();
      }}
      disableRipple
    >
      <ListItemIcon>
        <DeleteIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Delete</ListItemText>
    </MenuItem>
  );
};
export default DeleteButton;

interface DeleteButtonProps {
  handleClose: () => void;
  selectedRowId: string;
}
