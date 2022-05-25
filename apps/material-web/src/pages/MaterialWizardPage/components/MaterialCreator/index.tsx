import { useState } from 'react';
import { Grid } from '@mui/material';
// cmp
import MaterialStack from './MaterialStack';
import MaterialForm from './MaterialForm';
// types
import { CategoryData, MaterialData } from '../../types';

const MaterialCreator: React.FC<MaterialCreatorProps> = ({
  editMode,
  categoryData,
  materialDataArray,
  setMaterialDataArray,
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
}
