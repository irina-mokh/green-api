export const useAuth = () => {
  const idInstance = localStorage.getItem('idInstance') || '';

  const apiTokenInstance = localStorage.getItem('apiTokenInstance') || '';

  return [idInstance, apiTokenInstance];
};
