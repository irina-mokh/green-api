import { ChatPanel } from '../ChatPanel';
import { Conversation } from '../Conversation';

type ChatProps = {
  id: string,
};

export const Chat = ({ id }: ChatProps) => {
  return (
    <section className="chat">
      <header className="chat__header">
        <h3>{id ? '+' + id.slice(0, -5) : 'Select a chat'}</h3>
      </header>
      <main className="chat__wrapper">
        <Conversation id={id} />
      </main>
      <ChatPanel id={id} />
    </section>
  );
};
