// mui
import Breadcrumbs from '@mui/material/Breadcrumbs';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// - icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// styles
import classes from './CategoryBreadcrumbs.module.css';
// store
import {
  useAppSelector,
  useAppDispatch,
  removePathCategories,
} from 'fm/material-web-state';

const CategoryBreadcrumbs: React.FC = () => {
  // ─── Store ──────────────────────────────────────────────────────────────────────

  const { path: categoryPath } = useAppSelector((state) => state.categoryPath);
  const dispatch = useAppDispatch();

  // ─── Handlers ───────────────────────────────────────────────────────────────────

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
        onClick={() => {
          dispatch(removePathCategories(1));
        }}
        disabled={categoryPath.length === 0}
      >
        <ArrowBackIcon />
      </IconButton>
      <Breadcrumbs maxItems={3}>
        {categoryPath.map(
          ({ id, title }, index) =>
            index < categoryPath.length - 1 && (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                key={id}
                className={classes['breadcrumbLink']}
                onClick={() => {
                  handleItemClick(id);
                }}
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
