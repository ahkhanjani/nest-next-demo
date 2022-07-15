// daily.co
import type { StatefulDevice } from '@daily-co/daily-react-hooks';
import { useId } from 'react';
// cmp
import SelectInput from '../SelectInput';

const DeviceSelect: React.FC<DeviceSelectProps> = ({
  title,
  devices,
  currentDevice,
  setCurrentDevice,
}) => {
  const domId = useId();

  return (
    <>
      <label className="tw-daisy-label">
        <span className="tw-daisy-label-text">{title}</span>
      </label>
      <SelectInput
        onChange={({ target: { value } }) => {
          setCurrentDevice(devices[value]);
        }}
        value={devices.findIndex(
          ({ device }) => device.deviceId === currentDevice?.device.deviceId
        )}
      >
        {devices.map(({ device: { deviceId, label } }, index) => (
          <option key={`${domId}-${deviceId}`} value={index}>
            {label}
          </option>
        ))}
      </SelectInput>
    </>
  );
};
export default DeviceSelect;

interface DeviceSelectProps {
  title: string;
  devices: StatefulDevice[];
  currentDevice: StatefulDevice | undefined;
  setCurrentDevice: (deviceId: string) => Promise<void>;
}
