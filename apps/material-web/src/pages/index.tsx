import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
// routes
import ROUTES from '../routes';

const IndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.BROWSE);
  }, [router]);

  return undefined;
};
export default IndexPage;
