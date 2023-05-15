import { useEffect, useState } from 'react';
import { axiosClient } from '../../utils/axios';
import { useAuth } from '../../utils/hooks';
import { Message } from '../Message';
import { MessageType } from '../Message';
type ConversationProps = {
  tel: string,
};

export const Conversation = ({ tel }: ConversationProps) => {
  const [messages, setMessages] = useState<Array<MessageType>>();
  const [receiptId, setReceipt] = useState('');
  const [idInstance, apiTokenInstance] = useAuth();
  const getMessages = () => {
    axiosClient
      .post(`/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`, {
        chatId: tel + `@c.us`,
        count: 100,
      })
      .then((res) => {
        console.log(res);
        setMessages([...res.data]);
      });
  };

  const deleteNotification = () => {
    axiosClient
      .get(
        `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}
			`
      )
      .then((res) => {
        console.log(res);
      });
  };
  const getNotifications = () => {
    console.log('get notifications ...');
    axiosClient
      .get(
        `waInstance${idInstance}/receiveNotification/${apiTokenInstance}
		`
      )
      .then((res) => {
        console.log(res);
        if (res.data) {
          console.log('RECEIVED!');
          setReceipt(res.data.receiptId);
        }
      });
  };
  useEffect(() => {
    if (tel) getMessages();
  }, [tel]);

  useEffect(() => {
    const int = setInterval(() => {
      if (tel) getNotifications();
    }, 5000);
    return () => clearInterval(int);
  });

  useEffect(() => {
    //TODO: get and push new msg to state
    if (receiptId) deleteNotification();
  }, [receiptId]);

  const msgsEl = messages
    ?.sort((a, b) => Number(a.timestamp) - Number(b.timestamp))
    .map((msg) => <Message {...msg} key={msg.idMessage} />);
  return <ul className="conversation">{msgsEl}</ul>;
};
