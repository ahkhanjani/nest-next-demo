import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: EditingMaterialState = {};

export const editingMaterialSlice = createSlice({
  name: 'editingMaterial',
  initialState,
  reducers: {
    setEditingMaterialId: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.id = action.payload;
    },
  },
});

//
// ─── EXPORT ─────────────────────────────────────────────────────────────────────
//

export const { setEditingMaterialId } = editingMaterialSlice.actions;

export default editingMaterialSlice.reducer;

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

interface EditingMaterialState {
  id?: string;
}
