import { useEffect, useState, useRef } from 'react';
import { axiosClient } from '../../utils/axios';
import { useAuth } from '../../utils/hooks';
import { Message } from '../Message';
import { MessageType } from '../Message';
type ConversationProps = {
  tel: string,
};

type ReceiptType = {
  receiptId: string,
  body: {
    typeWebhook: string,
    timestamp: string,
    idMessage: string,
    messageData?: {
      typeMessage: string,
      textMessageData?: {
        textMessage: string,
      },
      extendedTextMessageData?: {
        text: string,
      },
    },
  },
};

export const Conversation = ({ tel }: ConversationProps) => {
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const [receipt, setReceipt] = useState<ReceiptType>();
  const [idInstance, apiTokenInstance] = useAuth();

  const getMessages = () => {
    axiosClient
      .post(`/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`, {
        chatId: tel + `@c.us`,
        count: 100,
      })
      .then((res) => {
        setMessages([...res.data]);
      });
  };

  const deleteNotification = () => {
    if (receipt)
      axiosClient
        .delete(
          `waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receipt.receiptId}
			`
        )
        .then(() => {
          console.log('DELETED:' + receipt.receiptId);
          setReceipt(undefined);
        });
  };
  const getNotifications = () => {
    axiosClient
      .get(
        `waInstance${idInstance}/receiveNotification/${apiTokenInstance}
		`
      )
      .then((res) => {
        if (res.data) {
          console.log('RECEIVED:', res);
          setReceipt(res.data);
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
  }, [tel]);

  useEffect(() => {
    if (receipt?.body.messageData) {
      const { idMessage, timestamp, messageData, typeWebhook } = receipt.body;

      let text = '';
      switch (messageData.typeMessage) {
        case 'textMessage':
          text = messageData.textMessageData?.textMessage || '';
          break;
        case 'extendedTextMessage':
          text = messageData.extendedTextMessageData?.text || '';
          break;
      }
      const newMsg = {
        idMessage,
        textMessage: text,
        timestamp,
        type: typeWebhook === 'outgoingMessageReceived' ? 'outgoing' : 'incoming',
      };
      setMessages([...messages, newMsg]);
      deleteNotification();
    }
  }, [receipt?.receiptId]);

  const messagesEndRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    console.log('run scroll');
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const msgsEl = messages
    ?.sort((a, b) => Number(a.timestamp) - Number(b.timestamp))
    .map((msg) => (msg.idMessage ? <Message {...msg} key={msg.idMessage} /> : null));

  return (
    <ul className="conversation">
      {msgsEl}
      <li className="conversation__end" ref={messagesEndRef}></li>
    </ul>
  );
};
