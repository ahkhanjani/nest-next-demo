import { useState } from 'react';
// service
import { MaterialListServiceProvider } from '../service/MaterialListServiceProvider';
// cmp
import { MaterialListContent } from './MaterialListContent';

const MaterialList: React.FC = () => {
  // ─── State ──────────────────────────────────────────────────────────────────────

  const [page, setPage] = useState<number>(1);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <MaterialListServiceProvider {...{ page }}>
      <MaterialListContent {...{ page, setPage }} />
    </MaterialListServiceProvider>
  );
};
export default MaterialList;
