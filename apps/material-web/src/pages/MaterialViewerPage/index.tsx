import { Grid } from '@mui/material';
// cmp
import CategoryBreadcrumbs from './components/CategoryBreadcrumbs';
import CategoryList from './components/CategoryList';
import MaterialList from './components/MaterialList';

const MaterialViewerPage: React.FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} display='flex' flexDirection='row' alignItems='center'>
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
export default MaterialViewerPage;
