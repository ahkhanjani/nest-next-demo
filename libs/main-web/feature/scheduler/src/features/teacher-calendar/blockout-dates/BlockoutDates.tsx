import { PlusIcon } from '@heroicons/react/outline';

const BlockoutDates: React.FC = () => {
  return (
    <>
      <p>
        Add days when you do not want to get bookings or availability changes
        from your weekly days
      </p>
      <button className="tw-daisy-btn tw-gap-2">
        Add blockout dates
        <PlusIcon className="tw-w-2 tw-h-2" />
      </button>
    </>
  );
};
export default BlockoutDates;
