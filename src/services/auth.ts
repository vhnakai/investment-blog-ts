import { AxiosResponse } from 'axios';
import api from './api';
import jwt_decode from 'jwt-decode';

interface Headers {
  'Content-type': String;
  'access-token': String;
}

export const isAuthenticated = (): Boolean => {
  //Check if access token exists
  const accessToken = localStorage.getItem('@investment-blog/access-token');
  if (accessToken === null) return false;

  try {
    //Check if access token can be decoded
    const accessDecoded: any = jwt_decode(accessToken);
    if (accessDecoded === null) return false;

    //Check expiration time
    const { exp } = accessDecoded;
    if (Date.now() >= exp * 1000) {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

export const refreshToken = (): Boolean => {
  const accessToken = localStorage.getItem('@investment-blog/access-token');
  const refreshToken = localStorage.getItem('@investment-blog/refresh-token');
  console.log(accessToken);
  console.log(refreshToken);
  return false;
};

export const getHeaders = (): Headers => {
  const accessToken = localStorage.getItem('@investment-blog/access-token');
  const headers: Headers = {
    'Content-type': 'application/json',
    'access-token': accessToken !== null ? accessToken.toString() : '',
  };
  return headers;
};

export const auth = async (email: String, password: String) => {
  const user = { email, password };

  let authorized = false;

  authorized = await api
    .post('/auth/login', user)
    .then((res: AxiosResponse) => {
      localStorage.setItem(
        '@investment-blog/access-token',
        res.data.accessToken,
      );
      localStorage.setItem(
        '@investment-blog/refresh-token',
        res.data.refreshToken,
      );
      // console.log('autorizado');
      // console.log(res);
      return true;
      // window.location.href = '/';
    })
    .catch(function (error) {
      // console.log('não autorizado');
      // console.log(error);
      return false;
    });
  return authorized;
};

export default auth;
