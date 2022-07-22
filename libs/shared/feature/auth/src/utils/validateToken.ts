import jwtDecode, { JwtPayload } from 'jwt-decode';

export function validateToken(token: string): boolean {
  if (!token) return false;

  // decode the token
  const decodedToken = jwtDecode<JwtPayload>(token);

  // no expire value
  if (!decodedToken.exp) return false;

  // token is expired
  if (decodedToken.exp * 1000 < Date.now()) return false;

  return true;
}
