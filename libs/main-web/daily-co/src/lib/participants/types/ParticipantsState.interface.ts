import type { MyParticipant } from './MyParticipant.interface';

export interface ParticipantsState {
  lastPendingUnknownActiveSpeaker: {
    date: Date;
    id: string;
  } | null;
  participants: MyParticipant[];
  screens: { id: string }[];
}
