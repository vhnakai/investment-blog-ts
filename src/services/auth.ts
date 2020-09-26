import { AxiosResponse } from 'axios';
import api from './api';
// import jwt_decode from 'jwt-decode';

export const checkAuthenticated = async (): Promise<Boolean> => {
  try {
    const res = await api.get('/auth/user');
    if (res.data.user) return true;
  } catch (err) {
    console.log('não autorizado', err);
  }
  console.log('não autorizado');
  return await refreshToken(); //Try to refresh the token in case the access-token is expired
};

export const refreshToken = async (): Promise<Boolean> => {
  try {
    const res = await api.get('/auth/refresh');
    if (res.data.success) return true;
  } catch (err) {
    console.log('não autorizado', err);
  }
  return false;
};

export const auth = async (email: String, password: String) => {
  const user = { email, password };

  let authorized = false;

  authorized = await api
    .post('/auth/login', user)
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

export default auth;
