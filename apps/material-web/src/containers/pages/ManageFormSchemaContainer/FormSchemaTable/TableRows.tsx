import { useCallback, useId, useState } from 'react';
// fm
import { utilGetDateFromNow } from '@fm/util';
// mui
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// - icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
// cmp
import OptionsMenu from './OptionsMenu';
// types
import type { RowData } from './types/row-data';

const TableRows: React.FC<TableRowsProps> = ({ rowDataArray }) => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  // view content dialog
  const [selectedRowData, setSelectedRowData] = useState<RowData>({
    id: '',
    title: '',
  });

  // options menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOptionsMenuOpen = Boolean(anchorEl);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleOptionsButtonClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  const handleCloseOptionsMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // ────────────────────────────────────────────────────────────────────────────────

  const domId: string = useId();

  const rows = rowDataArray.map(
    ({ id, title, createdAt, updatedAt }, index) => (
      <TableRow key={`${domId}-table-row-${id}-${index}`}>
        <TableCell>{title}</TableCell>
        <TableCell>{utilGetDateFromNow(createdAt)}</TableCell>
        <TableCell>
          {!updatedAt ? 'N/A' : utilGetDateFromNow(updatedAt)}
        </TableCell>
        <TableCell align="right">
          <IconButton
            onClick={(e) => {
              setSelectedRowData({ id, title });
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
        {...{
          anchorEl,
          selectedRowData,
        }}
      />
      {rows}
    </>
  );
};
export default TableRows;

interface TableRowsProps {
  rowDataArray: RowData[];
}
