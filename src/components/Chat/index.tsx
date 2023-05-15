type ChatProps = {
  tel: string,
};

export const Chat = ({ tel }: ChatProps) => {
  return (
    <section className="chat">
      <header className="chat__header">
        <h3>{tel}</h3>
      </header>
    </section>
  );
};
