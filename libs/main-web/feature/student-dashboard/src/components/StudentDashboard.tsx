import { useState } from 'react';
import Image from 'next/image';

import Sidebar from '../layout/Sidebar';
import Dashboard from '../pages/Dashboard';
import Classroom from '../pages/Classroom';

import type { ActiveDeskPolicy } from '../types';

import {
  BellIcon,
  CalendarIcon,
  ChartSquareBarIcon,
  CogIcon,
  CollectionIcon,
  InboxIcon,
  InformationCircleIcon,
  MoonIcon,
  PencilAltIcon,
  SunIcon,
  UsersIcon,
} from '@heroicons/react/outline';

export const StudentDashboard: React.FC = () => {
  const [isActive, setActive] = useState<number>(2);
  const [activeDesk, setActiveDesk] = useState<ActiveDeskPolicy>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

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
        <div className="tw-w-full  tw-flex tw-flex-row tw-items-center tw-justify-between">
          <button
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center	${
              isActive === 0
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor'
            }`}
            onClick={() => setActive(0)}
          >
            <UsersIcon />
          </button>
          <button
            className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center ${
              isActive === 1
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor'
            }`}
            onClick={() => setActive(1)}
          >
            <CalendarIcon />
          </button>
          <button
            className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center ${
              isActive === 2
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor gray-svg'
            }`}
            onClick={() => setActive(2)}
          >
            <CollectionIcon />
          </button>
          <button
            className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
              isActive === 3
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor'
            }`}
            onClick={() => setActive(3)}
          >
            <PencilAltIcon />
          </button>
          <button
            className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
              isActive === 4
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor'
            }`}
            onClick={() => setActive(4)}
          >
            <ChartSquareBarIcon />
          </button>
        </div>
      </div>
      <div className="tw-hidden tw-bg-bgColor md:tw-flex ">
        <Sidebar {...{ activeDesk, setActiveDesk }} />
        <div className="tw-w-full">
          <div className="tw-bg-white tw-min-w-full  tw-py-6 tw-flex tw-flex-row tw-items-center tw-justify-around tw-shadow-md 2xl:tw-justify-between 2xl:tw-pr-9">
            <span className="tw-text-2xl tw-text-lightGray tw-font-normal tw-px-6 tw-border-r-4 tw-border-r-field 2xl:tw-border-none 2xl:tw-hidden">
              {activeDesk}
            </span>
            <div className="tw-px-9  ">
              <div
                tabIndex={0}
                className="tw-daisy-collapse tw-daisy-collapse-arrow tw-shadow-md tw-bg-white tw-rounded-box"
              >
                <input type="checkbox" />
                <div className="tw-daisy-collapse-title tw-flex tw-flex-row tw-items-center">
                  <InformationCircleIcon />
                  <span className="tw-text-sm tw-font-medium tw-pl-2">
                    Daily idiom:
                  </span>
                  <span className="tw-text-sm tw-font-normal">
                    Sweep (someone) off (someone's) feet
                  </span>
                </div>
                <div className="tw-daisy-collapse-content">
                  <p className="tw-text-sm tw-font-normal tw-text-grayText">
                    A feeling when you fall in love instantly with someone.
                    <br />A feeling when you fall in love instantly with
                    someone.
                  </p>
                </div>
              </div>
            </div>
            <div className="tw-flex tw-flex-row tw-items-center ">
              <div
                className={`tw-border-field tw-border-2 tw-rounded-xl tw-mr-6 tw-w-11 tw-h-6 tw-px-1  tw-transition-all tw-duration-300 tw-flex tw-flex-row tw-items-center tw-justify-between tw-relative ${
                  isDarkMode ? 'tw-bg-gray' : 'tw-bg-white'
                }`}
              >
                <span className="tw-p-1 tw-flex tw-items-center tw-justify-center">
                  <SunIcon />
                </span>
                <span className="tw-p-1 tw-flex tw-items-center tw-justify-center">
                  <MoonIcon />
                </span>
                <div
                  className={`tw-h-[17px] tw-w-[17px] tw-absolute tw-rounded-full tw-cursor-pointer tw-transition-all tw-duration-300 ${
                    isDarkMode ? 'tw-translate-x-4 tw-bg-white' : 'tw-bg-gray'
                  }`}
                  onClick={() =>
                    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode)
                  }
                ></div>
              </div>
              <button>
                <CogIcon />
              </button>
              <button className="tw-px-9 ">
                <BellIcon />
              </button>
              <button>
                <InboxIcon />
              </button>
            </div>
          </div>
          <div className="tw-px-6 tw-py-10">
            {activeDesk === 'dashboard' ? (
              <Dashboard />
            ) : activeDesk === 'classroom' ? (
              <Classroom />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
export default StudentDashboard;
