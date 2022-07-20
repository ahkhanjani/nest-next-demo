import { useAppSelector } from 'fm/material-web-state';
import { useState } from 'react';
import { CategoryListServiceProvider } from '../service/CategoryListServiceProvider';
import CategoryListContent from './CategoryListContent';

export const CategoryList: React.FC = () => {
  // ─── State ──────────────────────────────────────────────────────────────────────

  const { endId: parentId } = useAppSelector((state) => state.categoryPath);

  const [page, setPage] = useState<number>(1);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <CategoryListServiceProvider {...{ page, setPage, parentId }}>
      <CategoryListContent {...{ page, setPage, parentId }} />
    </CategoryListServiceProvider>
  );
};
export default CategoryList;
