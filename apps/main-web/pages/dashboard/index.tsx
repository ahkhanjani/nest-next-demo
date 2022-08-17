import { useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { DashboardLayout } from 'fm/main-web-feature-student-dashboard';

const DashboardPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/home');
  }, [router]);

  return (
    <>
      <Head>
        <title>Dashboard | New Moon</title>
      </Head>
      <DashboardLayout>Redirecting...</DashboardLayout>
    </>
  );
};
export default DashboardPage;
