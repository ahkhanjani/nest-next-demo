import { useEffect } from 'react';
// fm
import { useGetMaterialFormSchemasTableQuery } from '@fm/gql';
// mui
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// cmp
import TableBody from './TableBody';
import TableRows from './TableRows';
import SkeletonTable from './SkeletonTable';

const FormSchemaTable: React.FC = () => {
  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const {
    data: { materialFormSchemas } = {},
    loading: materialFormSchemasLoading,
    error: materialFormSchemasError,
    refetch: refetchMaterialFormSchemas,
  } = useGetMaterialFormSchemasTableQuery({
    fetchPolicy: 'network-only',
  });

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  // handle gql errors
  useEffect(() => {
    if (materialFormSchemasError) console.error(materialFormSchemasError);
  }, [materialFormSchemasError]);

  // ────────────────────────────────────────────────────────────────────────────────

  if (materialFormSchemasLoading) return <SkeletonTable />;

  if (!materialFormSchemas) return <p>Error</p>;

  if (!materialFormSchemas.length)
    return (
      <Typography variant="body1">
        {"You haven't created a material form schema yet!"}
      </Typography>
    );

  return (
    <Paper sx={{ height: 550, overflow: 'auto' }}>
      <TableBody>
        <TableRows
          rowDataArray={materialFormSchemas}
          refetch={refetchMaterialFormSchemas}
        />
      </TableBody>
    </Paper>
  );
};
export default FormSchemaTable;
