import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
// daily.co
import { useDaily, useDevices } from '@daily-co/daily-react-hooks';
// enums
import { DEVICE_STATE } from '../enums';
// types
import type { MediaDeviceContextValue } from '../types';

export const MediaDeviceContext = createContext<MediaDeviceContextValue>(
  {} as MediaDeviceContextValue
);

export const MediaDeviceProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  // ─── Hooks ──────────────────────────────────────────────────────────────────────

  const {
    hasCamError,
    cameras,
    camState,
    setCamera,
    hasMicError,
    microphones,
    micState,
    setMicrophone,
    speakers,
    setSpeaker,
    refreshDevices,
  } = useDevices();

  const daily = useDaily();
  const localParticipant = daily?.participants().local;

  // ─── Memo ───────────────────────────────────────────────────────────────────────

  const isCamMuted = useMemo(() => {
    const videoState = localParticipant?.tracks?.video?.state;
    return (
      videoState === DEVICE_STATE.OFF ||
      videoState === DEVICE_STATE.BLOCKED ||
      hasCamError
    );
  }, [hasCamError, localParticipant?.tracks?.video?.state]);

  const isMicMuted = useMemo(() => {
    const audioState = localParticipant?.tracks?.audio?.state;
    return (
      audioState === DEVICE_STATE.OFF ||
      audioState === DEVICE_STATE.BLOCKED ||
      hasMicError
    );
  }, [hasMicError, localParticipant?.tracks?.audio?.state]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <MediaDeviceContext.Provider
      value={{
        isCamMuted,
        isMicMuted,
        camError: hasCamError,
        cams: cameras,
        camState,
        micError: hasMicError,
        mics: microphones,
        micState,
        refreshDevices,
        setCurrentCam: setCamera,
        setCurrentMic: setMicrophone,
        setCurrentSpeaker: setSpeaker,
        speakers,
      }}
    >
      {children}
    </MediaDeviceContext.Provider>
  );
};

export const useMediaDevices = () => useContext(MediaDeviceContext);
