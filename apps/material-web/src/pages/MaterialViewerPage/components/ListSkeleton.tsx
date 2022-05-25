import { Skeleton } from '@mui/material';

const ListSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton variant='text' />
      <Skeleton variant='text' />
      <Skeleton variant='text' />
      <Skeleton variant='text' />
    </>
  );
};
export default ListSkeleton;
