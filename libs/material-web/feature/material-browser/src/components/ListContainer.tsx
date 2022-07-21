import { PropsWithChildren } from 'react';
// mui
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// cmp
import { ListSkeleton } from '@fm/mui';

export const ListContainer: React.FC<PropsWithChildren<ListContainerProps>> = ({
  title,
  loading,
  page,
  setPage,
  pageCount,
  children,
}) => {
  return (
    <>
      <Typography mb={2} ml={2}>
        {title}
      </Typography>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {loading ? <ListSkeleton /> : children}
      </Paper>
      {pageCount >= 2 && (
        <Container sx={{ mt: 2 }}>
          <Pagination
            count={pageCount}
            size="small"
            page={page}
            onChange={(_, newPage) => {
              setPage(newPage);
            }}
          />
        </Container>
      )}
    </>
  );
};
export default ListContainer;

interface ListContainerProps {
  title: string;
  loading: boolean;
  pageCount: number;
  page: number;
  setPage: (page: number) => void;
}
