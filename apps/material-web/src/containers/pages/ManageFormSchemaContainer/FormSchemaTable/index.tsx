import { useState } from 'react';
// fm
import { useGetMaterialFormSchemasQuery } from '@fm/gql';
import { ScrollDialog } from '@fm/shared-ui';
// mui
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// cmp
import SkeletonTable from './SkeletonTable';

const FormSchemaTable: React.FC = () => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [dialog, setDialog] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const {
    data: { materialFormSchemas } = {},
    loading: materialFormSchemasLoading,
  } = useGetMaterialFormSchemasQuery({
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleClickView(title: string, content: string) {
    setDialog({ title, content });
    setIsDialogOpen(true);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  if (materialFormSchemasLoading) return <SkeletonTable />;

  const rows = materialFormSchemas.map(({ id, title, strSchema }) => (
    <TableRow key={id}>
      <TableCell>{title}</TableCell>
      <TableCell align="right">
        <Button
          onClick={() => {
            handleClickView(title, strSchema);
          }}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  ));

  return (
    <>
      <ScrollDialog
        title={dialog.title}
        content={dialog.content}
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
      <Paper>
        <Table size="medium">
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
