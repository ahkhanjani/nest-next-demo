import { useCallback, useEffect, useId, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
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
// types
import type { RowData } from './types/row-data';

const FormSchemaTable: React.FC = () => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  // view content dialog
  const [selectedRowData, setSelectedRowData] = useState<RowData>({
    id: '',
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
    error: materialFormSchemasError,
  } = useGetMaterialFormSchemasQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  // handle gql errors
  useEffect(() => {
    if (materialFormSchemasError) console.error(materialFormSchemasError);
  }, [materialFormSchemasError]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleOptionsButtonClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseOptionsMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  function handleSetViewDialog(rowData: RowData) {
    setSelectedRowData(rowData);
  }

  const handleOpenViewDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  // ────────────────────────────────────────────────────────────────────────────────

  const domId: string = useId();

  if (materialFormSchemasLoading) return <SkeletonTable />;

  if (!materialFormSchemas) return <p>Error</p>;

  const rows = materialFormSchemas.map(
    ({ id, title, strSchema, createdAt, updatedAt }, index) => (
      <TableRow key={`${domId}-table-row-${id}-${index}`}>
        <TableCell>{title}</TableCell>
        <TableCell>{dayjs(createdAt).fromNow()}</TableCell>
        <TableCell>{!updatedAt ? 'N/A' : dayjs(updatedAt).fromNow()}</TableCell>
        <TableCell align="right">
          <IconButton
            onClick={(e) => {
              handleSetViewDialog({ id, title, content: strSchema });
              handleOptionsButtonClick(e);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  );

  return (
    <>
      <OptionsMenu
        isOpen={isOptionsMenuOpen}
        handleClose={handleCloseOptionsMenu}
        selectedRowId={selectedRowData.id}
        {...{
          anchorEl,
          handleOpenViewDialog,
        }}
      />
      <ScrollDialog
        title={selectedRowData.title}
        content={selectedRowData.content}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <Paper sx={{ height: 550, overflow: 'auto' }}>
        <Table size="medium" sx={{ maxHeight: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Schema Name</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Edited</TableCell>
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
