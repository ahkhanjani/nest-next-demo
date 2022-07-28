import React, { useId, useMemo, useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import { hourList, getDefaultRange } from '../../constants';
import { Hour, TimeRange } from '../../types/time-range';
export const AvailableHours: React.FC = () => {
  return <WeekdaysTable />;
};
export default AvailableHours;

const weekdays = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

const WeekdaysTable: React.FC = () => {
  const domId = useId();

  return (
    <table className="tw-daisy-table tw-w-full">
      <tbody>
        {weekdays.map((d) => (
          <WeekdayRow key={domId + d} weekday={d} />
        ))}
      </tbody>
    </table>
  );
};

const WeekdayRow: React.FC<{ weekday: string }> = ({ weekday }) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          className="tw-daisy-toggle"
          onChange={() => {
            setChecked((prevChecked) => !prevChecked);
          }}
        />
      </td>
      <td className="tw-uppercase">{weekday}</td>
      <td>{checked ? <TimeRangePickerList /> : 'Unavailable'}</td>
    </tr>
  );
};

const TimeRangePickerList: React.FC = () => {
  const [ranges, setRanges] = useState<TimeRange[]>([getDefaultRange()]);

  const domId = useId();

  return (
    <>
      {ranges.map((range, index) => (
        <React.Fragment key={domId + index}>
          <TimeSelect
            type="from"
            value={range.from}
            {...{ setRanges, index }}
          />
          <span>to</span>
          <TimeSelect type="to" value={range.to} {...{ setRanges, index }} />
        </React.Fragment>
      ))}
      <button
        className="tw-daisy-btn tw-daisy-btn-square tw-daisy-btn-sm"
        onClick={() => {
          setRanges((prevRanges) => [...prevRanges, getDefaultRange()]);
        }}
      >
        <PlusIcon className="tw-h-5 tw-w-5" />
      </button>
    </>
  );
};

const TimeSelect: React.FC<{
  type: keyof TimeRange;
  index: number;
  value: Hour;
  setRanges: (value: React.SetStateAction<TimeRange[]>) => void;
}> = React.memo(({ index, type, value, setRanges }) => {
  const selectOptions = useMemo(
    () => hourList.map((hour) => <option key={hour}>{hour}</option>),
    []
  );

  return (
    <select
      className="tw-daisy-select tw-daisy-select-ghost tw-w-full tw-max-w-xs"
      value={value}
      onChange={(e) => {
        setRanges((prevRanges) => {
          const newRanges = [...prevRanges];
          newRanges[index][type] = e.target.value as Hour;
          return newRanges;
        });
      }}
    >
      {selectOptions}
    </select>
  );
});
