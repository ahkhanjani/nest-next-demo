import {
  ThreeUsersIcon,
  CalendarBlueIcon,
  CalendarIcon,
  EditIcon,
  PaperPlusIcon,
  TimeCircleIcon,
} from 'fm/shared-assets/icons';
import React from 'react';
import AddSession from '../components/AddSession';

export const CalendarDesk: React.FC = ({}) => {
  const fakeList = [
    {
      dueTime: 'In 2 hours',
      time: '13:45',
      location: 'New York city',
      users: 'Mohammad & you',
      today: true,
    },
    {
      dueTime: 'Tomorrow',
      time: '13:45',
      location: 'New York city',
      users: 'Mohammad & you',
      today: false,
    },
  ];

  return (
    <div className="tw-w-full tw-max-w-[670px] tw-px-16 tw-py-2 ">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-10">
        <span className="tw-text-xl tw-font-medium tw-text-gray">
          Upcoming sessions
        </span>

        <AddSession />
      </div>
      {fakeList.map((list) => (
        <div
          className={`tw-p-6 tw-mb-5 tw-h-40 tw-w-full tw-mr-5 tw-rounded-2xl ${
            list.today ? 'tw-bg-blue' : 'tw-bg-white tw-shadow-lg'
          } `}
        >
          <div className="tw-flex tw-flex-row tw-justify-between tw-items-center">
            <div className="tw-flex tw-flex-row tw-items-center">
              {list.today ? (
                <CalendarIcon className="yellow-svg" />
              ) : (
                <CalendarBlueIcon />
              )}

              <span
                className={`tw-text-2xl tw-font-normal tw-pl-2 ${
                  list.today ? 'tw-text-white' : 'tw-text-dark'
                }`}
              >
                {list.dueTime}
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
              <EditIcon className={list.today ? '' : 'gray-svg'} />
            </div>
          </div>
          <hr className="tw-border-t-4 tw-border-field tw-my-4" />
          <div className="tw-flex  tw-flex-row tw-items-center">
            <TimeCircleIcon
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
            <ThreeUsersIcon
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
        </div>
      ))}
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-field tw-min-w-full tw-h-28 tw-rounded-2xl">
        <PaperPlusIcon />
        <span className="tw-text-xs tw-text-gray tw-font-normal ">
          {fakeList.length > 1 ? 'Book More sessions' : 'Book sessions'}
        </span>
      </div>
    </div>
  );
};

export default CalendarDesk;
