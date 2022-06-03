import { useState } from 'react';
// mui
import Grid from '@mui/material/Grid';
// cmp
import MaterialStack from './MaterialStack';
import MaterialForm from './MaterialForm';
// types
import type {
  CategoryData,
  MaterialData,
  MaterialSchemaObjectArray,
} from '@fm/types';

const MaterialCreator: React.FC<MaterialCreatorProps> = ({
  editMode,
  categoryData,
  materialDataArray,
  setMaterialDataArray,
  materialSchemaArray,
}) => {
  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [selectedMaterialIndex, setSelectedMaterialIndex] =
    useState<number>(-1);

  // ─────────────────────────────────────────────────────────────────

  return (
    <Grid container spacing={3}>
      {editMode === false && (
        <Grid item xs={12} md={4}>
          <MaterialStack
            {...{
              materialDataArray,
              setMaterialDataArray,
              selectedMaterialIndex,
              setSelectedMaterialIndex,
            }}
          />
        </Grid>
      )}
      <Grid item xs={12} md={editMode === false ? 8 : undefined}>
        <MaterialForm
          {...{
            editMode,
            categoryData,
            materialDataArray,
            setMaterialDataArray,
            selectedMaterialIndex,
            materialSchemaArray,
          }}
        />
      </Grid>
    </Grid>
  );
};
export default MaterialCreator;

interface MaterialCreatorProps {
  editMode: boolean;
  categoryData: CategoryData;
  materialDataArray: MaterialData[];
  setMaterialDataArray: React.Dispatch<React.SetStateAction<MaterialData[]>>;
  materialSchemaArray: MaterialSchemaObjectArray;
}
