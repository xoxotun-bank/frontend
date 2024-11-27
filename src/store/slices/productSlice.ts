import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { getFilterParams, getFinProducts } from 'src/api';
import { FilterParams, Product } from 'src/types';
import { FilterParamsResponse, FinProductResponse } from 'src/types/response';

interface ProductState {
  product: Product | null;
  products: FinProductResponse | null;
  dictionaries: FilterParamsResponse | null;
  lastPickedParameters: FilterParams | null;
  isProductsLoading: boolean;
  isParamsLoading: boolean;
  dictionariesError: boolean;
  productsError: boolean;
  lastValidFilters: FilterParams | null;
}

const initialState: ProductState = {
  product: null,
  products: null,
  dictionaries: null,
  lastPickedParameters: null,
  isProductsLoading: true,
  isParamsLoading: true,
  dictionariesError: false,
  productsError: false,
  lastValidFilters: null
};

const depositSlice = createSlice({
  name: 'deposit',
  initialState,
  reducers: {
    resetProductState: () => initialState,
    setProduct: (state, { payload }) => {
      state.product = payload;
    },
    clearProduct: (state) => {
      state.product = null;
    },
    setParams: (state, { payload }: PayloadAction<FilterParamsResponse>) => {
      state.dictionaries = { ...payload };
      state.isParamsLoading = false;
    },
    clearParams: (state) => {
      state.dictionaries = null;
    },
    setProducts: (state, { payload }: PayloadAction<FinProductResponse>) => {
      state.products = payload;
      state.isProductsLoading = false;
      state.productsError = false;
    },
    clearProducts: (state) => {
      state.products = null;
    },
    clearError: (state) => {
      state.productsError = false;
      state.dictionariesError = false;
    },
    setLatestParameters: (state, { payload }: PayloadAction<FilterParams>) => {
      state.lastPickedParameters = payload;
    },
    clearProductsState: (state) => {
      state.product = null;
      state.lastPickedParameters = null;
      state.lastValidFilters = null;
      state.productsError = false;
      state.products = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFilterParameters.pending, (state) => {
      state.isParamsLoading = true;
    });

    builder.addCase(getFilterParameters.fulfilled, (state, { payload }: PayloadAction<FilterParamsResponse>) => {
      state.isParamsLoading = false;
      state.dictionaries = payload;
      state.dictionariesError = false;
    });

    builder.addCase(getFilterParameters.rejected, (state, { payload }) => {
      state.isParamsLoading = false;
      if (payload === 404) state.dictionariesError = true;
    });

    builder.addCase(getProducts.pending, (state) => {
      state.isProductsLoading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isProductsLoading = false;
      state.products = payload;
      state.productsError = false;
      state.lastValidFilters = state.lastPickedParameters;
    });

    builder.addCase(getProducts.rejected, (state, { payload }) => {
      state.isProductsLoading = false;
      const errorStatus = String(payload);
      if (errorStatus.startsWith('4')) {
        state.productsError = true;
      }
    });
  }
});

export const getFilterParameters = createAsyncThunk('dictionaries/searchDictionaries', (_, { rejectWithValue }) => {
  return getFilterParams()
    .then(({ data }) => data)
    .catch((error: AxiosError) => rejectWithValue(error.response?.status));
});

export const getProducts = createAsyncThunk(
  '/financial-products/searchFinProducst',
  (query: string, { rejectWithValue }) => {
    return getFinProducts(query)
      .then(({ data }) => data)
      .catch((error: AxiosError) => rejectWithValue(error.response?.status));
  }
);

export const { setProduct, setLatestParameters, clearProduct, clearError, clearProductsState, resetProductState } =
  depositSlice.actions;
export default depositSlice.reducer;
