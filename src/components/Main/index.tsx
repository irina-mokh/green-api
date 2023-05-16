import { axiosClient } from '../../utils/axios';
import { useAuth } from '../../utils/hooks';
import { Chat } from '../Chat';
import { CreateChat } from '../CreateChat';
import { useEffect, useState } from 'react';

type ChatType = {
  id: string,
  archive?: boolean,
};

export const Main = () => {
  const [activeChat, setActiveChat] = useState<string>('');

  const [chats, setChats] = useState<ChatType[]>([]);

  const createChat = (tel: string) => {
    setChats([
      ...chats,
      {
        id: tel,
      },
    ]);
  };

  const [idInstance, apiTokenInstance] = useAuth();

  const getChats = () => {
    console.log('get chats...');
    if (chats.length === 0) {
      axiosClient.get(`/waInstance${idInstance}/getChats/${apiTokenInstance}`).then((res) => {
        console.log(res);
        setChats(res.data);
      });
    }
  };

  useEffect(() => {
    getChats();
  }, [idInstance]);

  const chatElems = chats.map((chat) => (
    <li
      className={`chat-thmb ${activeChat === chat.id ? 'chat-thmb_active' : ''}`}
      key={chat.id}
      onClick={() => setActiveChat(chat.id)}
    >
      +{chat.id.slice(0, -5)}
    </li>
  ));

  return (
    <main className="main">
      <h2 className="visually-hidden">Chat page</h2>
      <nav className="main__bar">
        <h3 className="visually-hidden">Chat list</h3>
        <CreateChat addChat={createChat}></CreateChat>
        <div className="main__chat-list">
          <ul>{chatElems}</ul>
        </div>
      </nav>
      <Chat id={activeChat} />
    </main>
  );
};
