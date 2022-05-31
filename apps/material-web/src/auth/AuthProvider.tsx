import { useReducer, createContext, PropsWithChildren, useMemo } from 'react';
import { useLoginCheck } from '../hooks';

const initialState: InitialStateType = {
  user: null,
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AuthActionType.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case AuthActionType.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

const AuthProvider: React.FC<PropsWithChildren<unknown>> = (props) => {
  const [isLoggedIn, decodedToken] = useLoginCheck();
  if (isLoggedIn && decodedToken) initialState.user = decodedToken;

  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(token: string) {
    localStorage.setItem('jwtToken', token);
    dispatch({
      type: AuthActionType.LOGIN,
      payload: token,
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: AuthActionType.LOGOUT });
  }

  // memoize value
  const memoedValue = useMemo(
    () => ({
      user: state.user,
      login,
      logout,
    }),
    [state.user]
  );

  return <AuthContext.Provider value={memoedValue} {...props} />;
};
export default AuthProvider;

enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface AuthAction {
  type: AuthActionType;
  payload?: any;
}

interface AuthState {
  user: any;
}

interface AuthContextType {
  user?: any;
  login: (token: string) => void;
  logout: () => void;
}

interface InitialStateType {
  user: any;
}
