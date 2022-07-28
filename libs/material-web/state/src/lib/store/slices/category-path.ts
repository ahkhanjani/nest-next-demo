import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PathCategory } from 'fm/shared-types';

const initialState: CategoryPathState = { path: [], lastId: '' };

export const currentPathSlice = createSlice({
  name: 'categoryPath',
  initialState,
  reducers: {
    addPathCategory: (
      state: CategoryPathState,
      action: PayloadAction<PathCategory>
    ) => {
      state.path.push(action.payload);
      state.lastId = action.payload.id;
    },
    removePathCategories: (
      state: CategoryPathState,
      action: PayloadAction<number>
    ) => {
      // number of items that are being removed from the end of the path
      const removedItemsCount: number = action.payload;

      const pathLength: number = state.path.length;
      const startingItemIndex: number = pathLength - removedItemsCount;
      state.path.splice(startingItemIndex, removedItemsCount);

      // set endId
      const lastCategory: PathCategory | undefined = state.path.at(-1);
      state.lastId = lastCategory ? lastCategory.id : '';
    },
  },
});

export const { addPathCategory, removePathCategories } =
  currentPathSlice.actions;

export default currentPathSlice.reducer;

interface CategoryPathState {
  path: PathCategory[];
  // id of the last category in the list.
  // default: ''
  lastId: string;
}
