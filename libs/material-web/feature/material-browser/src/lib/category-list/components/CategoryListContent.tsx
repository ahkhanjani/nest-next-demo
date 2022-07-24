import React, { useCallback, useEffect, useState } from 'react';
// mui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
// - icons
import EditIcon from '@mui/icons-material/Edit';
// types
import { PathCategory } from 'fm/shared-types';
// cmp
import ListContainer from '../../../components/ListContainer';
import CreateCategoryButton from './CreateCategoryButton';
import EditDialog from './EditDialog';
// store
import {
  useAppDispatch,
  addPathCategory,
  useAppSelector,
} from 'fm/material-web-state';
// service
import { useCategoryListService } from '../service/CategoryListServiceProvider';
import { UpdateMaterialCategoryServiceProvider } from '../service/UpdateCategoryServiceProvider';
import { CreateMaterialCategoryServiceProvider } from '../service/CreateCategoryServiceProvider';

export const CategoryListContent: React.FC<CategoryListContentProps> = ({
  page,
  setPage,
}) => {
  const { data, loading, refetch } = useCategoryListService();

  // ─── Store ──────────────────────────────────────────────────────────────────────

  const { endId: parentId } = useAppSelector((state) => state.categoryPath);
  const dispatch = useAppDispatch();

  // ─── State ──────────────────────────────────────────────────────────────────────

  const [isInputDialogOpen, setIsInputDialogOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<
    PathCategory | undefined
  >(undefined);

  // ─── Callback ───────────────────────────────────────────────────────────────────

  const resetPage = useCallback(() => {
    setPage(1);
  }, [setPage]);

  // ─── Effect ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    resetPage();
    refetch({ parentId });
  }, [parentId, refetch, resetPage]);

  useEffect(() => {
    refetch({ page });
  }, [page, refetch]);

  useEffect(() => {
    if (!isInputDialogOpen) setEditingCategory(undefined);
  }, [isInputDialogOpen]);

  // ─── Handlers ───────────────────────────────────────────────────────────────────

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

  // ────────────────────────────────────────────────────────────────────────────────

  const EditDialogServiceProvider = editingCategory
    ? UpdateMaterialCategoryServiceProvider
    : CreateMaterialCategoryServiceProvider;

  return (
    <>
      <EditDialogServiceProvider>
        <EditDialog
          isOpen={isInputDialogOpen}
          setIsOpen={setIsInputDialogOpen}
          {...{ editingCategory }}
        />
      </EditDialogServiceProvider>
      <ListContainer
        title="Categories"
        pageCount={data?.materialCategoriesPaginate.pagesCount || 1}
        {...{
          page,
          setPage,
          loading,
        }}
      >
        <List>
          <CreateCategoryButton {...{ handleOpenCreateDialog }} />
          {data &&
            data.materialCategoriesPaginate.materialCategories.map((ctg) => (
              <ListItem
                key={ctg.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      handleClickEdit(ctg);
                    }}
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
    </>
  );
};
export default CategoryListContent;

interface CategoryListContentProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
