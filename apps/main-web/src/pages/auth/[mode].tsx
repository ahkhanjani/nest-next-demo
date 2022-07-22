import { NextPage } from 'next';
import { useRouter } from 'next/router';
// cmp
import { Auth, AuthMode } from 'fm/main-web-feature-auth';

const AuthPage: NextPage = () => {
  const router = useRouter();
  const { mode }: { mode?: AuthMode } = router.query;

  // ────────────────────────────────────────────────────────────────────────────────

  return <Auth mode={mode} />;
};
export default AuthPage;
