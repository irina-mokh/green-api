import { useState } from 'react';
import sentIcon from '../../assets/icons/Send.svg';
import { axiosClient } from '../../utils/axios';
import { useAuth } from '../../utils/hooks';

type ChatPanelProps = {
  tel: string,
};

export const ChatPanel = ({ tel }: ChatPanelProps) => {
  const [msg, setMsg] = useState('');

  const [idInstance, apiTokenInstance] = useAuth();

  const sendMessage = () => {
    axiosClient
      .post(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        chatId: tel + `@c.us`,
        message: msg,
      })
      .then((res) => {
        console.log(res);
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
        placeholder="Enter your message"
      ></input>
      <img className="icon" src={sentIcon} onClick={sendMessage} />
    </footer>
  );
};
