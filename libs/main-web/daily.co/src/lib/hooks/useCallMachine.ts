/**
 * Call Machine hook
 * --
 * Manages the overaching state of a Daily call, including
 * error handling, preAuth, joining, leaving etc.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
// daily.co
import DailyIframe, {
  DailyCall,
  DailyEvent,
  DailyEventObject,
  DailyRoomInfo,
} from '@daily-co/daily-js';
// enums
import { CALL_STATE, ACCESS_STATE, MEETING_STATE } from '../enums';

export const useCallMachine = ({
  domain,
  room,
  token,
  subscribeToTracksAutomatically = true,
}: UseCallMachineProps) => {
  const [daily, setDaily] = useState<DailyCall | null>(null);
  const [callState, setCallState] = useState<CALL_STATE>(CALL_STATE.READY);
  const [redirectOnLeave, setRedirectOnLeave] = useState(false);

  const url: string = useMemo(
    () => `https://${domain}.daily.co/${room}`,
    [domain, room]
  );

  /**
   * Check whether we show the lobby screen, need to knock or
   * can head straight to the call. These parameters are set using
   * `enable_knocking` and `enable_prejoin_ui` when creating the room
   * @param co – Daily call object
   */
  const prejoinUIEnabled = async (co: DailyCall) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const dailyRoomInfo: DailyRoomInfo = await co.room();
    const { access } = co.accessState();

    const prejoinEnabled =
      dailyRoomInfo?.config?.enable_prejoin_ui === null
        ? !!dailyRoomInfo?.domainConfig?.enable_prejoin_ui
        : !!dailyRoomInfo?.config?.enable_prejoin_ui;

    const knockingEnabled = !!dailyRoomInfo?.config?.enable_knocking;

    return (
      prejoinEnabled ||
      (access !== ACCESS_STATE.UNKNOWN &&
        access?.level === ACCESS_STATE.LOBBY &&
        knockingEnabled)
    );
  };

  // ─── Callback ───────────────────────────────────────────────────────────────────

  /**
   * Joins call (with the token, if applicable)
   */
  const join = useCallback(
    async (callObject: DailyCall) => {
      await callObject.join({ subscribeToTracksAutomatically, token, url });
    },
    [token, subscribeToTracksAutomatically, url]
  );

  /**
   * PreAuth checks whether we have access or need to knock
   */
  const preAuth = useCallback(
    async (co: DailyCall) => {
      const { access } = await co.preAuth({
        subscribeToTracksAutomatically,
        token,
        url,
      });

      // Private room and no `token` was passed
      if (
        access === ACCESS_STATE.UNKNOWN ||
        access?.level === ACCESS_STATE.NONE
      ) {
        return;
      }

      // Either `enable_knocking_ui` or `enable_prejoin_ui` is set to `true`
      if (
        access?.level === ACCESS_STATE.LOBBY ||
        (await prejoinUIEnabled(co))
      ) {
        setCallState(CALL_STATE.LOBBY);
        return;
      }

      // Public room or private room with passed `token` and `enable_prejoin_ui` is `false`
      join(co);
    },
    [join, subscribeToTracksAutomatically, token, url]
  );

  /**
   * Leave call
   */
  const leave = useCallback(() => {
    if (!daily) return;
    // If we're in the error state, we've already "left", so just clean up
    if (callState === CALL_STATE.ERROR) {
      daily.destroy();
    } else {
      daily.leave();
    }
  }, [callState, daily]);

  /**
   * Listen for access state updates
   */
  const handleAccessStateUpdated = useCallback(
    async ({ access }: DailyEventObject) => {
      if (!daily) return;

      console.log(`🔑 Access level: ${access?.level}`);

      /**
       * Ignore initial access-state-updated event
       */
      if (
        [CALL_STATE.ENDED, CALL_STATE.AWAITING_ARGS, CALL_STATE.READY].includes(
          callState
        )
      ) {
        return;
      }

      if (
        access === ACCESS_STATE.UNKNOWN ||
        access?.level === ACCESS_STATE.NONE
      ) {
        setCallState(CALL_STATE.NOT_ALLOWED);
        return;
      }

      const meetingState = daily.meetingState();
      if (
        access?.level === ACCESS_STATE.LOBBY &&
        meetingState === MEETING_STATE.JOINED
      ) {
        // Already joined, no need to call join(daily) again.
        return;
      }

      /**
       * 'full' access, we can now join the meeting.
       */
      join(daily);
    },
    [daily, callState, join]
  );

  // ─── Effect ─────────────────────────────────────────────────────────────────────

  /**
   * Instantiate the call object and preauthenticate
   */
  useEffect(() => {
    if (daily || !url || callState !== CALL_STATE.READY) return;

    if (
      // eslint-disable-next-line no-restricted-globals
      location.protocol !== 'https:' &&
      // We want to still allow local development.
      // eslint-disable-next-line no-restricted-globals
      !['localhost'].includes(location.hostname)
    ) {
      setCallState(CALL_STATE.NOT_SECURE);
      return;
    }

    console.log('🚀 Creating call object');

    const co = DailyIframe.createCallObject({
      url,
      dailyConfig: {
        experimentalChromeVideoMuteLightOff: true,
        useDevicePreferenceCookies: true,
      },
    });

    setDaily(co);
    preAuth(co);
  }, [daily, url, preAuth, callState]);

  /**
   * Listen for changes in the participant's access state
   */
  useEffect(() => {
    if (!daily) return;

    daily.on('access-state-updated', handleAccessStateUpdated);
    return () => {
      daily.off('access-state-updated', handleAccessStateUpdated);
    };
  }, [daily, handleAccessStateUpdated]);

  /**
   * Listen for and manage call state
   */
  useEffect(() => {
    if (!daily) return;

    const events: readonly DailyEvent[] = [
      'joined-meeting',
      'joining-meeting',
      'left-meeting',
      'error',
    ] as const;

    const handleMeetingState = async (ev: DailyEventObject) => {
      const { access } = daily.accessState();

      switch (ev.action) {
        /**
         * Don't transition to 'joining' or 'joined' UI as long as access is not 'full'.
         * This means a request to join a private room is not granted, yet.
         * Technically in requesting for access, the participant is already known
         * to the room, but not joined, yet.
         */
        case 'joining-meeting':
          if (
            access === ACCESS_STATE.UNKNOWN ||
            access.level === ACCESS_STATE.NONE ||
            access.level === ACCESS_STATE.LOBBY
          ) {
            return;
          }
          setCallState(CALL_STATE.JOINING);
          break;
        case 'joined-meeting':
          if (
            access === ACCESS_STATE.UNKNOWN ||
            access.level === ACCESS_STATE.NONE ||
            access.level === ACCESS_STATE.LOBBY
          ) {
            return;
          }
          setCallState(CALL_STATE.JOINED);
          break;
        case 'left-meeting':
          daily.destroy();
          setCallState(
            !redirectOnLeave ? CALL_STATE.ENDED : CALL_STATE.REDIRECTING
          );
          break;
        case 'error':
          switch (ev?.error?.type) {
            case 'nbf-room':
            case 'nbf-token':
              daily.destroy();
              setCallState(CALL_STATE.NOT_BEFORE);
              break;
            case 'exp-room':
            case 'exp-token':
              daily.destroy();
              setCallState(CALL_STATE.EXPIRED);
              break;
            case 'ejected':
              daily.destroy();
              setCallState(CALL_STATE.REMOVED);
              break;
            default:
              switch (ev?.errorMsg) {
                case 'Join request rejected':
                  // Join request to a private room was denied. We can end here.
                  setCallState(CALL_STATE.LOBBY);
                  daily.leave();
                  break;
                case 'Meeting has ended':
                  // Meeting has ended or participant was removed by an owner.
                  daily.destroy();
                  setCallState(CALL_STATE.ENDED);
                  break;
                case 'Meeting is full':
                  daily.destroy();
                  setCallState(CALL_STATE.FULL);
                  break;
                case "The meeting you're trying to join does not exist.":
                  daily.destroy();
                  setCallState(CALL_STATE.NOT_FOUND);
                  break;
                case 'You are not allowed to join this meeting':
                  daily.destroy();
                  setCallState(CALL_STATE.NOT_ALLOWED);
                  break;
                default:
                  setCallState(CALL_STATE.ERROR);
                  break;
              }
              break;
          }
          break;
        default:
          break;
      }
    };

    // Listen for changes in state
    events.forEach((event) => daily.on(event, handleMeetingState));

    // Stop listening for changes in state
    return () =>
      events.forEach((event) => daily.off(event, handleMeetingState));
  }, [daily, domain, room, redirectOnLeave]);

  return {
    daily,
    leave,
    setRedirectOnLeave,
    state: useMemo(() => callState, [callState]),
  };
};

interface UseCallMachineProps {
  domain: string;
  room: string;
  token?: string;
  subscribeToTracksAutomatically: boolean;
}
