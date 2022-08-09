import Image from 'next/image';

import {
  CogIcon,
  ChartSquareBarIcon,
  PencilAltIcon,
  CalendarIcon,
  UsersIcon,
  CollectionIcon,
} from '@heroicons/react/outline';

import type { ActiveDeskPolicy } from '../types';

const Sidebar: React.FC<{
  activeDesk: ActiveDeskPolicy;
  setActiveDesk: React.Dispatch<React.SetStateAction<ActiveDeskPolicy>>;
}> = ({ activeDesk, setActiveDesk }) => {
  return (
    <div className="tw-h-screen tw-bg-white tw-px-4 tw-flex tw-flex-col tw-items-center tw-shadow-[2px_0px_1px_rgba(0,0,0,0.1)]">
      <div className="tw-mt-8 tw-block 2xl:tw-hidden">
        <Image src="/icons/vertical-logo.svg" alt="logo" layout="fill" />
      </div>
      <div className="tw-mt-8 tw-hidden 2xl:tw-block">
        <Image src="/icons/horizontal-logo.svg" alt="logo" layout="fill" />
      </div>
      <div className="tw-flex tw-flex-col tw-items-center tw-my-12 tw-border-t-4 tw-border-field tw-py-4 2xl:tw-w-40">
        <button
          onClick={() => setActiveDesk('dashboard')}
          className="tw-flex tw-flex-row tw-items-center tw-min-w-full"
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              activeDesk === 'dashboard' ? 'tw-bg-blue white-svg ' : ' gray-svg'
            }`}
          >
            <CollectionIcon />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Dashboard
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('classroom')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              activeDesk === 'classroom' ? 'tw-bg-blue white-svg ' : ' gray-svg'
            }`}
          >
            <UsersIcon />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Classroom
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('calendar')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              activeDesk === 'calendar' ? 'tw-bg-blue white-svg ' : ' gray-svg'
            }`}
          >
            <CalendarIcon />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Calendar
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('homework')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              activeDesk === 'homework' ? 'tw-bg-blue white-svg ' : ' gray-svg'
            }`}
          >
            <PencilAltIcon />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Homework
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('payments')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              activeDesk === 'payments' ? 'tw-bg-blue white-svg ' : ' gray-svg'
            }`}
          >
            <ChartSquareBarIcon />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Payments
          </label>
        </button>
        <button
          className="tw-flex tw-flex-row tw-items-center tw-py-2 tw-min-w-full"
          onClick={() => setActiveDesk('settings')}
        >
          <div
            className={`tw-rounded-18 tw-p-[13px] tw-flex tw-items-center		  ${
              activeDesk === 'settings' ? 'tw-bg-blue white-svg ' : ' gray-svg'
            }`}
          >
            <CogIcon />
          </div>
          <label className="tw-px-2 tw-text-sm tw-font-medium tw-text-gray tw-cursor-pointer tw-hidden 2xl:tw-block">
            Settings
          </label>
        </button>
      </div>
      <div className="tw-border-[3px] tw-border-blue tw-rounded-full tw-flex tw-items-center tw-justify-center tw-w-[42px] tw-h-[42px] ">
        <Image
          src="/images/avatar-test.jpg"
          alt="avatar"
          width={42}
          height={42}
          className="tw-rounded-full tw-object-cover"
        />
      </div>
    </div>
  );
};
export default Sidebar;
