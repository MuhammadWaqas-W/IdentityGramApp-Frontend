import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { apiGetRequest, apiPostRequest } from '@next/helpers';
import { endpoints } from '@config';
import { setLocalStorage, removeLocalStorage, getLocalStorage } from '@utils';

export const login = createAsyncThunk(
  '/login',
  async ({ email, password }: { email: string; password: string }) => {
    return await apiPostRequest(endpoints.authLogin, { email, password }).then(
      (res) => Promise.resolve(res),
    );
  },
);

export const loginInWithToken = createAsyncThunk(
  '/loginWithToken',
  async () => {
    return await apiGetRequest(endpoints.silentLogin).then((res) =>
      Promise.resolve(res),
    );
  },
);

const isValidToken = (accessToken: any) => {
  if (!accessToken) {
    return false;
  }
  const decoded: any = jwtDecode(accessToken);
  const currentTime: any = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (accessToken: any) => {
  if (accessToken) {
    setLocalStorage('accessToken', accessToken);
  } else {
    removeLocalStorage('accessToken');
  }
};

export const isAuthenticated = () => !!getLocalStorage('accessToken');

export const handleAuthentication = () => {
  let accessToken = getLocalStorage('accessToken');
  if (!accessToken) {
    return;
  }
  if (isValidToken(accessToken)) {
    setSession(accessToken);
  } else {
    setSession(null);
  }
};

export const setAxiosInterceptors = ({ onLogout }: { onLogout: any }) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        setSession(null);
        if (onLogout) {
          onLogout();
        }
        return Promise.reject(error?.response?.data?.message);
      } else if (
        error?.response?.status == 400 ||
        error?.response?.status == 404 ||
        error?.response?.status == 409 ||
        error?.response?.status == 403
      ) {
        return Promise.reject(error?.response?.data?.message);
      } else {
        return Promise.reject(
          error?.response?.data?.message || 'Something Went Wrong',
        );
      }
    },
  );
};
