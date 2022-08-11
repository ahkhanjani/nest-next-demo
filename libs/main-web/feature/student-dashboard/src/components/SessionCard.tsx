import { useEffect, useState } from 'react';

import {
  CalendarIcon,
  ClockIcon,
  EditIcon,
  ThreeUsersIcon,
} from '../assets/icons';

import type { Session } from './Sessions';

import dayjs from 'dayjs';
import dayjs_isToday from 'dayjs/plugin/isToday';
import dayjs_isTomorrow from 'dayjs/plugin/isTomorrow';
dayjs.extend(dayjs_isToday);
dayjs.extend(dayjs_isTomorrow);

const SessionCard: React.FC<{
  session: Session;
}> = ({ session: { date, timeZone, participants } }) => {
  const [displayDate, setDisplayDate] = useState<string>('');
  const [displayTime, setDisplayTime] = useState<string>('');
  const [isToday, setIsToday] = useState<boolean>(false);

  useEffect(() => {
    // dayjs format docs: https://day.js.org/docs/en/display/format
    // Format: LT | English Locale: h:mm A | Sample Output: 8:02 PM
    setDisplayTime(dayjs(date).format('LT'));

    if (dayjs(date).isToday()) {
      setDisplayDate('Today');
      setIsToday(true);
      return;
    }

    if (dayjs(date).isTomorrow()) {
      setDisplayDate('Tomorrow');
      return;
    }

    // Format: LLLL | English Locale: dddd, MMMM D, YYYY h:mm A | Thursday, August 16, 2018 8:02 PM
    setDisplayDate(dayjs(date).format('LLLL'));
  }, [date, displayDate]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <div
      className={`tw-p-6 tw-h-48 tw-w-64 tw-mr-5 tw-rounded-2xl ${
        isToday ? 'tw-bg-blue' : 'tw-bg-white tw-shadow-lg'
      } `}
    >
      <div className="tw-flex  tw-flex-row tw-items-center">
        <CalendarIcon className={isToday ? 'tw-text-gray' : ''} />
        <span
          className={`tw-text-2xl tw-font-normal tw-pl-2 ${
            isToday ? 'tw-text-white' : 'tw-text-dark'
          }`}
        >
          {displayDate}
        </span>
      </div>

      <hr className="tw-border-t-4 tw-border-field tw-my-4" />

      <InformationItem
        icon={<ClockIcon />}
        text={`${displayTime} - ${timeZone}`}
        isToday={isToday}
      />

      <InformationItem
        icon={<ThreeUsersIcon />}
        text={participants}
        isToday={isToday}
      />

      <div className="tw-ml-[137px] tw-flex tw-flex-row tw-items-center tw-py-2">
        <span
          className={`tw-text-xs tw-font-normal tw-pr-1 ${
            isToday ? 'tw-text-white' : 'tw-text-lightGray'
          }`}
        >
          reschedule
        </span>
        <EditIcon />
      </div>
    </div>
  );
};
export default SessionCard;

const InformationItem: React.FC<{
  icon?: JSX.Element;
  text: string;
  isToday: boolean;
}> = ({ icon, text, isToday }) => (
  <div className="tw-flex tw-flex-row tw-items-center">
    {icon}
    <span
      className={`tw-text-sm tw-font-normal tw-pl-4 ${
        isToday ? 'tw-text-white' : 'tw-text-gray'
      }`}
    >
      {text}
    </span>
  </div>
);
