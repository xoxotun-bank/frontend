import { AxiosResponse } from 'axios';
import { UserCredentials } from 'src/types';
import { AuthResponse } from 'src/types/response/response';

import { $api } from './axios';

export const authorize = (userCredentials: UserCredentials): Promise<AxiosResponse<AuthResponse>> =>
  $api.post<AuthResponse>(`${process.env.AUTH_SERVICE_URL}/login`, userCredentials);

export const refreshTokens = (): Promise<AxiosResponse<AuthResponse>> => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return Promise.reject(new Error('Refresh token not found'));
  }

  return $api.post<AuthResponse>(`${process.env.AUTH_SERVICE_URL}/refresh`, { refreshToken });
};

export const authout = (): Promise<void> => $api.post(`${process.env.AUTH_SERVICE_URL}/logout`);
