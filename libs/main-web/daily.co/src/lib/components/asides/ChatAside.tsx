import { useEffect, useRef, useState } from 'react';
// providers
import { useChat } from '../../providers/ChatProvider';
// styles
import styles from './ChatAside.module.scss';

const ChatAside: React.FC = () => {
  const { sendMessage, chatHistory } = useChat();
  const [newMessage, setNewMessage] = useState('');

  const chatWindowRef = useRef<any>();

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatHistory?.length]);

  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <div className={styles['messages-container']} ref={chatWindowRef}>
        {chatHistory.map((chatItem: any) => (
          <div className={styles['message']} key={chatItem.id}>
            <span className={styles['content']}>{chatItem.message}</span>
            <span className={styles['sender']}>{chatItem.sender}</span>
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
    </>
  );
};
export default ChatAside;
