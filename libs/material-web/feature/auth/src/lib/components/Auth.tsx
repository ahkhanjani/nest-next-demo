// context
import { LoginServiceProvider } from '../service/LoginServiceProvider';
// cmp
import LoginForm from './LoginForm';

export const Auth: React.FC = () => (
  <LoginServiceProvider>
    <LoginForm />
  </LoginServiceProvider>
);
export default Auth;
