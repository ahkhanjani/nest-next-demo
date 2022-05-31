import { useEffect, useState } from 'react';
// mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// - icons
import EditIcon from '@mui/icons-material/Edit';
// types
import { PathCategory } from '../../types';
// gql
import { useGetCategoriesPaginateQuery } from '@fm/gql';
// cmp
import ListContainer from '../ListContainer';
import CreateButton from './CreateButton';
import InputDialog from './InputDialog';
// store
import { useAppSelector, useAppDispatch } from '@fm/material-web/hooks';
import { addPathCategory } from '@fm/material-web/store/category-path';

const limit = 7;

const CategoryList: React.FC = () => {
  //
  // ─── STORE ──────────────────────────────────────────────────────────────────────
  //

  const { endId: parentId } = useAppSelector((state) => state.categoryPath);
  const dispatch = useAppDispatch();

  //
  // ─── STATE ──────────────────────────────────────────────────────────────────────
  //

  const [isInputDialogOpen, setIsInputDialogOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<
    PathCategory | undefined
  >(undefined);
  const [page, setPage] = useState<number>(1);

  //
  // ─── GQL ────────────────────────────────────────────────────────────────────────
  //

  const {
    data: categoriesPaginate,
    loading: categoriesPaginateLoading,
    refetch,
  } = useGetCategoriesPaginateQuery({
    variables: { parentId, limit, page },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-and-network',
  });

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  useEffect(() => {
    resetPage();
    refetch({ parentId });
  }, [parentId, refetch]);

  useEffect(() => {
    refetch({ page });
  }, [page, refetch]);

  useEffect(() => {
    if (!isInputDialogOpen) setEditingCategory(undefined);
  }, [isInputDialogOpen]);

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleCategoryClick(category: PathCategory) {
    dispatch(addPathCategory(category));
  }

  function handleClickEdit(category: PathCategory) {
    setEditingCategory(category);
    handleOpenCreateDialog();
  }

  function handleOpenCreateDialog() {
    setIsInputDialogOpen(true);
  }

  function resetPage() {
    setPage(1);
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <ListContainer
      title="Categories"
      loading={categoriesPaginateLoading}
      {...{
        page,
        setPage,
        pageCount: categoriesPaginate
          ? categoriesPaginate.categoriesPaginate.pagesCount
          : 1,
      }}
    >
      <InputDialog
        isOpen={isInputDialogOpen}
        setIsOpen={setIsInputDialogOpen}
        {...{ refetch, editingCategory }}
      />
      <List>
        <CreateButton {...{ handleOpenCreateDialog }} />
        {categoriesPaginate?.categoriesPaginate.categories.map((ctg) => (
          <ListItem
            key={ctg.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleClickEdit(ctg)}
              >
                <EditIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton onClick={() => handleCategoryClick(ctg)}>
              <ListItemText primary={ctg.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </ListContainer>
  );
};
export default CategoryList;
