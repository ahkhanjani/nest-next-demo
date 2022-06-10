// fm
import { useGetMaterialFormSchemasQuery } from '@fm/gql';
// mui
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SkeletonTable from './SkeletonTable';

const FormSchemaTable: React.FC<ManageFormSchemaContainerProps> = () => {
  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const {
    data: { materialFormSchemas } = {},
    loading: materialFormSchemasLoading,
  } = useGetMaterialFormSchemasQuery();

  // ────────────────────────────────────────────────────────────────────────────────

  if (materialFormSchemasLoading) return <SkeletonTable />;

  const rows = materialFormSchemas.map(({ id, title, strSchema }) => (
    <TableRow key={id}>
      <TableCell>{title}</TableCell>
      <TableCell align="right"></TableCell>
    </TableRow>
  ));

  return (
    <Paper>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Schema Name</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ maxHeight: 250 }}>{rows}</TableBody>
      </Table>
    </Paper>
  );
};
export default FormSchemaTable;

interface ManageFormSchemaContainerProps {
  something?: string;
}
