import React, { useCallback, useId, useMemo, useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
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
    <>
      {weekdays.map((d) => (
        <WeekdayRow key={domId + d} weekday={d} />
      ))}
    </>
  );
};

const WeekdayRow: React.FC<{ weekday: string }> = ({ weekday }) => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <label className="tw-daisy-label tw-cursor-pointer">
        <input
          type="checkbox"
          className="tw-daisy-toggle"
          onChange={() => {
            setChecked((prevChecked) => !prevChecked);
          }}
        />
        <span className="tw-uppercase">{weekday}</span>
      </label>

      {checked ? <TimeRangePickerList /> : 'Unavailable'}
    </>
  );
};

const TimeRangePickerList: React.FC = () => {
  const [ranges, setRanges] = useState<TimeRange[]>([getDefaultRange()]);
  const [parent] = useAutoAnimate<HTMLDivElement>();

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

const TimeSelect: React.FC<{
  type: keyof TimeRange;
  index: number;
  value: Hour;
  setRanges: (value: React.SetStateAction<TimeRange[]>) => void;
  selectedFromIndex?: number;
}> = React.memo(({ index, type, value, setRanges, selectedFromIndex }) => {
  const getDisabled = useCallback(
    (index: number): boolean => {
      if (!selectedFromIndex) return false;

      switch (selectedFromIndex) {
        case hourList.length - 2:
          return false;
        case hourList.length - 1:
          if (index === 0) return true;
          return false;
        default:
          if (index <= selectedFromIndex) return true;
          return false;
      }
    },
    [selectedFromIndex]
  );

  const selectOptions = useMemo(
    () =>
      hourList.map((hour, index) => (
        <option key={hour} disabled={getDisabled(index)}>
          {hour}
        </option>
      )),
    [getDisabled]
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
