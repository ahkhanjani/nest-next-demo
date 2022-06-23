import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLoginCheck } from '@fm/auth';
// routes
import ROUTES from '../../routes';

const IndexPage: React.FC = () => {
  const router = useRouter();

  const [isLoggedIn] = useLoginCheck();

  //
  // ─── EFFECT ─────────────────────────────────────────────────────────────────────
  //

  useEffect(() => {
    function checkLogin() {
      if (isLoggedIn) {
        router.push(ROUTES.BROWSE);
        return;
      }

      router.push(ROUTES.LOGIN);
    }

    checkLogin();
  }, [isLoggedIn, router]);

  // ────────────────────────────────────────────────────────────────────────────────

  return <>Please wait...</>;
};
export default IndexPage;
