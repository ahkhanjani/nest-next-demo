import { useId, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { PlusIcon, XIcon } from '@heroicons/react/outline';

import { getDefaultRange, hourList } from '../../../constants';
import type { TimeRange } from '../../../types';
import TimeSelect from './TimeSelect';

const TimeRangeList: React.FC = () => {
  const [ranges, setRanges] = useState<TimeRange[]>([getDefaultRange()]);
  const [parent] = useAutoAnimate<HTMLDivElement>();

  function handleRemoveRange(index: number) {
    setRanges((prevRanges) => prevRanges.filter((r, i) => index !== i && r));
  }

  const domId = useId();

  return (
    <>
      {ranges.map((range, index) => (
        <div ref={parent} key={domId + index}>
          <TimeSelect
            type="from"
            value={range.from}
            {...{ setRanges, index }}
          />
          <span>to</span>
          <TimeSelect
            type="to"
            value={range.to}
            selectedFromIndex={hourList.indexOf(range.from)}
            {...{ setRanges, index }}
          />
          {/* remove btn */}
          <button
            className="tw-daisy-btn tw-daisy-btn-square"
            onClick={() => {
              handleRemoveRange(index);
            }}
          >
            <XIcon className="tw-h-3 tw-w-3" />
          </button>
        </div>
      ))}
      <button
        className="tw-daisy-btn tw-daisy-btn-ghost tw-daisy-btn-sm"
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
