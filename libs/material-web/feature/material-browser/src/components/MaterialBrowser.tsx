// mui
import Grid from '@mui/material/Grid';
// cmp
import CategoryBreadcrumbs from './CategoryBreadcrumbs';
import CategoryList from '../lib/category-list/components/CategoryList';
import MaterialList from '../lib/material-list/components/MaterialList';

export const MaterialBrowser: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} display="flex" flexDirection="row" alignItems="center">
        <CategoryBreadcrumbs />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <CategoryList />
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <MaterialList />
      </Grid>
    </Grid>
  );
};
export default MaterialBrowser;
