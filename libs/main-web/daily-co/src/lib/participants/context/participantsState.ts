import fasteq from 'fast-deep-equal';
// daily.co
import { DailyParticipant } from '@daily-co/daily-js';
// context
import { MAX_RECENT_SPEAKER_COUNT } from '../../context/TracksProvider';
// enums
import { ParticipantsActionType } from '../enums/ParticipantsActionType.enum';
// types
import type { ParticipantsAction } from '../types/ParticipantsAction.interface';
import type { MyParticipant } from '../types/MyParticipant.interface';
import type { ParticipantsState } from '../types/ParticipantsState.interface';

const initialParticipantsState: ParticipantsState = {
  lastPendingUnknownActiveSpeaker: null,
  participants: [
    {
      camMutedByHost: false,
      hasNameSet: false,
      id: 'local',
      isActiveSpeaker: false,
      isCamMuted: false,
      isLoading: true,
      isLocal: true,
      isMicMuted: false,
      isOwner: false,
      isRecording: false,
      isScreenshare: false,
      lastActiveDate: undefined,
      micMutedByHost: false,
      name: '',
      sessionId: '',
    },
  ],
  screens: [],
};

// ─── Reducer ────────────────────────────────────────────────────────────────────

const participantsReducer = (
  prevState: typeof initialParticipantsState,
  action: ParticipantsAction
) => {
  switch (action.type) {
    case ParticipantsActionType.ACTIVE_SPEAKER: {
      const { participants, ...state } = prevState;
      if (!action.id)
        return {
          ...prevState,
          lastPendingUnknownActiveSpeaker: null,
        };
      const date = new Date();
      const isParticipantKnown = participants.some((p) => p.id === action.id);
      return {
        ...state,
        lastPendingUnknownActiveSpeaker: isParticipantKnown
          ? null
          : {
              date,
              id: action.id,
            },
        participants: participants.map((p) => ({
          ...p,
          isActiveSpeaker: p.id === action.id,
          lastActiveDate: p.id === action.id ? date : p?.lastActiveDate,
        })),
      };
    }
    case ParticipantsActionType.JOINED_MEETING: {
      const localItem = getNewParticipant(action.participant);

      const participants = [...prevState.participants].map((p) =>
        p.isLocal ? localItem : p
      );

      return {
        ...prevState,
        participants,
      };
    }
    case ParticipantsActionType.PARTICIPANT_JOINED: {
      const item = getNewParticipant(action.participant);

      const participants = [...prevState.participants];
      const screens = [...prevState.screens];

      const isPendingActiveSpeaker =
        item.id === prevState.lastPendingUnknownActiveSpeaker?.id;
      if (isPendingActiveSpeaker) {
        item.isActiveSpeaker = true;
        item.lastActiveDate = prevState.lastPendingUnknownActiveSpeaker?.date;
      }

      if (item.isCamMuted) {
        participants.push(item);
      } else {
        const firstInactiveCamOffIndex = prevState.participants.findIndex(
          (p) => p.isCamMuted && !p.isLocal && !p.isActiveSpeaker
        );
        if (firstInactiveCamOffIndex >= 0) {
          participants.splice(firstInactiveCamOffIndex, 0, item);
        } else {
          participants.push(item);
        }
      }

      // Mark new participant as active speaker, for quicker audio subscription
      if (
        !item.isMicMuted &&
        participants.length <= MAX_RECENT_SPEAKER_COUNT + 1 // + 1 for local participant
      ) {
        item.lastActiveDate = new Date();
      }

      // Participant is sharing screen
      if (action.participant.screen) {
        screens.push(getScreenItem(action.participant));
      }

      return {
        ...prevState,
        lastPendingUnknownActiveSpeaker: isPendingActiveSpeaker
          ? null
          : prevState.lastPendingUnknownActiveSpeaker,
        participants,
        screens,
      };
    }
    case ParticipantsActionType.PARTICIPANT_UPDATED: {
      const item = getUpdatedParticipant(
        action.participant,
        prevState.participants
      );
      const { id } = item;
      const screenId = getScreenId(id);

      const participants = [...prevState.participants];
      const idx = participants.findIndex((p) => p.id === id);
      if (!item.isMicMuted && participants[idx].isMicMuted) {
        // Participant unmuted mic
        item.lastActiveDate = new Date();
      }
      participants[idx] = item;

      const screens = [...prevState.screens];
      const screenIdx = screens.findIndex((s) => s.id === screenId);

      if (action.participant.screen) {
        const screenItem = getScreenItem(action.participant);
        if (screenIdx >= 0) {
          screens[screenIdx] = screenItem;
        } else {
          screens.push(screenItem);
        }
      } else if (screenIdx >= 0) {
        screens.splice(screenIdx, 1);
      }

      const newState = {
        ...prevState,
        participants,
        screens,
      };

      if (fasteq(newState, prevState)) {
        return prevState;
      }

      return newState;
    }
    case ParticipantsActionType.PARTICIPANT_LEFT: {
      const id = getId(action.participant);
      const screenId = getScreenId(id);

      return {
        ...prevState,
        participants: [...prevState.participants].filter((p) => p.id !== id),
        screens: [...prevState.screens].filter((s) => s.id !== screenId),
      };
    }
    default:
      throw new Error();
  }
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

function getNewParticipant(participant: DailyParticipant): MyParticipant {
  const id = getId(participant);

  const { local } = participant;
  const { audio, video } = participant.tracks;

  return {
    camMutedByHost: video?.off?.byRemoteRequest,
    hasNameSet: !!participant.user_name,
    id,
    isActiveSpeaker: false,
    isCamMuted: video?.state === 'off' || video?.state === 'blocked',
    isLoading: audio?.state === 'loading' || video?.state === 'loading',
    isLocal: local,
    isMicMuted: audio?.state === 'off' || audio?.state === 'blocked',
    isOwner: !!participant.owner,
    isRecording: !!participant.record,
    isScreenshare: false,
    lastActiveDate: undefined,
    micMutedByHost: audio?.off?.byRemoteRequest,
    name: participant.user_name,
    sessionId: participant.session_id,
  };
}

function getUpdatedParticipant(
  participant: DailyParticipant,
  participants: MyParticipant[]
) {
  const id = getId(participant);
  const prevItem = participants.find((p) => p.id === id);

  // In case we haven't set up this participant, yet.
  if (!prevItem) return getNewParticipant(participant);

  const { local } = participant;
  const { audio, video } = participant.tracks;

  return {
    ...prevItem,
    camMutedByHost: video?.off?.byRemoteRequest,
    hasNameSet: Boolean(participant.user_name),
    id,
    isCamMuted: video?.state === 'off' || video?.state === 'blocked',
    isLoading: audio?.state === 'loading' || video?.state === 'loading',
    isLocal: local,
    isMicMuted: audio?.state === 'off' || audio?.state === 'blocked',
    isOwner: Boolean(participant.owner),
    isRecording: Boolean(participant.record),
    micMutedByHost: audio?.off?.byRemoteRequest,
    name: participant.user_name,
    sessionId: participant.session_id,
  };
}

function getScreenItem(participant: DailyParticipant) {
  const id = getId(participant);
  return {
    hasNameSet: null,
    id: getScreenId(id),
    isLoading: false,
    isLocal: participant.local,
    isScreenshare: true,
    lastActiveDate: null,
    name: participant.user_name,
    sessionId: participant.session_id,
  };
}

// ─── Derived Data ───────────────────────────────────────────────────────────────

function getId(participant: DailyParticipant): string {
  return participant.local ? 'local' : participant.session_id;
}

function getScreenId(id: string): string {
  return `${id}-screen`;
}

function isLocalId(id: string): boolean {
  return id === 'local';
}

function isScreenId(id: string): boolean {
  return id.endsWith('-screen');
}

// ────────────────────────────────────────────────────────────────────────────────

export {
  getId,
  getScreenId,
  initialParticipantsState,
  isLocalId,
  isScreenId,
  participantsReducer,
};
