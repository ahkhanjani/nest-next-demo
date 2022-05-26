import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
// routes
import ROUTES from 'routes';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(ROUTES.VIEW_MATERIALS);
  }, []);

  return <></>;
};

export default Index;
