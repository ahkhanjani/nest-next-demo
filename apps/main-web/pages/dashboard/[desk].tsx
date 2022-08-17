import { NextPage } from 'next';
import { useRouter } from 'next/router';

import {
  ClassroomDesk,
  HomeDesk,
  TabName,
} from 'fm/main-web-feature-student-dashboard';

// TODO move icon to a feature lib
import Head from 'next/head';
import { DashboardLayout } from 'fm/main-web-feature-student-dashboard';

const DashboardPage: NextPage = () => {
  const router = useRouter();
  const activeDesk = router.query['desk'] as TabName;

  return (
    <>
      <Head>
        <title>Dashboard | New Moon</title>
      </Head>
      <DashboardLayout>
        {!activeDesk ? (
          <HomeDesk />
        ) : activeDesk === 'classroom' ? (
          <ClassroomDesk />
        ) : null}
      </DashboardLayout>
    </>
  );
};
export default DashboardPage;
