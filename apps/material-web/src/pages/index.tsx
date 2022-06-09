import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useLoginCheck } from '@fm/auth';
// routes
import ROUTES from '../routes';

const IndexPage: NextPage = () => {
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

  return undefined;
};
export default IndexPage;
