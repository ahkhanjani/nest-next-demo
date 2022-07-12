/**
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
import { useRouter } from 'next/router';
// daily.co
import { DailyRoomInfo } from '@daily-co/daily-js';
import { DailyProvider } from '@daily-co/daily-react-hooks';
// hooks
import { useCallMachine, useNetworkState } from '../hooks';
// enums
import { VIDEO_QUALITY } from '../enums';
// types
import type { Bandwidth, CallContextValue } from '../types';

export const CallContext = createContext<CallContextValue>(
  {} as CallContextValue
);

export const CallProvider: React.FC<PropsWithChildren<CallProviderProps>> = ({
  children,
  domain,
  room,
  token = '',
  subscribeToTracksAutomatically,
}) => {
  const router = useRouter();

  // ─── State ──────────────────────────────────────────────────────────────────────

  const [roomInfo, setRoomInfo] = useState<DailyRoomInfo | null>(null);
  const [enableJoinSound, setEnableJoinSound] = useState<boolean>(true);
  const [videoQuality, setVideoQuality] = useState<VIDEO_QUALITY>(
    VIDEO_QUALITY.AUTO
  );
  const [showLocalVideo, setShowLocalVideo] = useState<boolean>(true);

  // ─── Hooks ──────────────────────────────────────────────────────────────────────

  // Daily CallMachine hook (primarily handles status of the call)
  const { daily, leave, state, setRedirectOnLeave } = useCallMachine({
    domain,
    room,
    token,
    subscribeToTracksAutomatically,
  });
  const networkState = useNetworkState({ co: daily, quality: videoQuality });

  // ─── Callback ───────────────────────────────────────────────────────────────────

  // Convenience wrapper for changing the bandwidth of the client
  const setBandwidth = useCallback(
    (quality: Bandwidth) => {
      if (!daily) return;
      daily.setBandwidth(quality);
    },
    [daily]
  );

  // ─── Effect ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!daily) return;

    daily.on('joined-meeting', () => router.replace(`/${room}`));

    return () => {
      daily.off('joined-meeting', () => router.replace(`/${room}`));
    };
  }, [daily, room, router]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <CallContext.Provider
      value={{
        state,
        callObject: daily,
        leave,
        networkState,
        showLocalVideo,
        enableJoinSound,
        videoQuality,
        subscribeToTracksAutomatically,
        setVideoQuality,
        roomInfo,
        setRoomInfo,
        setBandwidth,
        setRedirectOnLeave,
        setShowLocalVideo,
        setEnableJoinSound,
      }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
      <DailyProvider callObject={daily!}>{children}</DailyProvider>
    </CallContext.Provider>
  );
};

export const useCallState = () => useContext(CallContext);

interface CallProviderProps {
  domain: string;
  room: string;
  token?: string;
  subscribeToTracksAutomatically: boolean;
}
