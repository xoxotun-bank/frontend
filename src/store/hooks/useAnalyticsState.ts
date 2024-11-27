import { AnalyticsParams } from 'src/types/Analytics';
import { ConfirmedDeposit } from 'src/types/requests/ConfirmedDeposit';

import {
  getAnalytics,
  getDictionaries,
  postAnalytics,
  setCity,
  setCurrency,
  setEndDate,
  setPeriod,
  setStartDate
} from '../slices/analyticsSlice';
import { useAppDispatch, useAppSelector } from '../store';

export const useAnalyticsState = () => {
  const isLoadingAnalytics = useAppSelector((store) => store.analytics.isLoadingAnalytics);
  const isLoadingDictionaries = useAppSelector((store) => store.analytics.isLoadingDictionaries);
  const data = useAppSelector((store) => store.analytics.data);
  const params = useAppSelector((store) => store.analytics.params);
  const dictionaries = useAppSelector((store) => store.analytics.dictonaries);
  const analyticsError = useAppSelector((store) => store.analytics.analyticsError);
  const dictionariesError = useAppSelector((store) => store.analytics.dictionariesError);

  const dispatch = useAppDispatch();

  return {
    isLoadingAnalytics,
    isLoadingDictionaries,
    data,
    params,
    dictionaries,
    analyticsError,
    dictionariesError,
    getAnalytics: (params: AnalyticsParams) => dispatch(getAnalytics(params)),
    getDictionaries: () => dispatch(getDictionaries()),
    setCity: (city: string) => dispatch(setCity(city)),
    setCurrency: (currency: string) => dispatch(setCurrency(currency)),
    setPeriod: (period: string) => dispatch(setPeriod(period)),
    setStartDate: (date: string | null) => dispatch(setStartDate(date)),
    setEndDate: (date: string | null) => dispatch(setEndDate(date)),
    postAnalytics: (params: ConfirmedDeposit) => dispatch(postAnalytics(params))
  };
};
