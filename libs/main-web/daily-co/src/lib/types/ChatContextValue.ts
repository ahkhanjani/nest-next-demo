import type { Dispatch, SetStateAction } from 'react';

export interface ChatContextValue {
  sendMessage: (message: string) => void;
  chatHistory: any;
  hasNewMessages: boolean;
  setHasNewMessages: Dispatch<SetStateAction<boolean>>;
}
