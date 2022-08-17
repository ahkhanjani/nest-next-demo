import { NextPage } from 'next';
import Head from 'next/head';

import { DashboardLayout } from 'fm/main-web-feature-student-dashboard';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
