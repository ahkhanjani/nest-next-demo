const ROUTES: Record<RouteNamePolicy, RouteFormat> = {
  LOGIN: '/login',
  BROWSE: '/browse',
  WIZARD: '/wizard',
  FORM_SCHEMA: '/form-schema',
};
export default ROUTES;

type RouteNamePolicy = 'LOGIN' | 'BROWSE' | 'WIZARD' | 'FORM_SCHEMA';

type RouteFormat = `/${string}`;
