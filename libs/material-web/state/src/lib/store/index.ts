import { configureStore } from '@reduxjs/toolkit';
// slices
import creatingMaterialsReducer from './slices/creating-materials';
import editingMaterialReducer from './slices/editing-material';
import CategoryPathReducer from './slices/category-path';
import SnackbarMessageReducer from './slices/snackbar-message';

export const store = configureStore({
  reducer: {
    creatingMaterials: creatingMaterialsReducer,
    editingMaterial: editingMaterialReducer,
    categoryPath: CategoryPathReducer,
    snackbarMessage: SnackbarMessageReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
