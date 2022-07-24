// context
import { LoginServiceProvider } from '../service/LoginServiceProvider';
import { SignupServiceProvider } from '../service/SignupServiceProvider';
// cmp
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export const Auth: React.FC<AuthProps> = ({ mode }) => {
  return mode === 'login' ? (
    <LoginServiceProvider>
      <LoginForm />
    </LoginServiceProvider>
  ) : (
    <SignupServiceProvider>
      <SignupForm />
    </SignupServiceProvider>
  );
};
export default Auth;

interface AuthProps {
  mode: AuthMode;
}

export type AuthMode = 'login' | 'signup';
