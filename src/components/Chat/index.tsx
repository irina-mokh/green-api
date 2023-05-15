import { ChatPanel } from '../ChatPanel';
import { Conversation } from '../Conversation';

type ChatProps = {
  tel: string,
};

export const Chat = ({ tel }: ChatProps) => {
  return (
    <section className="chat">
      <header className="chat__header">
        <h3>+{tel}</h3>
      </header>
      <Conversation tel={tel} />
      <ChatPanel tel={tel} />
    </section>
  );
};
