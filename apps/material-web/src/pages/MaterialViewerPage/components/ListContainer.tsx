import { PropsWithChildren } from 'react';
import { Container, Pagination, Paper, Typography } from '@mui/material';
// cmp
import ListSkeleton from './ListSkeleton';

const ListContainer: React.FC<PropsWithChildren<ListContainerProps>> = ({
  children,
  title,
  loading,
  page,
  setPage,
  pageCount,
}) => {
  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleChangePage(newPage: number) {
    setPage(newPage);
  }

  // ────────────────────────────────────────────────────────────────────────────────

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
            size='small'
            page={page}
            onChange={(_, newPage) => handleChangePage(newPage)}
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
