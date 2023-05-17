import { Chat } from '../Chat';
import { CreateChat } from '../CreateChat';
import { useState } from 'react';
import { User } from '../User';

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
        id: tel + '@c.us',
      },
    ]);
  };

  const chatElems = chats.map((chat) => (
    <li
      className={`chat-thmb ${activeChat === chat.id ? 'chat-thmb_active' : ''}`}
      key={chat.id}
      onClick={() => setActiveChat(chat.id)}
    >
      <User tel={chat.id.slice(0, -5)} />
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
