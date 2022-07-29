import { useId, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';

import { getDefaultRange, hourList } from '../../../constants';
import type { TimeRange } from '../../../types';
// cmp
import TimeSelect from './TimeSelect';

const TimeRangeList: React.FC = () => {
  const [ranges, setRanges] = useState<TimeRange[]>([getDefaultRange()]);

  const domId = useId();

  return (
    <>
      {ranges.map((range, index) => (
        <TimeRangeListItem
          key={domId + index}
          {...{ index, range, setRanges }}
        />
      ))}
      <button
        className="tw-daisy-btn tw-daisy-btn-square tw-daisy-btn-ghost tw-daisy-btn-md"
        onClick={() => {
          setRanges((prevRanges) => [...prevRanges, getDefaultRange()]);
        }}
      >
        <PlusIcon className="tw-h-5 tw-w-5" />
      </button>
    </>
  );
};
export default TimeRangeList;

const TimeRangeListItem: React.FC<TimeRangeListItemProps> = ({
  range,
  setRanges,
  index,
}) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();

  function handleRemoveRange() {
    setRanges((prevRanges) => prevRanges.filter((r, i) => index !== i && r));
  }

  return (
    <div ref={parent}>
      <TimeSelect type="from" value={range.from} {...{ setRanges, index }} />
      <span>to</span>
      <TimeSelect
        type="to"
        value={range.to}
        selectedFromIndex={hourList.indexOf(range.from)}
        {...{ setRanges, index }}
      />

      <button // remove button
        className="tw-daisy-btn tw-daisy-btn-square tw-daisy-btn-outline tw-daisy-btn-sm"
        onClick={handleRemoveRange}
      >
        <XIcon className="tw-h-3 tw-w-3" />
      </button>
    </div>
  );
};

interface TimeRangeListItemProps {
  index: number;
  range: TimeRange;
  setRanges: React.Dispatch<React.SetStateAction<TimeRange[]>>;
}
