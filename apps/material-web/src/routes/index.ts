const ROUTES: Routes = {
  LOGIN: '/login',
  VIEW_MATERIALS: '/view-materials',
  CREATE_MATERIALS: '/create-materials',
};
export default ROUTES;

interface Routes {
  LOGIN: RouteFormat;
  VIEW_MATERIALS: RouteFormat;
  CREATE_MATERIALS: RouteFormat;
}

type RouteFormat = `/${string}`;
