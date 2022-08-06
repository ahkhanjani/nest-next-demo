import { useState } from 'react';
import Image from 'next/image';

import Sidebar from '../layout/Sidebar';
import Dashboard from '../pages/Dashboard';
import Classroom from '../pages/Classroom';

import {
  Icon2User,
  IconCahrt,
  IconCalendarOutline,
  IconCategory,
  IconEditSquare,
  IconInfoCircle,
  IconMessage,
  IconMoon,
  IconNotificatin,
  IconSetting,
  IconSun,
} from 'fm/main-web-assets/icons';
import { ImageAvatarTest } from 'fm/main-web-assets/images';

import type { ActiveDeskPolicy } from '../types';

export const StudentDashboard: React.FC = () => {
  const [isActive, setActive] = useState(2);
  const [activeDesk, setActiveDesk] = useState<ActiveDeskPolicy>('dashboard');
  const [isDark, setDark] = useState(false);

  const renderContent = () => {
    if (activeDesk === 'dashboard') {
      return <Dashboard />;
    } else if (activeDesk === 'classroom') {
      return <Classroom />;
    } else {
      return <div></div>;
    }
  };

  return (
    <div>
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-between tw-h-screen tw-w-screen tw-px-5 tw-py-1 md:tw-hidden">
        <div className="tw-w-full tw-flex tw-items-center tw-justify-between  ">
          <div className=" tw-border-[3px] tw-border-blue tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[42px] tw-h-[42px] ">
            <Image
              src={ImageAvatarTest}
              alt="avatar"
              width={42}
              height={42}
              className="tw-rounded-full tw-object-cover"
            />
          </div>
          <span>title</span>
          <button className="tw-border tw-border-borderColor tw-rounded-18 tw-p-3 tw-flex tw-items-center">
            <Image src={IconSetting} alt="setting" />
          </button>
        </div>
        <div className="tw-w-full">Content</div>
        <div className="tw-w-full  tw-flex tw-flex-row tw-items-center tw-justify-between">
          <button
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              isActive === 0
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor'
            }`}
            onClick={() => setActive(0)}
          >
            <Image src={Icon2User} alt="2user" />
          </button>
          <button
            className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center ${
              isActive === 1
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor'
            }`}
            onClick={() => setActive(1)}
          >
            <Image src={IconCalendarOutline} alt="calendar" />
          </button>
          <button
            className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
              isActive === 2
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor gray-svg'
            }`}
            onClick={() => setActive(2)}
          >
            <Image src={IconCategory} alt="category" />
          </button>
          <button
            className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
              isActive === 3
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor'
            }`}
            onClick={() => setActive(3)}
          >
            <Image src={IconEditSquare} alt="edit" />
          </button>
          <button
            className={` tw-rounded-18 tw-p-[13px] tw-flex tw-items-center  ${
              isActive === 4
                ? 'tw-bg-blue white-svg '
                : 'tw-border tw-border-borderColor'
            }`}
            onClick={() => setActive(4)}
          >
            <Image src={IconCahrt} alt="chart" />
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
                  <Image src={IconInfoCircle} alt="info" />
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
                  isDark ? 'tw-bg-gray' : 'tw-bg-white'
                }`}
              >
                <span className="tw-p-1 tw-flex tw-items-center tw-justify-center">
                  <Image src={IconSun} alt="sun" />
                </span>
                <span className="tw-p-1 tw-flex tw-items-center tw-justify-center">
                  <Image src={IconMoon} alt="moon" />
                </span>
                <div
                  className={`tw-h-[17px] tw-w-[17px] tw-absolute tw-rounded-full tw-cursor-pointer tw-transition-all tw-duration-300 ${
                    isDark ? 'tw-translate-x-4 tw-bg-white' : 'tw-bg-gray'
                  }`}
                  onClick={() => setDark(!isDark)}
                ></div>
              </div>
              <button>
                <Image src={IconSetting} alt="setting" />
              </button>
              <button className="tw-px-9 ">
                <Image src={IconNotificatin} alt="notification" />
              </button>
              <button>
                <Image src={IconMessage} alt="message" />
              </button>
            </div>
          </div>
          <div className="tw-px-6 tw-py-10">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};
export default StudentDashboard;
