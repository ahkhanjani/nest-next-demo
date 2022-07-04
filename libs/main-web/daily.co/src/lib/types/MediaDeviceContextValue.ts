// daily.co
import type { StatefulDevice } from '@daily-co/daily-react-hooks';
import type { GeneralState } from './GeneralState';

export interface MediaDeviceContextValue {
  isCamMuted: boolean;
  isMicMuted: boolean;
  camError: boolean;
  cams: StatefulDevice[];
  camState: GeneralState;
  micError: boolean;
  mics: StatefulDevice[];
  micState: GeneralState;
  refreshDevices: () => Promise<void>;
  currentCam?: StatefulDevice;
  setCurrentCam: (deviceId: string) => Promise<void>;
  currentMic?: StatefulDevice;
  setCurrentMic: (deviceId: string) => Promise<void>;
  currentSpeaker?: StatefulDevice;
  setCurrentSpeaker: (deviceId: string) => Promise<void>;
  speakers: StatefulDevice[];
}
