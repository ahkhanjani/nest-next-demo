import { memo, useCallback, useMemo } from 'react';
import { hourList } from '../../../constants';
import type { Hour, TimeRange } from '../../../types';

const TimeSelect: React.FC<TimeSelectProps> = memo(
  ({ index, type, value, setRanges, selectedFromIndex }) => {
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
      [selectedFromIndex],
    );

    const selectOptions = useMemo(
      () =>
        hourList.map((hour, index) => (
          <option key={hour} disabled={getDisabled(index)}>
            {hour}
          </option>
        )),
      [getDisabled],
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
  },
);
export default TimeSelect;

interface TimeSelectProps {
  type: keyof TimeRange;
  index: number;
  value: Hour;
  setRanges: (value: React.SetStateAction<TimeRange[]>) => void;
  selectedFromIndex?: number;
}
