import { registerEnumType } from '@nestjs/graphql';

export enum SessionState {
  INCOMING = 'incoming',
  COMPLETE = 'complete',
  CANCELLED = 'cancelled',
  DELETED = 'deleted',
}

registerEnumType(SessionState, {
  name: 'SessionState',
});
