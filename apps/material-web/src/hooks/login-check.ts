import { useState, useDebugValue, useLayoutEffect } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';

export const useLoginCheck = (): LoginReturnType => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [decodedToken, setDecodedToken] = useState<JwtPayload | undefined>(
    undefined
  );

  useLayoutEffect(() => {
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
