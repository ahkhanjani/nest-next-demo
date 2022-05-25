import { useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
// types
import { Pathnames } from 'types';

const Index: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push(Pathnames.DASHBOARD);
  }, []);

  return <></>;
};

export default Index;
