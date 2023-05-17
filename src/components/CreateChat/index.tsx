import React, { useState } from 'react';
import { axiosClient } from '../../utils/axios';
import { useAuth } from '../../utils/hooks';
type CreateChatProps = {
  addChat: (data: string) => void,
};

export const CreateChat = ({ addChat }: CreateChatProps) => {
  const [tel, setTel] = useState('');

  const [idInstance, apiTokenInstance] = useAuth();

  const handleCreateChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axiosClient
      .post(
        `waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}
		`,
        {
          phoneNumber: tel,
        }
      )
      .then((res) => {
        if (res.data.existsWhatsapp) {
          addChat(tel);
        } else {
          alert('No whatsapp on this number');
        }
        setTel('');
      });
  };

  return (
    <form className="create-chat">
      <label>Enter phone number:</label>
      <input
        className="input"
        type="text"
        placeholder="XXXXXXXXXX"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
      ></input>
      <button
        className="btn"
        onClick={handleCreateChat}
        disabled={!tel || tel.length < 11}
        area-aria-label="add chat"
      >
        Add chat
      </button>
    </form>
  );
};
