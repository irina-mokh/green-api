import { useForm, SubmitHandler } from 'react-hook-form';
import { axiosClient } from '../../utils/axios';

export type LoginType = {
  idInstance: string,
  apiTokenInstance: string,
};

type LoginFormProps = {
  setAuth: (data: LoginType) => void,
};

export const LoginForm = ({ setAuth }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<LoginType>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    const { idInstance, apiTokenInstance } = data;
    axiosClient.get(`/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`).then(
      (response) => {
        if (response.status >= 200 && response.status <= 299) {
          setAuth({ idInstance, apiTokenInstance });
          localStorage.setItem('idInstance', idInstance);
          localStorage.setItem('apiTokenInstance', apiTokenInstance);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <main className="container">
      <h2>Login GREEN API</h2>
      <form className="login" onSubmit={handleSubmit(onSubmit)}>
        <label className="login__label" htmlFor="idInstance">
          Your idInstance:
        </label>
        <input
          type="text"
          id="idInstance"
          placeholder="1234567890"
          className="input login__input"
          {...register('idInstance', { required: true })}
        />
        <label className="login__label" htmlFor="apiTokenInstance">
          Your apiTokenInstance:
        </label>
        <input
          type="text"
          id="apiTokenInstance"
          placeholder="1839869857644db38315b421c2ffud04d4475e4c71974c989a"
          className="input login__input"
          {...register('apiTokenInstance', { required: true })}
        />
        <button type="submit" className="btn login__submit" disabled={!isDirty || !isValid}>
          Login
        </button>
      </form>
    </main>
  );
};
