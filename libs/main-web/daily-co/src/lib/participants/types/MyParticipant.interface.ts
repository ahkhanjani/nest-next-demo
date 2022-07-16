export interface MyParticipant {
  camMutedByHost?: boolean;
  hasNameSet?: boolean | null;
  id: string;
  isActiveSpeaker: boolean;
  isCamMuted: boolean;
  isLoading: boolean;
  isLocal: boolean;
  isMicMuted: boolean;
  isOwner: boolean;
  isRecording: boolean;
  isScreenshare: boolean;
  lastActiveDate?: Date | null;
  micMutedByHost?: boolean;
  name: string;
  sessionId: string;
}
