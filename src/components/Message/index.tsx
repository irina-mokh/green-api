export type MessageType = {
  idMessage: string,
  textMessage: string,
  timestamp: string,
  type: string,
};

export const Message = ({ textMessage, type, timestamp }: MessageType) => {
  const date = new Date(+timestamp * 1000);

  return (
    <li className={`msg ${type === 'outgoing' ? 'msg_out' : 'msg_in'}`}>
      <p>{textMessage}</p>
      <p className="msg__time">{date.toTimeString().split(' ')[0].slice(0, 5)}</p>
    </li>
  );
};
