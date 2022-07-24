import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MaterialData } from 'fm/shared-types';

const initialState: CreatingMaterialsState = {
  materialDataArray: [],
  selectedMaterialIndex: -1,
};

export const creatingMaterialsSlice = createSlice({
  name: 'creatingMaterials',
  initialState,
  reducers: {
    setMaterialDataArray: (state, action: PayloadAction<MaterialData[]>) => {
      state.materialDataArray = action.payload;
    },
    addMaterialData: (state, action: PayloadAction<MaterialData>) => {
      state.materialDataArray.push(action.payload);
    },
    removeMaterialData: (state, action: PayloadAction<number>) => {
      state.materialDataArray.splice(action.payload, 1);
    },
    editMaterialData: (state, action: PayloadAction<MaterialData>) => {
      state.materialDataArray[state.selectedMaterialIndex] = action.payload;
    },

    setSelectedMaterialIndex: (state, action: PayloadAction<number>) => {
      state.selectedMaterialIndex = action.payload;
      // '-2' means material created. set back to '-1' to reset the form.
      if (state.selectedMaterialIndex === -2) state.selectedMaterialIndex = -1;
    },
  },
});

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

export const {
  setMaterialDataArray,
  addMaterialData,
  removeMaterialData,
  editMaterialData,
  setSelectedMaterialIndex,
} = creatingMaterialsSlice.actions;

export default creatingMaterialsSlice.reducer;

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

interface CreatingMaterialsState {
  materialDataArray: MaterialData[];
  selectedMaterialIndex: number;
}
