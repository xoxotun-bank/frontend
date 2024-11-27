import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  getAnalytics as getAnalyticsData,
  getAnalyticsDictionaries,
  postConfirmedDeposit
} from 'src/api/AnalyticsService';
import { Analytics, AnalyticsDictionaries, AnalyticsParams } from 'src/types/Analytics';
import { ConfirmedDeposit } from 'src/types/requests/ConfirmedDeposit';

import { analyticsPageConst } from 'src/shared/constants/localeConstants';

interface AnalyticsState {
  data: Analytics | null;
  params: AnalyticsParams | null;
  dictonaries: AnalyticsDictionaries | null;
  isLoadingAnalytics: boolean;
  isLoadingDictionaries: boolean;
  dictionariesError: string | null;
  analyticsError: string | null;
}

const initialState: AnalyticsState = {
  data: null,
  params: null,
  dictonaries: null,
  isLoadingAnalytics: true,
  isLoadingDictionaries: true,
  dictionariesError: null,
  analyticsError: null
};

export const getAnalytics = createAsyncThunk(
  'analytics/getAnalytics',
  (params: AnalyticsParams, { rejectWithValue }) => {
    return getAnalyticsData({ ...params })
      .then((res) => res.data)
      .catch((error: AxiosError) => rejectWithValue(error.response?.status));
  }
);

export const postAnalytics = createAsyncThunk(
  'analytics/postAnalytics',
  (params: ConfirmedDeposit, { rejectWithValue }) =>
    postConfirmedDeposit({ ...params })
      .then((res) => res.data)
      .catch((error) => rejectWithValue(error))
);

export const getDictionaries = createAsyncThunk('analytics/getDictionaries', (_, { rejectWithValue }) => {
  return getAnalyticsDictionaries()
    .then((res) => res.data)
    .catch((error: AxiosError) => rejectWithValue(error.response?.status));
});

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    resetState: () => initialState,
    setAnalyticsData(state, action: PayloadAction<Analytics>) {
      state.data = {
        ...action.payload
      };
    },
    setPeriod: (state, action: PayloadAction<string>) => {
      if (state.params) {
        if (state.params.period === analyticsPageConst.PERIOD.CUSTOM) {
          state.params.startDate = null;
          state.params.endDate = null;
        }
        state.params.period = action.payload;
      }
    },
    setCity: (state, action: PayloadAction<string>) => {
      if (state.params) {
        state.params.city = action.payload;
      }
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      if (state.params) {
        state.params.currency = action.payload;
      }
    },
    setStartDate: (state, action: PayloadAction<string | null>) => {
      if (state.params) {
        state.params.startDate = action.payload;
      }
    },
    setEndDate: (state, action: PayloadAction<string | null>) => {
      if (state.params) {
        state.params.endDate = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAnalytics.pending, (state) => {
      state.isLoadingAnalytics = true;
      state.analyticsError = null;
    });
    builder.addCase(getAnalytics.fulfilled, (state, action) => {
      state.data = {
        ...action.payload
      };
      state.isLoadingAnalytics = false;
      state.analyticsError = null;
    });
    builder.addCase(getAnalytics.rejected, (state, action) => {
      state.isLoadingAnalytics = false;
      state.analyticsError = String(action.payload);
    });

    builder.addCase(getDictionaries.pending, (state) => {
      state.isLoadingDictionaries = true;
      state.dictionariesError = null;
    });
    builder.addCase(getDictionaries.fulfilled, (state, action) => {
      state.dictonaries = {
        ...action.payload
      };

      const { cities, currencies, periods } = action.payload;
      state.params = {
        city: cities[0],
        currency: currencies[0],
        period: periods[0],
        startDate: null,
        endDate: null
      };
      state.isLoadingDictionaries = false;
      state.dictionariesError = null;
    });
    builder.addCase(getDictionaries.rejected, (state, action) => {
      state.isLoadingDictionaries = false;
      state.dictionariesError = String(action.payload);
    });
  }
});

export const { resetState, setCurrency, setCity, setPeriod, setStartDate, setEndDate } = analyticsSlice.actions;

export default analyticsSlice.reducer;
