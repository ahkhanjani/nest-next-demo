import { useEffect, useState } from 'react';
import Link from 'next/link';
// mui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// gql
import { useGetMaterialsPaginateQuery } from '@fm/gql';
// cmp
import CreateMaterialButton from './CreateMaterialButton';
import ListContainer from '../ListContainer';
// store
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setEditingMaterialId } from '../../../../store/editing-material';
// routes
import ROUTES from '../../../../routes';

const limit = 7;

const MaterialList: React.FC = () => {
  //
  // ─── STORE ──────────────────────────────────────────────────────────────────────
  //

  const { endId: categoryId } = useAppSelector((state) => state.categoryPath);
  const dispatch = useAppDispatch();

  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [page, setPage] = useState<number>(1);

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const {
    data: materialsPaginate,
    loading: materialsPaginateLoading,
    refetch: materialsRefetch,
  } = useGetMaterialsPaginateQuery({
    variables: { categoryId, limit, page },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  // triggered when selected category changes
  useEffect(() => {
    materialsRefetch({ categoryId });
  }, [categoryId, materialsRefetch]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleMaterialClick(id: string) {
    dispatch(setEditingMaterialId(id));
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <ListContainer
      title="Materials"
      loading={materialsPaginateLoading}
      {...{
        page,
        setPage,
        pageCount: materialsPaginate
          ? materialsPaginate.materialsPaginate.pagesCount
          : 1,
      }}
    >
      <List>
        <CreateMaterialButton />
        {materialsPaginate?.materialsPaginate.materials.map(({ id, title }) => {
          return (
            // eslint-disable-next-line @next/next/link-passhref
            <Link key={id} href={ROUTES.CREATE_MATERIALS}>
              <ListItemButton onClick={() => handleMaterialClick(id)}>
                <ListItemText primary={title} />
              </ListItemButton>
            </Link>
          );
        })}
      </List>
    </ListContainer>
  );
};
export default MaterialList;
