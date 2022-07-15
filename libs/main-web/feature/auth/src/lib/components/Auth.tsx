import { useState } from 'react';
// context
import { LoginServiceProvider } from '../service/LoginServiceProvider';
import { SignupServiceProvider } from '../service/SignupServiceProvider';
// cmp
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export const Auth: React.FC = () => {
  // ─── State ──────────────────────────────────────────────────────────────────────

  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // ────────────────────────────────────────────────────────────────────────────────

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
