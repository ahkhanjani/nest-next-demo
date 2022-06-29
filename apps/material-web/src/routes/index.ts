const ROUTES: Record<RouteNamePolicy, RouteFormat> = {
  LOGIN: '/login',
  BROWSE: '/browse',
  WIZARD: '/wizard',
};
export default ROUTES;

type RouteNamePolicy = 'LOGIN' | 'BROWSE' | 'WIZARD';

type RouteFormat = `/${string}`;
