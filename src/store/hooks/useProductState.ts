import { FilterParams } from 'src/types';

import {
  clearError,
  clearProduct,
  clearProductsState,
  getFilterParameters,
  getProducts,
  resetProductState,
  setLatestParameters
} from '../slices/productSlice';
import { useAppDispatch, useAppSelector } from '../store';

export const useProductState = () => {
  const {
    dictionaries,
    dictionariesError,
    isParamsLoading,
    isProductsLoading,
    product,
    products,
    productsError,
    lastValidFilters
  } = useAppSelector((state) => state.deposit);

  const dispatch = useAppDispatch();

  const clearFilterParams = () => dispatch(clearProductsState());
  const getFinProducts = (query: string) => dispatch(getProducts(query));
  const setParams = (params: FilterParams) => dispatch(setLatestParameters(params));
  const clearErrors = () => dispatch(clearError());
  const getDictionaries = () => dispatch(getFilterParameters());

  return {
    dictionaries,
    dictionariesError,
    isParamsLoading,
    isProductsLoading,
    product,
    products,
    productsError,
    lastValidFilters,
    clearFilterParams,
    getFinProducts,
    setParams,
    clearErrors,
    getDictionaries,
    resetProduct: () => dispatch(resetProductState()),
    clearProduct: () => dispatch(clearProduct())
  };
};
