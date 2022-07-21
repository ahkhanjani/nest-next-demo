// mui
import Skeleton from '@mui/material/Skeleton';

export const ListSkeleton: React.FC = () => {
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
