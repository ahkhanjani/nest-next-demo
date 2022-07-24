import { useState } from 'react';
// service
import { CategoryListServiceProvider } from '../service/CategoryListServiceProvider';
// cmp
import CategoryListContent from './CategoryListContent';

export const CategoryList: React.FC = () => {
  // ─── State ──────────────────────────────────────────────────────────────────────

  const [page, setPage] = useState<number>(1);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <CategoryListServiceProvider {...{ page, setPage }}>
      <CategoryListContent {...{ page, setPage }} />
    </CategoryListServiceProvider>
  );
};
export default CategoryList;
