// mui
import { useGetMaterialFormSchemasQuery } from '@fm/gql';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const FormSchemaTable: React.FC<ManageFormSchemaContainerProps> = () => {
  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const { data: { materialFormSchemas } = {} } =
    useGetMaterialFormSchemasQuery();

  // ────────────────────────────────────────────────────────────────────────────────

  // mfs: material form schema
  const rows = materialFormSchemas.map((mfs) => (
    <TableRow key={mfs.id}>
      <TableCell>{mfs.title}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.shipTo}</TableCell>
      <TableCell>{row.paymentMethod}</TableCell>
      <TableCell align="right">{`$${row.amount}`}</TableCell>
    </TableRow>
  ));

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Schema Name</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Updated At</TableCell>
          <TableCell>Creator</TableCell>
          <TableCell align="right">Sale Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{rows}</TableBody>
    </Table>
  );
};
export default FormSchemaTable;

interface ManageFormSchemaContainerProps {
  something?: string;
}
