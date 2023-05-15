import React, { useState } from 'react';
type CreateChatProps = {
  addChat: (data: string) => void,
};

export const CreateChat = ({ addChat }: CreateChatProps) => {
  const [tel, setTel] = useState('');

  const handleCreateChat = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addChat(tel);
    setTel('');
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
      <button className="btn" onClick={handleCreateChat} disabled={!tel || tel.length < 11}>
        Add chat
      </button>
    </form>
  );
};
