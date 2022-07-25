import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MaterialData } from 'fm/material-web-types';

const initialState: EditingMaterialState = {
  editingMaterialData: undefined,
  editingMaterialId: undefined,
  editMode: false,
};

export const editingMaterialSlice = createSlice({
  name: 'editingMaterial',
  initialState,
  reducers: {
    setEditingMaterialId: (
      state: EditingMaterialState,
      action: PayloadAction<string>
    ) => {
      state.editingMaterialId = action.payload;
      state.editMode = true;
    },
    setEditingMaterialData: (
      state: EditingMaterialState,
      action: PayloadAction<MaterialData>
    ) => {
      state.editingMaterialData = action.payload;
    },
    removeEditingMaterial: (state: EditingMaterialState) => {
      state.editingMaterialId = undefined;
      state.editingMaterialData = undefined;
      state.editMode = false;
    },
  },
});

export const {
  removeEditingMaterial,
  setEditingMaterialData,
  setEditingMaterialId,
} = editingMaterialSlice.actions;

export default editingMaterialSlice.reducer;

interface EditingMaterialState {
  editingMaterialId: string | undefined;
  editingMaterialData: MaterialData | undefined;
  editMode: boolean;
}
