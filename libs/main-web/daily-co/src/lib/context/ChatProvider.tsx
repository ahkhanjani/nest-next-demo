import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { nanoid } from 'nanoid';
// daily.co
import { DailyEventObject } from '@daily-co/daily-js';
// providers
import { useCallState } from './CallProvider';
// hooks
import { useSharedState } from '../hooks/useSharedState';
// types
import type { ChatContextValue } from '../types';

export const ChatContext = createContext<ChatContextValue>(
  {} as ChatContextValue
);

export const ChatProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // ─── State ──────────────────────────────────────────────────────────────────────

  const { callObject } = useCallState();
  const { sharedState, setSharedState } = useSharedState({
    initialValues: {
      chatHistory: [],
    },
    broadcast: false,
  });
  const [hasNewMessages, setHasNewMessages] = useState<boolean>(false);

  // ─── Callback ───────────────────────────────────────────────────────────────────

  const handleNewMessage = useCallback(
    (e: DailyEventObject) => {
      if (!callObject || e?.data?.message?.type) return;
      const participants = callObject.participants();
      const sender = participants[e.fromId].user_name
        ? participants[e.fromId].user_name
        : 'Guest';

      setSharedState((values: any) => ({
        ...values,
        chatHistory: [
          ...values.chatHistory,
          // nanoid - we use it to generate unique ID string
          { sender, senderID: e.fromId, message: e.data.message, id: nanoid() },
        ],
      }));

      setHasNewMessages(true);
    },
    [callObject, setSharedState]
  );

  const sendMessage = useCallback(
    (message: string) => {
      if (!callObject) return;

      console.log('💬 Sending app message');

      callObject.sendAppMessage({ message }, '*');

      const participants = callObject.participants();
      // Get the sender (local participant) name
      const sender = participants.local.user_name
        ? participants.local.user_name
        : 'Guest';
      const senderID = participants.local.user_id;

      // Update shared state chat history
      return setSharedState((values: any) => ({
        ...values,
        chatHistory: [
          ...values.chatHistory,
          // nanoid - we use it to generate unique ID string
          { sender, senderID, message, id: nanoid() },
        ],
      }));
    },
    [callObject, setSharedState]
  );

  // ─── Effect ─────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!callObject) return;

    console.log(`💬 Chat provider listening for app messages`);

    callObject.on('app-message', handleNewMessage);

    return () => {
      callObject.off('app-message', handleNewMessage);
    };
  }, [callObject, handleNewMessage]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <ChatContext.Provider
      value={{
        sendMessage,
        chatHistory: sharedState.chatHistory,
        hasNewMessages,
        setHasNewMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
