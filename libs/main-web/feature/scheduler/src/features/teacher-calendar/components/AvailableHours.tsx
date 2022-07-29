import { useId, useState } from 'react';
import TimeRangeList from './TimeRangeList';

export const AvailableHours: React.FC = () => {
  return <WeekdaysList />;
};
export default AvailableHours;

const weekdays = Object.freeze([
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
]);

const WeekdaysList: React.FC = () => {
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

  function handleToggle() {
    setChecked((prevChecked) => !prevChecked);
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          className="tw-daisy-toggle tw-mr-3"
          onChange={handleToggle}
        />
        <span className="tw-uppercase">{weekday}</span>
      </label>
      {checked ? <TimeRangeList /> : 'Unavailable'}
    </div>
  );
};
