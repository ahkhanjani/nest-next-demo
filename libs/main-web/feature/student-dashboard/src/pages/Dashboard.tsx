import { DocumentAddIcon } from '@heroicons/react/outline';
import { useId } from 'react';
// cmp
import Sessions from '../components/Sessions';

const Dashboard: React.FC = () => {
  const fakeList = [
    {
      id: 'A1B2',
      dueTime: 'In 2 hours',
      time: '13:45',
      location: 'New York city',
      users: 'Mohammad & you',
      today: true,
    },
    {
      id: 'C3D4',
      dueTime: 'Tomorrow',
      time: '13:45',
      location: 'New York city',
      users: 'Mohammad & you',
      today: false,
    },
  ];

  // ────────────────────────────────────────────────────────────────────────────────

  const domId = useId();

  return (
    <>
      <span className="tw-text-gray tw-text-xl tw-font-medium tw-p-4">
        Upcoming sessions
      </span>
      <div className="tw-w-fit tw-flex tw-flex-row tw-items-center tw-bg-white tw-mt-4 tw-p-4 tw-rounded-2xl tw-shadow-sm">
        {fakeList.map((item) => (
          <Sessions key={domId + item.id} list={item} />
        ))}
        <button className="tw-h-[74px] tw-w-[74px] tw-rounded-full tw-mr-3 tw-bg-field tw-flex tw-flex-col tw-items-center tw-justify-center">
          <DocumentAddIcon />
          <span className="tw-text-xs tw-font-normal tw-text-gray">Add</span>
        </button>
      </div>
    </>
  );
};
export default Dashboard;
