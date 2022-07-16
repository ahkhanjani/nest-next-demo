import {
  participantsReducer,
  initialParticipantsState,
  getNewParticipant,
} from '../../lib/participants/context/participantsState';
// enums
import { ParticipantsActionType } from '../../lib/participants/enums/ParticipantsActionType.enum';
// types
import type { ParticipantsState } from '../../lib/participants/types/ParticipantsState.interface';

const mockInitialParticipantsState = () => initialParticipantsState;

describe('participantsState', () => {
  describe('participantsReducer', () => {
    describe('should handle different action types', () => {
      let initialParticipantsStateMock: ParticipantsState;

      beforeEach(() => {
        initialParticipantsStateMock = mockInitialParticipantsState();
      });

      it('participant-joined', () => {
        const participantMock = getNewParticipant({});
        expect(
          participantsReducer(initialParticipantsStateMock, {
            type: ParticipantsActionType.PARTICIPANT_JOINED,
            participant: expect.anything(),
          })
        ).toBe<ParticipantsState>({
          ...initialParticipantsState,
          lastPendingUnknownActiveSpeaker: null,
        });
      });

      it('participant-updated', () => {
        expect(
          participantsReducer(initialParticipantsStateMock, {
            type: ParticipantsActionType.PARTICIPANT_UPDATED,
            participant: expect.anything(),
          })
        ).toBe<ParticipantsState>({
          ...initialParticipantsState,
          lastPendingUnknownActiveSpeaker: null,
        });
      });
    });
  });
});
