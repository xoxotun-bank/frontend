import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getClient, getPaymentsTable } from 'src/api/ClientService';
import { ClientData, Payment } from 'src/types';
import { GetPaymentsTableRequest } from 'src/types/requests/GetPaymentsTable';

import { errorConst } from 'src/shared/constants';
import { createQueryAllRequired } from 'src/utils';

interface ClientState {
  passport: string;
  step: number;
  identity: boolean;
  client: ClientData | null;
  isSearching: boolean;
  isLoadingPayments: boolean;
  payments: Payment[] | null;
  error: string | null;
  isNewClient: boolean | null;
}

const initialState: ClientState = {
  passport: '',
  step: 0,
  identity: false,
  client: null,
  isSearching: false,
  error: null,
  isNewClient: null,
  payments: null,
  isLoadingPayments: true
};

export const searchClient = createAsyncThunk('client/searchClient', (passport: string, { rejectWithValue }) => {
  return getClient(passport)
    .then((res) => res.data)
    .catch((error: AxiosError) => rejectWithValue(error.response?.status));
});

export const getPayments = createAsyncThunk(
  'client/getPayments',
  (params: GetPaymentsTableRequest, { rejectWithValue }) => {
    const query = createQueryAllRequired(params);
    return getPaymentsTable(query)
      .then(({ data }) => data.payments)
      .catch((error: AxiosError) => rejectWithValue(error.response?.status));
  }
);

const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    resetState: () => initialState,
    resetPassport(state) {
      state.passport = initialState.passport;
    },
    resetClient(state) {
      state.client = initialState.client;
    },
    resetStep(state) {
      state.step = initialState.step;
    },
    resetError(state) {
      state.error = initialState.error;
    },
    resetIdentity(state) {
      state.identity = initialState.identity;
    },
    setPassport(state, action: PayloadAction<string>) {
      state.passport = action.payload;
    },
    setClient(state, action: PayloadAction<ClientData>) {
      state.client = {
        ...action.payload
      };
    },
    approveClient(state) {
      state.step = 1;
    },
    rejectClient(state) {
      state.step = 0;
    },
    setStep(state, action: PayloadAction<number>) {
      const newStep = action.payload;
      state.step = newStep;
    },
    undoStep(state) {
      state.step -= 1;
    },
    setIdentity(state, action: PayloadAction<boolean>) {
      state.identity = action.payload;
    },
    setIsNewClient(state, action: PayloadAction<boolean>) {
      state.isNewClient = action.payload;
    },
    clearPayments(state) {
      state.payments = initialState.payments;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchClient.pending, (state) => {
      state.isSearching = true;
    });

    builder.addCase(searchClient.fulfilled, (state, action) => {
      state.client = { ...action.payload };
      state.isSearching = false;
    });

    builder.addCase(searchClient.rejected, (state, action) => {
      state.isSearching = false;
      const errorStatus = action.payload;

      if (errorStatus === 500) {
        state.error = errorConst.SERVER_500;
        return;
      } else if (errorStatus === 404) {
        state.error = errorConst.CLIENT_NOT_FOUND;
        return;
      }

      state.client = null;
    });

    builder.addCase(getPayments.pending, (state) => {
      state.isLoadingPayments = true;
    });

    builder.addCase(getPayments.fulfilled, (state, action) => {
      state.payments = action.payload;
      state.isLoadingPayments = false;
    });
  }
});

export default clientSlice.reducer;

export const {
  approveClient,
  rejectClient,
  resetClient,
  setStep,
  setPassport,
  resetState,
  resetError,
  setIdentity,
  resetIdentity,
  setClient,
  setIsNewClient,
  clearPayments
} = clientSlice.actions;
