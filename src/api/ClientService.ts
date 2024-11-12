import { AxiosResponse } from 'axios';
import { ClientData, PaymentsTable } from 'src/types';
import { FilterParamsResponse, FinProductResponse } from 'src/types/response';

import { $api, getCachedHeaders, saveCacheHeaders } from './axios';

export const getClient = (passport: string): Promise<AxiosResponse<ClientData>> =>
  $api.get(`${process.env.CLIENT_SERVICE_URL}/clients?passport=${passport}`);

export const getFinProducts = (query: string): Promise<AxiosResponse<FinProductResponse>> =>
  $api.get(`${process.env.CALCULATOR_SERVICE_URL}/financial-products` + query);

export const getFilterParams = (): Promise<AxiosResponse<FilterParamsResponse>> => {
  const { etag, lastModified } = getCachedHeaders();

  const headers: Record<string, string> = {
    ...(etag && { 'If-None-Match': etag }),
    ...(lastModified && { 'If-Modified-Since': lastModified })
  };

  return $api.get(`${process.env.CLIENT_SERVICE_URL}/dictionaries`, { headers }).then((response) => {
    if (response.status === 200) {
      saveCacheHeaders(response.headers.Etag, response.headers['Last-modified']);
    }
    return response;
  });
};

export const getPaymentsTable = (query: string): Promise<AxiosResponse<PaymentsTable>> => {
  return $api.get(`${process.env.CALCULATOR_SERVICE_URL}/payments-tables?${query}`);
};
