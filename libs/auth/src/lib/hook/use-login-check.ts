import { useState, useDebugValue, useEffect } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';

/**
 * @returns An array with two values.
 * The first one returns a boolean, true when user is logged in.
 * The second one returns the decoded JWT token, undefined if user is not logged in.
 *
 * @example const [isLoggedIn, decodedToken] = useLoginCheck()
 */
export const useLoginCheck = (): LoginReturnType => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [decodedToken, setDecodedToken] = useState<JwtPayload | undefined>(
    undefined
  );

  useEffect(() => {
    function checkLogin(): void {
      // get access token
      const token = localStorage.getItem('jwtToken');
      // if token does not exist, return false
      if (!token) {
        setIsLoggedIn(false);
        setDecodedToken(undefined);
        return;
      }

      // decode the token
      const decodedToken = jwtDecode<JwtPayload>(token);
      // exp value can possibly be undefined so the token is invalid.
      // in that case, return false
      if (!decodedToken.exp) {
        setIsLoggedIn(false);
        setDecodedToken(undefined);
        return;
      }

      // if the token is expired, return false
      if (decodedToken.exp * 1000 < Date.now()) {
        setIsLoggedIn(false);
        setDecodedToken(undefined);
        return;
      }

      // else, user has logged in
      setIsLoggedIn(true);
      setDecodedToken(decodedToken);
    }

    checkLogin();
  }, []);

  useDebugValue(isLoggedIn ?? 'Loading...');

  return [isLoggedIn, decodedToken];
};

type LoginReturnType = [boolean, JwtPayload | undefined];
