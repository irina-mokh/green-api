import { useEffect, useState } from 'react';
import UserIcon from '../../assets/icons/User.svg';
import { useAuth } from '../../utils/hooks';
import { axiosClient } from '../../utils/axios';
type UserType = {
  tel: string,
};

export const User = ({ tel }: UserType) => {
  const [idInstance, apiTokenInstance] = useAuth();

  const [avatarUrl, setAvatarUrl] = useState();
  useEffect(() => {
    axiosClient
      .post(`/waInstance${idInstance}/getAvatar/${apiTokenInstance}`, {
        chatId: tel + '@c.us',
      })
      .then((res) => {
        setAvatarUrl(res.data.urlAvatar);
      });
  }, [tel]);
  return (
    <div className="user">
      <div className="user__avatar">
        <img src={avatarUrl || UserIcon} alt={tel + 'avatar'}></img>
      </div>
      <p className="user__tel">{'+' + tel}</p>
    </div>
  );
};
