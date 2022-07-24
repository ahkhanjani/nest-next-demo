import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// types
import type { PathCategory } from 'fm/shared-types';

const initialState: State = { path: [], endId: '' };

export const currentPathSlice = createSlice({
  name: 'categoryPath',
  initialState,
  reducers: {
    addPathCategory: (state, action: PayloadAction<PathCategory>) => {
      state.path.push(action.payload);
      state.endId = action.payload.id;
    },
    removePathCategories: (state, action: PayloadAction<number>) => {
      // number of items that are being removed from the end of the path
      const removedItemsCount: number = action.payload;

      const pathLength: number = state.path.length;
      const startingItemIndex: number = pathLength - removedItemsCount;
      state.path.splice(startingItemIndex, removedItemsCount);

      // set endId
      const lastCategoryIndex: number = state.path.length - 1;
      const lastCategory: PathCategory | undefined =
        state.path.at(lastCategoryIndex);
      state.endId = lastCategory ? lastCategory.id : '';
    },
  },
});

export const { addPathCategory, removePathCategories } =
  currentPathSlice.actions;

export default currentPathSlice.reducer;

interface State {
  path: PathCategory[];
  // id of the last category in the list.
  // default: ''
  endId: string;
}
