import { DailyParticipant } from '@daily-co/daily-js';
import {
  participantsReducer,
  initialParticipantsState,
  getNewParticipant,
  getScreenId,
} from '../../participants/context/participantsState';
// enums
import { ParticipantsActionType } from '../../participants/enums/ParticipantsActionType.enum';
// types
import type { ParticipantsState } from '../../participants/types/ParticipantsState.interface';

const mockInitialParticipantsState = () => initialParticipantsState;
const dailyParticipantMock: DailyParticipant = {
  user_id: 'id1',
  owner: false,
  audio: true,
  screen: true,
  ...expect.any(Object),
};
const mockMyParticipant = (id?: string) =>
  getNewParticipant(
    id ? { ...dailyParticipantMock, user_id: id } : dailyParticipantMock
  );

describe('participantsState', () => {
  describe('participantsReducer', () => {
    describe('should handle different action types', () => {
      let initialParticipantsStateMock: ParticipantsState;

      beforeEach(() => {
        initialParticipantsStateMock = mockInitialParticipantsState();
      });

      it('participant-joined', () => {
        const myParticipantMock = mockMyParticipant();

        expect(
          participantsReducer(initialParticipantsStateMock, {
            type: ParticipantsActionType.PARTICIPANT_JOINED,
            participant: dailyParticipantMock,
          })
        ).toBe<ParticipantsState>({
          ...initialParticipantsState,
          participants: [myParticipantMock],
          screens: [{ id: getScreenId(myParticipantMock.id) }],
        });
      });

      describe('participant-updated', () => {
        const prevStateMock: ParticipantsState = {
          participants: [mockMyParticipant('id1'), mockMyParticipant('id2')],
          screens: [{ id: getScreenId('id1') }, { id: getScreenId('id2') }],
        };

        it('when state has not changed, should return previous state', () => {
          expect(
            participantsReducer(initialParticipantsStateMock, {
              type: ParticipantsActionType.PARTICIPANT_UPDATED,
              participant: dailyParticipantMock,
            })
          ).toBe<ParticipantsState>(prevStateMock);
        });

        it('when state has changed, should return new state', () => {
          expect(
            participantsReducer(initialParticipantsStateMock, {
              type: ParticipantsActionType.PARTICIPANT_UPDATED,
              participant: dailyParticipantMock,
            })
          ).toBe<ParticipantsState>({
            ...prevStateMock,
            screens: [{ id: getScreenId('id2') }, { id: getScreenId('id1') }],
          });
        });
      });
    });
  });
});
