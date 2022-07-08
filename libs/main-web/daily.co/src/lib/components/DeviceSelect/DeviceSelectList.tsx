// providers
import { useMediaDevices } from '../../providers';
// cmp
import DeviceSelect from './DeviceSelect';

export const DeviceSelectList: React.FC = () => {
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
    return (
      <p className="tw-prose tw-prose-lg dark:tw-prose-invert ">
        Loading devices...
      </p>
    );
  }

  return (
    <>
      {/* camera */}
      <DeviceSelect
        title="Select camera:"
        devices={cams}
        currentDevice={currentCam}
        setCurrentDevice={setCurrentCam}
      />

      {/* microphone */}
      <DeviceSelect
        title="Select microphone:"
        devices={mics}
        currentDevice={currentMic}
        setCurrentDevice={setCurrentMic}
      />

      {/* speakers */}
      {/* Note: Safari does not support selection audio output devices */}
      <DeviceSelect
        title="Select speakers:"
        devices={speakers}
        currentDevice={currentSpeaker}
        setCurrentDevice={setCurrentSpeaker}
      />
    </>
  );
};
export default DeviceSelectList;
