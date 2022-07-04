import type { Dispatch, SetStateAction } from 'react';
// daily.co
import type { DailyCall, DailyRoomInfo } from '@daily-co/daily-js';
// enums
import { CALL_STATE, VIDEO_QUALITY } from '../enums';
// others
import type { Bandwidth } from './Bandwidth';

export interface CallContextValue {
  state: CALL_STATE;
  callObject: DailyCall | null;
  leave: () => void;
  networkState: string;
  showLocalVideo: boolean;
  enableJoinSound: boolean;
  videoQuality: VIDEO_QUALITY;
  subscribeToTracksAutomatically: boolean;
  setVideoQuality: Dispatch<SetStateAction<VIDEO_QUALITY>>;
  roomInfo: DailyRoomInfo | null;
  setRoomInfo: Dispatch<SetStateAction<DailyRoomInfo | null>>;
  setBandwidth: (quality: Bandwidth) => void;
  setRedirectOnLeave: Dispatch<SetStateAction<boolean>>;
  setShowLocalVideo: Dispatch<SetStateAction<boolean>>;
  setEnableJoinSound: Dispatch<SetStateAction<boolean>>;
}
