import { memo, PropsWithChildren } from 'react';
// mui
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import MuiTableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const TableBody: React.FC<PropsWithChildren<unknown>> = memo(({ children }) => {
  return (
    <Table size="medium" sx={{ maxHeight: '100%' }}>
      <TableHead>
        <TableRow>
          <TableCell>Schema Name</TableCell>
          <TableCell>Created</TableCell>
          <TableCell>Last Edited</TableCell>
          <TableCell align="right" />
        </TableRow>
      </TableHead>
      <MuiTableBody sx={{ maxHeight: 250 }}>{children}</MuiTableBody>
    </Table>
  );
});
TableBody.displayName = 'TableBody';
export default TableBody;
