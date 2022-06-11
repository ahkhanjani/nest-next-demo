import { useCallback, useState } from 'react';
// fm
import { ScrollDialog } from '@fm/shared-ui';
import { useGetMaterialFormSchemaStringLazyQuery } from '@fm/gql';
// mui
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
// - icons
import VisibilityIcon from '@mui/icons-material/Visibility';
// types
import type { RowData } from '../types/row-data';
// store
import { useAppDispatch } from '../../../../../hooks';
import { setSnackbarMessage } from '../../../../../store/snackbar-message';

const ViewButton: React.FC<ViewButtonProps> = ({
  handleCloseMenu,
  selectedRowData,
}) => {
  //
  // ─── STORE ──────────────────────────────────────────────────────────────────────
  //

  const dispatch = useAppDispatch();

  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const [
    getMaterialFormSchemaString,
    {
      data: materialFormSchemaString,
      loading: materialFormSchemaStringLoading,
    },
  ] = useGetMaterialFormSchemaStringLazyQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  async function handleClick() {
    const res = await getMaterialFormSchemaString({
      variables: { id: selectedRowData.id },
    });

    if (res.error) {
      dispatch(
        setSnackbarMessage({
          message: "Couldn't get the material form schema.",
          severity: 'error',
        })
      );
      console.error(res.error);
      return;
    }

    if (res.data.materialFormSchema.strSchema) {
      handleOpenViewDialog();
      return;
    }

    dispatch(
      setSnackbarMessage({
        message: "Couldn't get the material form schema.",
        severity: 'error',
      })
    );
  }

  function handleOpenViewDialog() {
    setIsDialogOpen(true);
  }

  const handleCloseViewDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <ScrollDialog
        title={selectedRowData.title}
        content={
          materialFormSchemaStringLoading
            ? 'Loading...'
            : materialFormSchemaString?.materialFormSchema.strSchema
        }
        isOpen={isDialogOpen}
        handleClose={handleCloseViewDialog}
      />
      <MenuItem onClick={handleClick} disableRipple>
        <ListItemIcon>
          <VisibilityIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>View</ListItemText>
      </MenuItem>
    </>
  );
};
export default ViewButton;

interface ViewButtonProps {
  handleCloseMenu: () => void;
  selectedRowData: RowData;
}
