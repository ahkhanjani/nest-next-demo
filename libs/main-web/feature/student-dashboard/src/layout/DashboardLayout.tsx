import { PropsWithChildren } from 'react';

import Image from 'next/image';

import TabBar from './TabBar';
import Sidebar from './Sidebar';
import Header from './Header';

import { CogIcon } from 'fm/shared-assets/icons';

export const DashboardLayout: React.FC<PropsWithChildren> = ({ children }) => {
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
      <div className="tw-hidden tw-bg-bgColor tw-dark:tw-bg-bgColorDark md:tw-flex ">
        <Sidebar />
        <div className="tw-w-full">
          <Header />
          <div className="tw-px-6 tw-py-10">{children}</div>
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;
