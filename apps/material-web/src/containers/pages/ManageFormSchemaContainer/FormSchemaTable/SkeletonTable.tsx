import React from 'react';
// mui
import Skeleton from '@mui/material/Skeleton';

const SkeletonTable: React.FC = React.memo(() => {
  return (
    <>
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
    </>
  );
});
SkeletonTable.displayName = 'SkeletonTable';
export default SkeletonTable;
