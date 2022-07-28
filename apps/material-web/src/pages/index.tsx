import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const IndexPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('./browse');

    return () => {
      console.log('Redirecting...');
    };
  }, [router]);

  return undefined;
};
export default IndexPage;
