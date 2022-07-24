// mui
import Grid from '@mui/material/Grid';
// cmp
import MaterialStack from './MaterialStack';
import MaterialForm from './MaterialForm';
// store
import { useAppSelector } from 'fm/material-web-state';
import { MaterialFormSchema } from 'fm/material-web-types';

const MaterialCreator: React.FC<MaterialCreatorProps> = ({
  materialFormSchemas,
}) => {
  //
  // ─── STORE ───────────────────────────────────────────────────────
  //

  const { editMode } = useAppSelector((state) => state.editingMaterial);

  // ─────────────────────────────────────────────────────────────────

  return (
    <Grid container spacing={3}>
      {editMode === false && (
        <Grid item xs={12} md={4}>
          <MaterialStack />
        </Grid>
      )}
      <Grid item xs={12} md={editMode === false ? 8 : undefined}>
        <MaterialForm {...{ materialFormSchemas }} />
      </Grid>
    </Grid>
  );
};
export default MaterialCreator;

interface MaterialCreatorProps {
  materialFormSchemas: MaterialFormSchema[];
}
