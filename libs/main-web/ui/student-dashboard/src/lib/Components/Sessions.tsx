import {
  Icon3User,
  IconBlueCalendar,
  IconCalendar,
  IconEdit,
  IconTimeCircle,
} from 'fm/icons';
import Image from 'next/image';
import React from 'react';

interface SessionsProps {
  list: any;
}

const Sessions: React.FC<SessionsProps> = ({ list }) => {
  return (
    <div
      className={`tw-p-6 tw-h-48 tw-w-64 tw-mr-5 tw-rounded-2xl ${
        list.today ? 'tw-bg-blue' : 'tw-bg-white tw-shadow-lg'
      } `}
    >
      <div className="tw-flex  tw-flex-row tw-items-center">
        <Image
          src={list.today ? IconCalendar : IconBlueCalendar}
          alt="calendar"
          className={list.today ? 'yellow-svg' : ''}
        />
        <span
          className={`tw-text-2xl tw-font-normal tw-pl-2 ${
            list.today ? 'tw-text-white' : 'tw-text-dark'
          }`}
        >
          {list.dueTime}
        </span>
      </div>
      <hr className="tw-border-t-4 tw-border-field tw-my-4" />
      <div className="tw-flex  tw-flex-row tw-items-center">
        <Image
          src={IconTimeCircle}
          alt="clock"
          className={list.today ? 'light-yellow-svg' : 'light-blue-svg'}
        />
        <span
          className={`tw-text-sm tw-font-normal  tw-pl-4 ${
            list.today ? 'tw-text-white' : 'tw-text-gray'
          }`}
        >
          {list.time} - {list.location}
        </span>
      </div>
      <div className="tw-py-2 tw-flex  tw-flex-row tw-items-center">
        <Image
          src={Icon3User}
          alt="user"
          className={list.today ? 'light-yellow-svg' : 'light-blue-svg'}
        />
        <span
          className={`tw-text-sm tw-font-normal  tw-pl-4 ${
            list.today ? 'tw-text-white' : 'tw-text-gray'
          }`}
        >
          {list.users}
        </span>
      </div>
      <div className="tw-ml-[137px] tw-flex  tw-flex-row tw-items-center tw-py-2">
        <span
          className={`tw-text-xs tw-font-normal tw-pr-1 ${
            list.today ? 'tw-text-white' : 'tw-text-lightGray'
          }`}
        >
          reschedule
        </span>
        <Image
          src={IconEdit}
          alt="edit"
          className={list.today ? '' : 'gray-svg'}
        />
      </div>
    </div>
  );
};

export default Sessions;
