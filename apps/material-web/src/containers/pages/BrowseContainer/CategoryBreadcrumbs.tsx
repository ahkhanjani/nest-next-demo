// mui
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// - icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// styles
import classes from './CategoryBreadcrumbs.module.scss';
// store
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { removePathCategories } from '../../../store/category-path';

const CategoryBreadcrumbs: React.FC = () => {
  //
  // ─── STORE ──────────────────────────────────────────────────────────────────────
  //

  const { path: categoryPath } = useAppSelector((state) => state.categoryPath);
  const dispatch = useAppDispatch();

  //
  // ─── HANDLERS ───────────────────────────────────────────────────────────────────
  //

  function handleArrowBackClick() {
    dispatch(removePathCategories(1));
  }

  function handleItemClick(id: string) {
    const clickedItemIndex: number = categoryPath.findIndex(
      (path) => path.id === id
    );
    const removedItemsCount: number =
      categoryPath.length - clickedItemIndex - 1;

    dispatch(removePathCategories(removedItemsCount));
  }

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <IconButton
        aria-label="arrow-back"
        sx={{ mr: 3 }}
        onClick={handleArrowBackClick}
        disabled={categoryPath.length === 0}
      >
        <ArrowBackIcon />
      </IconButton>
      <Breadcrumbs maxItems={2}>
        {categoryPath.map(
          ({ id, title }, index) =>
            index < categoryPath.length - 1 && (
              <a
                key={id}
                className={classes.breadcrumbLink}
                onClick={() => handleItemClick(id)}
              >
                {title}
              </a>
            )
        )}
        <Typography color="text.primary">
          {categoryPath.at(categoryPath.length - 1)?.title}
        </Typography>
      </Breadcrumbs>
    </>
  );
};
export default CategoryBreadcrumbs;
