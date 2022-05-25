import { configureStore } from '@reduxjs/toolkit';
import editingMaterialReducer from './editing-material';
import CategoryPathReducer from './category-path';

const store = configureStore({
  reducer: {
    editingMaterial: editingMaterialReducer,
    categoryPath: CategoryPathReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
