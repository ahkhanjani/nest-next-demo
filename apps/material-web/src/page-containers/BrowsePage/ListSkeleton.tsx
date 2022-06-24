import Skeleton from '@mui/material/Skeleton';

const ListSkeleton: React.FC = () => {
  return (
    <>
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
      <Skeleton variant="rectangular" />
    </>
  );
};
export default ListSkeleton;
