import { ChatPanel } from '../ChatPanel';
import { Conversation } from '../Conversation';

type ChatProps = {
  tel: string,
};

export const Chat = ({ tel }: ChatProps) => {
  return (
    <section className="chat">
      <header className="chat__header">
        <h3>{tel ? '+' + tel : 'Select a chat'}</h3>
      </header>
      <main className="chat__wrapper">
        <Conversation tel={tel} />
      </main>
      <ChatPanel tel={tel} />
    </section>
  );
};
