import { useEffect, useId, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import {
  CalendarIcon,
  ClockIcon,
  EditIcon,
  ThreeUsersIcon,
} from '../assets/icons';

import dayjs from 'dayjs';
import dayjs_isToday from 'dayjs/plugin/isToday';
import dayjs_isTomorrow from 'dayjs/plugin/isTomorrow';
import dayjs_localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(dayjs_isToday);
dayjs.extend(dayjs_isTomorrow);
dayjs.extend(dayjs_localizedFormat);

export interface Session {
  id: string;
  date: Date;
  timeZone: string;
  participants: string;
}

// TODO provide type for list
const Sessions: React.FC = () => {
  // const { data, loading } = useGetSessionsByUserQuery({
  //   variables: { userId: user.id },
  // });

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const threeDaysLater = new Date();
  threeDaysLater.setDate(today.getDate() + 3);
  const fakeList: Session[] = [
    {
      id: 'A1B2',
      date: today,
      timeZone: 'New York city',
      participants: 'Mohammad & you',
    },
    {
      id: 'C3D4',
      date: tomorrow,
      timeZone: 'New York city',
      participants: 'Mohammad & you',
    },
    {
      id: 'E5F6',
      date: threeDaysLater,
      timeZone: 'New York city',
      participants: 'Mohammad & you',
    },
  ];

  const domId = useId();
  return (
    <>
      {fakeList.map((s) => (
        <SessionCard key={domId + s.id} session={s} />
      ))}
    </>
  );
};
export default Sessions;

const SessionCard: React.FC<{
  session: Session;
  loading?: boolean;
}> = ({ session: { date, timeZone, participants }, loading = true }) => {
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

    setDisplayDate(dayjs(date).format('ddd, MMM D'));
  }, [date, displayDate]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <div
      className={`tw-p-6 tw-h-48 tw-w-64 tw-mr-5 tw-rounded-2xl ${
        isToday ? 'tw-bg-blue' : 'tw-bg-white tw-shadow-lg'
      } `}
    >
      <div className="tw-flex tw-flex-row tw-justify-between">
        <div className="tw-flex tw-flex-row tw-items-center">
          {loading ? (
            <Skeleton circle />
          ) : (
            <CalendarIcon className={isToday ? 'tw-text-gray' : ''} />
          )}
          <span
            className={`tw-text-2xl tw-font-normal tw-pl-2 tw-truncate ${
              isToday ? 'tw-text-white' : 'tw-text-dark'
            }`}
          >
            {displayDate}
          </span>
        </div>

        <div className="tw-flex tw-flex-row tw-items-center tw-py-2">
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

      <hr className="tw-border-t-4 tw-border-field tw-my-4" />

      <InformationItem
        icon={<ClockIcon />}
        text={displayTime || `${displayTime} - ${timeZone}`}
        {...{ isToday }}
      />

      <InformationItem
        icon={<ThreeUsersIcon />}
        text={participants}
        {...{ isToday }}
      />
    </div>
  );
};

const InformationItem: React.FC<{
  icon: JSX.Element;
  text: string;
  isToday: boolean;
}> = ({ icon, text, isToday }) => (
  <div className="tw-flex tw-flex-row tw-items-center">
    {icon || <Skeleton circle />}
    <span
      className={`tw-text-sm tw-font-normal tw-pl-4 ${
        isToday ? 'tw-text-white' : 'tw-text-gray'
      }`}
    >
      {text || <Skeleton />}
    </span>
  </div>
);
