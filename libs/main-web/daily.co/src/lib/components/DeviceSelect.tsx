import { useMediaDevices } from '../providers';
import Field from './form/Field';
import SelectInput from './SelectInput';

const DeviceSelect: React.FC = () => {
  const {
    cams,
    mics,
    speakers,
    currentCam,
    setCurrentCam,
    currentMic,
    setCurrentMic,
    currentSpeaker,
    setCurrentSpeaker,
  } = useMediaDevices();

  if (!currentCam && !currentMic && !currentSpeaker) {
    return <div>Loading devices...</div>;
  }

  return (
    <>
      <Field label="Select camera:">
        <SelectInput
          onChange={(e) => {
            setCurrentCam(cams[e.target.value]);
          }}
          value={cams.findIndex(
            (cam) => cam.device.deviceId === currentCam?.device.deviceId
          )}
        >
          {cams.map(({ device: { deviceId, label } }, i) => (
            <option key={`cam-${deviceId}`} value={i}>
              {label}
            </option>
          ))}
        </SelectInput>
      </Field>

      <Field label="Select microphone:">
        <SelectInput
          onChange={(e) => {
            setCurrentMic(mics[e.target.value]);
          }}
          value={mics.findIndex(
            (mic) => mic.device.deviceId === currentMic?.device.deviceId
          )}
        >
          {mics.map(({ device: { deviceId, label } }, i) => (
            <option key={`mic-${deviceId}`} value={i}>
              {label}
            </option>
          ))}
        </SelectInput>
      </Field>

      {/**
       * Note: Safari does not support selection audio output devices
       */}
      {speakers.length > 0 && (
        <Field label="Select speakers:">
          <SelectInput
            onChange={(e) => {
              setCurrentSpeaker(speakers[e.target.value]);
            }}
            value={speakers.findIndex(
              (speaker) =>
                speaker.device.deviceId === currentSpeaker?.device.deviceId
            )}
          >
            {speakers.map(({ device: { deviceId, label } }, i) => (
              <option key={`speakers-${deviceId}`} value={i}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
      )}
    </>
  );
};
export default DeviceSelect;
