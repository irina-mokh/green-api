import { useState } from 'react';
import { axiosClient } from '../../utils/axios';
import { useAuth } from '../../utils/hooks';

type ChatPanelProps = {
  id: string,
};

export const ChatPanel = ({ id }: ChatPanelProps) => {
  const [msg, setMsg] = useState('');

  const [idInstance, apiTokenInstance] = useAuth();

  const sendMessage = () => {
    axiosClient
      .post(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        chatId: id,
        message: msg,
      })
      .then(() => {
        setMsg('');
      });
  };

  return (
    <footer className="chat-panel">
      <input
        className="input chat-panel__input"
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.ctrlKey) {
            sendMessage();
          }
        }}
        placeholder="Enter your message"
      ></input>
      <button className="send-btn" onClick={sendMessage} aria-label="send message"></button>
    </footer>
  );
};
