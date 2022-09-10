import { useEffect, useRef, useState } from 'react';
import { Aside } from './components/Aside';
import { useParticipants } from './contexts/ParticipantsProvider';
import { useUIState } from './contexts/UIStateProvider';
import { useMessageSound } from './hooks/useMessageSound';
import { useChat } from './contexts/ChatProvider';

export const CHAT_ASIDE = 'chat';

export const ChatAside = () => {
  const { showAside, setShowAside } = useUIState();
  const { sendMessage, chatHistory, hasNewMessages, setHasNewMessages } =
    useChat();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { localParticipant } = useParticipants();
  const [newMessage, setNewMessage] = useState('');
  const playMessageSound = useMessageSound();

  const chatWindowRef = useRef<any>();

  useEffect(() => {
    // Clear out any new message notifications if we're showing the chat screen
    if (showAside === CHAT_ASIDE) {
      setHasNewMessages(false);
    }
  }, [showAside, chatHistory.length, setHasNewMessages]);

  useEffect(() => {
    if (hasNewMessages && showAside !== CHAT_ASIDE) {
      playMessageSound();
    }
  }, [playMessageSound, showAside, hasNewMessages]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory?.length]);

  const isLocalUser = (id: string) => id === localParticipant.user_id;

  if (!showAside || showAside !== CHAT_ASIDE) {
    return null;
  }

  return (
    <Aside onClose={() => setShowAside(false)}>
      <div className="messages-container" ref={chatWindowRef}>
        {chatHistory.map((chatItem: any) => (
          <div
            className={
              isLocalUser(chatItem.senderID) ? 'message local' : 'message'
            }
            key={chatItem.id}
          >
            <span className="content">{chatItem.message}</span>
            <span className="sender">{chatItem.sender}</span>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(newMessage);
          setNewMessage('');
        }}
      >
        <footer className="chat-footer">
          <input
            value={newMessage}
            placeholder="Type message here"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="send-button" disabled={!newMessage} type="submit">
            Send
          </button>
        </footer>
      </form>
    </Aside>
  );
};
export default ChatAside;
