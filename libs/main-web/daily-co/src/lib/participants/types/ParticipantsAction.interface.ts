import { DailyParticipant } from '@daily-co/daily-js';
import { ParticipantsActionType } from '../enums/ParticipantsActionType.enum';

export interface ParticipantsAction {
  id?: string;
  type: ParticipantsActionType;
  participant: DailyParticipant;
}
