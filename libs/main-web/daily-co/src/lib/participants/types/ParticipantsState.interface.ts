import type { MyParticipant } from './MyParticipant.interface';

export interface ParticipantsState {
  participants: MyParticipant[];
  screens: { id: string }[];
}
