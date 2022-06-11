import { useId, useState } from 'react';
// fm
import { useGetMaterialFormSchemasQuery } from '@fm/gql';
import { ScrollDialog } from '@fm/shared-ui';
// mui
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// - icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
// cmp
import SkeletonTable from './SkeletonTable';
import OptionsMenu from './OptionsMenu';

const FormSchemaTable: React.FC = () => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  // view content dialog
  const [dialog, setDialog] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // options menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorEl);

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const {
    data: { materialFormSchemas } = {},
    loading: materialFormSchemasLoading,
  } = useGetMaterialFormSchemasQuery({
    fetchPolicy: 'network-only',
  });

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleOptionsButtonClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseOptionsMenu() {
    setAnchorEl(null);
  }

  function handleSetViewDialog(title: string, content: string) {
    setDialog({ title, content });
  }

  function handleOpenViewDialog() {
    setIsDialogOpen(true);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  const domId: string = useId();

  if (materialFormSchemasLoading) return <SkeletonTable />;

  const rows = materialFormSchemas.map(({ id, title, strSchema }, index) => (
    <TableRow key={`${domId}-table-row-${id}-${index}`}>
      <TableCell>{title}</TableCell>
      <TableCell align="right">
        <IconButton
          onClick={(e) => {
            handleSetViewDialog(title, strSchema);
            handleOptionsButtonClick(e);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <OptionsMenu
        isOpen={isOptionsMenuOpen}
        handleClose={handleCloseOptionsMenu}
        handleOpenViewDialog={handleOpenViewDialog}
        anchorEl={anchorEl}
      />
      <ScrollDialog
        title={dialog.title}
        content={dialog.content}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <Paper sx={{ height: 550, overflow: 'auto' }}>
        <Table size="medium" sx={{ maxHeight: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Schema Name</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ maxHeight: 250 }}>{rows}</TableBody>
        </Table>
      </Paper>
    </>
  );
};
export default FormSchemaTable;
