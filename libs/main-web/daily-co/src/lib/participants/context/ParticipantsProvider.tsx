import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useNetworkState } from '../../hooks/useNetworkState';
import { useCallState } from '../../context/CallProvider';
import { useUIState } from '../../ui-state/context/UIStateProvider';
import {
  initialParticipantsState,
  isLocalId,
  participantsReducer,
} from './participantsState';
import { DailyEventObject } from '@daily-co/daily-js';
import { ParticipantsActionType } from '../enums/ParticipantsActionType.enum';

export const ParticipantsContext = createContext(null);

export const ParticipantsProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { viewMode } = useUIState();
  const { callObject: daily, videoQuality } = useCallState();
  const [state, dispatch] = useReducer(
    participantsReducer,
    initialParticipantsState
  );
  const [participantMarkedForRemoval, setParticipantMarkedForRemoval] =
    useState(null);

  const threshold = useNetworkState({});

  /**
   * ALL participants (incl. shared screens) in a convenient array
   */
  const allParticipants = useMemo(
    () => [...state.participants, ...state.screens],
    [state?.participants, state?.screens]
  );

  /**
   * Screen shares
   */
  const screens = useMemo(() => state?.screens, [state?.screens]);

  /**
   * The local participant's name
   */
  const username = daily?.participants()?.local?.user_name ?? '';

  /**
   * Sets the local participant's name in daily-js
   * @param name The new username
   */
  const setUsername = useCallback(
    (name: string) => {
      if (!daily) return;
      daily.setUserName(name);
    },
    [daily]
  );

  const handleParticipantJoined = useCallback(() => {
    if (!daily) return;

    dispatch({
      type: ParticipantsActionType.JOINED_MEETING,
      participant: daily.participants().local,
    });
  }, [daily]);

  const handleNewParticipantsState = useCallback(
    (event: DailyEventObject = null) => {
      switch (event?.action) {
        case 'participant-joined':
          dispatch({
            type: ParticipantsActionType.PARTICIPANT_JOINED,
            participant: event.participant,
          });
          if (daily) {
            daily.updateParticipant(event.participant.session_id, {
              setAudio: false,
            });
          }
          break;
        case 'participant-updated':
          dispatch({
            type: ParticipantsActionType.PARTICIPANT_UPDATED,
            participant: event.participant,
          });
          break;
        case 'participant-left':
          dispatch({
            type: ParticipantsActionType.PARTICIPANT_LEFT,
            participant: event.participant,
          });
          break;
      }
    },
    [daily, dispatch]
  );

  useEffect(() => {
    if (!daily) return;

    daily.on('participant-joined', handleParticipantJoined);
    daily.on('participant-joined', handleNewParticipantsState);
    daily.on('participant-updated', handleNewParticipantsState);
    daily.on('participant-left', handleNewParticipantsState);

    return () => {
      daily.off('participant-joined', handleParticipantJoined);
      daily.off('participant-joined', handleNewParticipantsState);
      daily.off('participant-updated', handleNewParticipantsState);
      daily.off('participant-left', handleNewParticipantsState);
    };
  }, [daily, handleNewParticipantsState, handleParticipantJoined]);

  const participantIds = useMemo(
    () => participants.map((p) => p.id).join(','),
    [participants]
  );

  const setBandWidthControls = useCallback(() => {
    if (!(daily && daily.meetingState() === 'joined-meeting')) return;

    const ids = participantIds.split(',').filter(Boolean);
    const receiveSettings = {};

    ids.forEach((id) => {
      if (isLocalId(id)) return;

      if (
        // weak or bad network
        (['low', 'very-low'].includes(threshold) && videoQuality === 'auto') ||
        // Low quality or Bandwidth saver mode enabled
        ['bandwidth-saver', 'low'].includes(videoQuality)
      ) {
        receiveSettings[id] = { video: { layer: 0 } };
        return;
      }

      // Speaker view settings based on speaker status or pinned user
      if (viewMode === 'speaker') {
        if (currentSpeaker?.id === id) {
          receiveSettings[id] = { video: { layer: 2 } };
        } else {
          receiveSettings[id] = { video: { layer: 0 } };
        }
      }

      // Grid view settings are handled separately in GridView
      // Mobile view settings are handled separately in MobileCall
    });

    daily.updateReceiveSettings(receiveSettings);
  }, [daily, participantIds, threshold, videoQuality, viewMode]);

  useEffect(() => {
    setBandWidthControls();
  }, [setBandWidthControls]);

  useEffect(() => {
    if (!daily) return;
    const handleActiveSpeakerChange = ({ activeSpeaker }: DailyEventObject) => {
      /**
       * Ignore active-speaker-change events for the local user.
       * Our UX doesn't ever highlight the local user as the active speaker.
       */
      const localId = daily.participants().local.session_id;
      const activeSpeakerId = activeSpeaker?.peerId;
      if (localId === activeSpeakerId) return;

      dispatch({
        type: ParticipantsActionType.ACTIVE_SPEAKER,
        id: activeSpeakerId,
      });
    };
    daily.on('active-speaker-change', handleActiveSpeakerChange);
    return () => daily.off('active-speaker-change', handleActiveSpeakerChange);
  }, [daily]);

  return (
    <ParticipantsContext.Provider
      value={{
        allParticipants,
        muteNewParticipants,
        participantMarkedForRemoval,
        screens,
        setParticipantMarkedForRemoval,
        setUsername,
        username,
      }}
    >
      {children}
    </ParticipantsContext.Provider>
  );
};

export const useParticipants = () => useContext(ParticipantsContext);
