import { useState } from 'react';
// service
import { MaterialListServiceProvider } from '../service/MaterialListServiceProvider';
// cmp
import { MaterialListContent } from './MaterialListContent';

const MaterialList: React.FC = () => {
  //
  // ─── STORE ──────────────────────────────────────────────────────────────────────
  //

  // ─── State ──────────────────────────────────────────────────────────────────────

  const [page, setPage] = useState<number>(1);

  // useEffect(() => {
  //   materialsRefetch({ categoryId });
  // }, [categoryId, materialsRefetch]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  return (
    <MaterialListServiceProvider {...{ page }}>
      <MaterialListContent {...{ page, setPage }} />
    </MaterialListServiceProvider>
  );
};
export default MaterialList;
