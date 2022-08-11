import { useRouter } from 'next/router';
import Image from 'next/image';

import {
  ClassroomDesk,
  DashboardDesk,
  Header,
  Sidebar,
  TabBar,
  TabName,
} from 'fm/main-web-feature-student-dashboard';

// TODO move icon to a feature lib
import { CogIcon } from '@heroicons/react/outline';

export const StudentDashboard: React.FC = () => {
  const router = useRouter();
  const activeDesk = router.query['desk'] as TabName;

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-between tw-h-screen tw-w-screen tw-px-5 tw-py-1 md:tw-hidden">
        <div className="tw-w-full tw-flex tw-items-center tw-justify-between">
          <div className=" tw-border-[3px] tw-border-blue tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[42px] tw-h-[42px]">
            <Image
              src={'/jpg/avatar-test.jpg'}
              alt="avatar"
              width={42}
              height={42}
              className="tw-rounded-full tw-object-cover"
            />
          </div>
          <span>title</span>
          <button className="tw-border tw-border-borderColor tw-rounded-18 tw-p-3 tw-flex tw-items-center">
            <CogIcon />
          </button>
        </div>
        <div className="tw-w-full">Content</div>
        <TabBar />
      </div>
      <div className="tw-hidden tw-bg-bgColor md:tw-flex ">
        <Sidebar />
        <div className="tw-w-full">
          <Header />
          <div className="tw-px-6 tw-py-10">
            {activeDesk === 'dashboard' ? (
              <DashboardDesk />
            ) : activeDesk === 'classroom' ? (
              <ClassroomDesk />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentDashboard;
