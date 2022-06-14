import { useId } from 'react';
// mui
import Skeleton from '@mui/material/Skeleton';

const SkeletonTable: React.FC = () => {
  const domId = useId();

  const skeletons = [1, 2, 3, 4, 5].map((_, index) => (
    <Skeleton
      key={`${domId}-skeleton-${index}`}
      variant="rectangular"
      sx={{ mb: 1, height: 60 }}
    />
  ));

  return (
    <>
      <Skeleton variant="rectangular" sx={{ mb: 1, height: 40 }} />
      {skeletons}
    </>
  );
};
export default SkeletonTable;
