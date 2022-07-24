import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MaterialData } from 'fm/shared-types';

const initialState: EditingMaterialState = {
  editingMaterialData: undefined,
  editingMaterialId: undefined,
  editMode: false,
};

export const editingMaterialSlice = createSlice({
  name: 'editingMaterial',
  initialState,
  reducers: {
    setEditingMaterialId: (state, action: PayloadAction<string>) => {
      state.editingMaterialId = action.payload;
      state.editMode = true;
    },
    setEditingMaterialData: (state, action: PayloadAction<MaterialData>) => {
      state.editingMaterialData = action.payload;
    },
    removeEditingMaterial: (state) => {
      state.editingMaterialId = undefined;
      state.editingMaterialData = undefined;
      state.editMode = false;
    },
  },
});

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

export const {
  removeEditingMaterial,
  setEditingMaterialData,
  setEditingMaterialId,
} = editingMaterialSlice.actions;

export default editingMaterialSlice.reducer;

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

interface EditingMaterialState {
  editingMaterialId: string | undefined;
  editingMaterialData: MaterialData | undefined;
  editMode: boolean;
}
