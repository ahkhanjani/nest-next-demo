import { configureStore } from '@reduxjs/toolkit';
import creatingMaterialsReducer from './creating-materials';
import editingMaterialReducer from './editing-material';
import CategoryPathReducer from './category-path';

const store = configureStore({
  reducer: {
    creatingMaterials: creatingMaterialsReducer,
    editingMaterial: editingMaterialReducer,
    categoryPath: CategoryPathReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
