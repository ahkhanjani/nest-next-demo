import { useId, useMemo, useState } from 'react';

const weekdays = [
  'saturday',
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
];

const WeekdayTable: React.FC = () => {
  const domId = useId();

  return (
    <table className="tw-daisy-table tw-w-full">
      <tbody>
        {weekdays.map((d) => (
          <WeekdayTableRow key={domId + d} weekday={d} />
        ))}
      </tbody>
    </table>
  );
};
export default WeekdayTable;

const WeekdayTableRow: React.FC<{ weekday: string }> = ({ weekday }) => {
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
      <td className="tw-uppercase">
        {checked === false ? 'unavailable' : <TimeRangePicker />}
      </td>
    </tr>
  );
};

const TimeRangePicker: React.FC = () => {
  return (
    <>
      <TimeSelect />
      <span>to</span>
      <TimeSelect />
    </>
  );
};

const TimeSelect: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');

  const hourList = useMemo(() => {
    const hours = [
      '12',
      ...Array.from({ length: 11 }, (_, i) => (i + 1).toString()),
    ];
    const mins = ['00', '15', '30', '45'];
    const periods = ['AM', 'PM'];

    const list: string[] = [];
    periods.forEach((p) =>
      hours.forEach((h) =>
        mins.forEach((m) => {
          list.push(`${h}:${m} ${p}`);
        })
      )
    );

    return list;
  }, []);

  return (
    <select
      className="tw-daisy-select tw-daisy-select-ghost tw-w-full tw-max-w-xs"
      value={selectedTime}
      onChange={(e) => {
        setSelectedTime(e.target.value);
      }}
    >
      {hourList.map((hour) => (
        <option>{hour}</option>
      ))}
    </select>
  );
};
