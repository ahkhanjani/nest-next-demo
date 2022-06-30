/**
 * Call Provider / Context
 * ---
 * Configures the general state of a Daily call, such as which features
 * to enable, as well as instantiate the 'call machine' hook responsible
 * for the overaching call loop (joining, leaving, etc)
 */
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import DailyIframe, { DailyRoomInfo } from '@daily-co/daily-js';
import { DailyProvider } from '@daily-co/daily-react-hooks';
import Bowser from 'bowser';
import { useRouter } from 'next/router';
import { ACCESS_STATE } from './enums/access-state.enum';
import { VIDEO_QUALITY } from './enums/video-quality.enum';
import { useNetworkState } from '../hooks/useNetworkState';
import { useCallMachine } from './useCallMachine';

export const CallContext = createContext<unknown>({} as unknown);

export const CallProvider: React.FC<PropsWithChildren<CallProviderProps>> = ({
  children,
  domain,
  room,
  token = '',
  subscribeToTracksAutomatically = true,
  cleanURLOnJoin = false,
}) => {
  const router = useRouter();
  const [roomInfo, setRoomInfo] = useState<DailyRoomInfo | null>(null);
  const [enableScreenShare, setEnableScreenShare] = useState<
    boolean | undefined
  >(false);
  const [enableJoinSound, setEnableJoinSound] = useState<boolean>(true);
  const [videoQuality, setVideoQuality] = useState<VIDEO_QUALITY>(
    VIDEO_QUALITY.AUTO
  );
  const [showLocalVideo, setShowLocalVideo] = useState<boolean>(true);
  const [preJoinNonAuthorized, setPreJoinNonAuthorized] =
    useState<boolean>(false);
  const [enableRecording, setEnableRecording] = useState<
    string | null | undefined
  >(null);
  const [startCloudRecording, setStartCloudRecording] =
    useState<boolean>(false);
  const [roomExp, setRoomExp] = useState<number | null>(null);

  // Daily CallMachine hook (primarily handles status of the call)
  const { daily, leave, state, setRedirectOnLeave } = useCallMachine({
    domain,
    room,
    token,
    subscribeToTracksAutomatically,
  });
  const networkState = useNetworkState(daily, videoQuality);

  // Feature detection taken from daily room object and client browser support
  useEffect(() => {
    if (!daily) return;
    const updateRoomConfigState = async () => {
      const roomConfig: DailyRoomInfo = await daily.room();

      const isOob = !!roomConfig.config.owner_only_broadcast;
      const owner = roomConfig.tokenConfig.is_owner;
      const config = roomConfig.config;

      setRoomInfo(roomConfig);

      const fullUI = !isOob || (isOob && owner);

      if (!config) return;

      if (config.exp) {
        setRoomExp(config.exp * 1000 || Date.now() + 1 * 60 * 1000);
      }
      const browser = Bowser.parse(window.navigator.userAgent);
      const recordingType =
        roomConfig?.tokenConfig?.enable_recording ??
        roomConfig?.config?.enable_recording;

      // Mobile and Safari recordings are only supported under the 'cloud-beta' type
      const supportsRecording =
        ((browser.platform.type !== 'desktop' ||
          browser.engine.name !== 'Blink') &&
          recordingType === 'cloud-beta') ||
        (browser.platform.type === 'desktop' &&
          browser.engine.name === 'Blink');
      if (supportsRecording) {
        setEnableRecording(recordingType);
        setStartCloudRecording(
          roomConfig?.tokenConfig?.start_cloud_recording ?? false
        );
      }
      setEnableScreenShare(
        fullUI &&
          (roomConfig?.tokenConfig?.enable_screenshare ??
            roomConfig?.config?.enable_screenshare) &&
          DailyIframe.supportedBrowser().supportsScreenShare
      );
    };
    updateRoomConfigState();
  }, [state, daily]);

  // Convience wrapper for adding a fake participant to the call
  const addFakeParticipant = useCallback(() => {
    daily.addFakeParticipant();
  }, [daily]);

  // Convenience wrapper for changing the bandwidth of the client
  const setBandwidth = useCallback(
    (quality: Bandwidth) => {
      daily.setBandwidth(quality);
    },
    [daily]
  );

  useEffect(() => {
    if (!daily) return;

    const { access } = daily.accessState();
    if (access === ACCESS_STATE.UNKNOWN) return;

    const requiresPermission = access?.level === ACCESS_STATE.LOBBY;
    setPreJoinNonAuthorized(requiresPermission && !token);
  }, [state, daily, token]);

  useEffect(() => {
    if (!daily) return;

    if (cleanURLOnJoin) {
      daily.on('joined-meeting', () => router.replace(`/${room}`));
    }

    return () => {
      daily.off('joined-meeting', () => router.replace(`/${room}`));
    };
  }, [cleanURLOnJoin, daily, room, router]);

  return (
    <CallContext.Provider
      value={{
        state,
        callObject: daily,
        addFakeParticipant,
        preJoinNonAuthorized,
        leave,
        networkState,
        showLocalVideo,
        roomExp,
        enableRecording,
        enableScreenShare,
        enableJoinSound,
        videoQuality,
        setVideoQuality,
        roomInfo,
        setRoomInfo,
        setBandwidth,
        setRedirectOnLeave,
        setShowLocalVideo,
        setEnableScreenShare,
        startCloudRecording,
        subscribeToTracksAutomatically,
        setEnableJoinSound,
      }}
    >
      <DailyProvider callObject={daily}>{children}</DailyProvider>
    </CallContext.Provider>
  );
};

export const useCallState = (): any => useContext(CallContext);

interface CallProviderProps {
  domain: string;
  room: string;
  token?: string;
  subscribeToTracksAutomatically?: boolean;
  cleanURLOnJoin?: boolean;
}

interface Bandwidth {
  kbs?: number | 'NO_CAP' | null | undefined;
  trackConstraints?: MediaTrackConstraints | undefined;
}
