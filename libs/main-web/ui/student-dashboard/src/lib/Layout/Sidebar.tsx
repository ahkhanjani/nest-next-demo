import {
  Icon2User,
  IconCahrt,
  IconCalendarOutline,
  IconCategory,
  IconEditSquare,
  IconHorizontalLogo,
  IconSetting,
  IconVerticalLogo,
} from 'fm/icons';
import { ImageAvatarTest } from 'fm/images';
import Image from 'next/image';
import React from 'react';

export type SidebarProps = {
  isActiveDesk: string;
  setActiveDesk: any;
};

const Sidebar: React.FC<SidebarProps> = ({ isActiveDesk, setActiveDesk }) => {
  return (
    <div className="tw-h-screen tw-bg-white tw-px-4 tw-flex tw-flex-col tw-items-center tw-shadow-[2px_0px_1px_rgba(0,0,0,0.1)]">
      <div className="tw-mt-8 tw-block 2xl:tw-hidden">
        <Image src={IconVerticalLogo} alt="logo" />
      </div>
      <div className="tw-mt-8 tw-hidden 2xl:tw-block">
        <Image src={IconHorizontalLogo} alt="logo" />
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-my-12 tw-border-t-4 tw-border-field tw-py-4 2xl:tw-w-40">
        <button
          onClick={() => setActiveDesk('Dashboard')}
          className="tw-flex tw-flex-row tw-items-center tw-min-w-full"
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              isActiveDesk === 'Dashboard'
                ? 'tw-bg-blue white-svg '
                : ' gray-svg'
            }`}
          >
            <Image src={IconCategory} alt="category" />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Dashboard
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('Classroom')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              isActiveDesk === 'Classroom'
                ? 'tw-bg-blue white-svg '
                : ' gray-svg'
            }`}
          >
            <Image src={Icon2User} alt="2user" />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Classroom
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('Calendar')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              isActiveDesk === 'Calendar'
                ? 'tw-bg-blue white-svg '
                : ' gray-svg'
            }`}
          >
            <Image src={IconCalendarOutline} alt="calendar" />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Calendar
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('Home-Work')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              isActiveDesk === 'Home-Work'
                ? 'tw-bg-blue white-svg '
                : ' gray-svg'
            }`}
          >
            <Image src={IconEditSquare} alt="edit" />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Home-Work
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('Payments')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              isActiveDesk === 'Payments'
                ? 'tw-bg-blue white-svg '
                : ' gray-svg'
            }`}
          >
            <Image src={IconCahrt} alt="chart" />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Payments
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('Settings')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              isActiveDesk === 'Settings'
                ? 'tw-bg-blue white-svg '
                : ' gray-svg'
            }`}
          >
            <Image src={IconSetting} alt="setting" />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Settings
          </label>
        </button>
      </div>
      <div className="tw-border-[3px] tw-border-blue tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[42px] tw-h-[42px] ">
        <Image
          src={ImageAvatarTest}
          alt="avatar"
          width={42}
          height={42}
          className="tw-rounded-full tw-object-cover"
        />
      </div>
    </div>
  );
};

export { Sidebar };
