import { SerializedError } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { logoutUser, resetState as resetClientState, resetProductState } from 'src/store';

export const $api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export const saveCacheHeaders = (etag: string | null, lastModified: string | null) => {
  if (etag) localStorage.setItem('etag', etag);
  if (lastModified) localStorage.setItem('lastModified', lastModified);
};

export const getCachedHeaders = () => {
  return {
    etag: localStorage.getItem('etag'),
    lastModified: localStorage.getItem('lastModified')
  };
};

$api.interceptors.request.use((config) => {
  if (config && config.url) {
    if (!config.url.includes('/login') && !config.url.includes('/refresh')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    }
  }
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const { default: store } = await import('src/store/store');

    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      if (originalRequest.url.includes('/refresh')) return Promise.reject(error);

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        return Promise.reject(new Error('Refresh token not found'));
      }

      originalRequest._isRetry = true;

      return $api
        .post(`${process.env.AUTH_SERVICE_URL}/refresh`, { refreshToken })
        .then((res) => {
          const { accessToken, refreshToken } = res.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          return $api.request(originalRequest);
        })
        .catch((e: AxiosError) => {
          if (e.response?.status == 401) {
            store.dispatch(logoutUser());
            store.dispatch(resetClientState());
            store.dispatch(resetProductState());
            localStorage.removeItem('refresh-token');
            localStorage.removeItem('access-token');
            window.location.replace('/auth');
          }
        });
    } else {
      return Promise.reject(error);
    }
  }
);

export interface SerializedAxiosError<T> extends SerializedError {
  message: string;
  code?: string;
  status?: number;
  data?: T;
}

export const serializeAxiosError = <T>(error: AxiosError<T>): SerializedAxiosError<T> => {
  return {
    message: error.message,
    code: error.code,
    status: error.response?.status,
    data: error.response?.data
  };
};
