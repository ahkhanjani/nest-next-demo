import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, ListItemButton, ListItemText } from '@mui/material';
// gql
import { useGetMaterialsPaginateQuery } from 'graphql/generated';
// types
import { Pathnames } from 'types';
import CreateMaterialButton from './CreateMaterialButton';
// store
import { useAppDispatch, useAppSelector } from 'hooks';
import { setEditingMaterialId } from 'store/editing-material';
import ListContainer from '../ListContainer';

const limit: number = 7;

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
  }, [categoryId]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  const navigate = useNavigate();

  function handleMaterialClick(id: string) {
    dispatch(setEditingMaterialId(id));
    navigate(Pathnames.CREATE_MATERIALS);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <ListContainer
      title='Materials'
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
            <ListItemButton key={title} onClick={() => handleMaterialClick(id)}>
              <ListItemText primary={title} />
            </ListItemButton>
          );
        })}
      </List>
    </ListContainer>
  );
};
export default MaterialList;
