import { AxiosResponse } from 'axios';
import api from './api';

export const checkAuthenticated = async (): Promise<Boolean> => {
  try {
    const res = await api.get('/auth/');
    if (res.data.user) return true;
  } catch (err) {
    console.log('não autorizado', err);
  }
  return false;
};

export const signin = async (email: String, password: String) => {
  const user = { email, password };

  let authorized = false;

  authorized = await api
    .post('/auth/', user)
    .then((res: AxiosResponse) => {
      if (res.data.user) return true;
      return false;
    })
    .catch(function (error) {
      console.log('não autorizado');
      console.log(error);
      return false;
    });
  return authorized;
};

// export default login;
