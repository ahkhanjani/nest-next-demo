// mui
import Grid from '@mui/material/Grid';
// cmp
import MaterialStack from './MaterialStack';
import MaterialForm from './MaterialForm';
// types
import type { MaterialSchemaObjectArray } from '@fm/types';
// store
import { useAppSelector } from '../../../../../hooks';

const MaterialCreator: React.FC<MaterialCreatorProps> = ({
  materialSchemaArray,
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
        <MaterialForm
          {...{
            materialSchemaArray,
          }}
        />
      </Grid>
    </Grid>
  );
};
export default MaterialCreator;

interface MaterialCreatorProps {
  materialSchemaArray: MaterialSchemaObjectArray;
}
