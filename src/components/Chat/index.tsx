import { ChatPanel } from '../ChatPanel';
import { Conversation } from '../Conversation';
import { User } from '../User';

type ChatProps = {
  id: string,
};

export const Chat = ({ id }: ChatProps) => {
  return (
    <section className="chat">
      <header className="chat__header">
        {id ? <User tel={id.slice(0, -5)} /> : <h3>Select a chat</h3>}
      </header>
      <main className="chat__wrapper">
        <Conversation id={id} />
      </main>
      <ChatPanel id={id} />
    </section>
  );
};
