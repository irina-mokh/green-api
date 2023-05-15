import { Chat } from '../Chat';
import { CreateChat } from '../CreateChat';
import { useState } from 'react';

export const Main = () => {
  const [activeChat, setActiveChat] = useState<string>('');

  const [chats, setChats] = useState<string[]>([]);

  const createChat = (tel: string) => {
    setChats([...chats, tel]);
  };

  const chatElems = chats.map((tel) => (
    <li
      className={`chat-thmb ${activeChat === tel ? 'chat-thmb_active' : ''}`}
      key={tel}
      onClick={() => setActiveChat(tel)}
    >
      +{tel}
    </li>
  ));

  return (
    <main className="main">
      <h2 className="visually-hidden">Chat page</h2>
      <nav className="main__chat-list">
        <h3 className="visually-hidden">Chat list</h3>
        <CreateChat addChat={createChat}></CreateChat>
        <ul>{chatElems}</ul>
      </nav>
      <Chat tel={activeChat} />
    </main>
  );
};
