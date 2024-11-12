// import { AxiosResponse } from 'axios';
// import { Analytics, AnalyticsDictionaries, AnalyticsRequest } from 'src/types/Analytics';
// import { ConfirmedDeposit } from 'src/types/requests/ConfirmedDeposit';

// import { createAnalyticsQuery } from 'src/utils/Mappers';

// import { $api } from './axios';

// export const getAnalytics = (params: AnalyticsRequest): Promise<AxiosResponse<Analytics>> => {
//   const query = createAnalyticsQuery(params);
//   return $api.get(`${process.env.ANALYTICS_SERVICE_URL}/selected-products?${query}`);
// };

// export const getAnalyticsDictionaries = (): Promise<AxiosResponse<AnalyticsDictionaries>> => {
//   return $api.get(`${process.env.ANALYTICS_SERVICE_URL}/dictionaries`);
// };

// export const getAnalyticsCSV = (query: string): Promise<AxiosResponse<Blob>> => {
//   return $api.get(`${process.env.ANALYTICS_SERVICE_URL}/export-statistics?${query}`, {
//     responseType: 'blob'
//   });
// };

// export const postConfirmedDeposit = (params: ConfirmedDeposit) =>
//   $api.post(`${process.env.ANALYTICS_SERVICE_URL}/selected-products`, params);
