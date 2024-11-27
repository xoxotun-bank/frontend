import { ClientData, Product } from 'src/types';

import { depositCardConst } from 'src/shared/constants';

import {
  clearPayments,
  getPayments,
  resetClient,
  resetError,
  resetState,
  searchClient,
  setClient,
  setIdentity,
  setIsNewClient,
  setPassport,
  setStep
} from '../slices/clientSlice';
import { useAppDispatch, useAppSelector } from '../store';

export const useClientState = () => {
  const step = useAppSelector((store) => store.client.step);
  const identity = useAppSelector((store) => store.client.identity);
  const client = useAppSelector((store) => store.client.client);
  const error = useAppSelector((store) => store.client.error);
  const clientStateError = useAppSelector((store) => store.client.error);
  const clientPassport = useAppSelector((store) => store.client.passport);
  const isSearchingClient = useAppSelector((store) => store.client.isSearching);
  const isNewClient = useAppSelector((store) => store.client.isNewClient);
  const isLoadingPayments = useAppSelector((store) => store.client.isLoadingPayments);
  const payments = useAppSelector((store) => store.client.payments);

  const dispatch = useAppDispatch();

  const undoStep = () => {
    switch (step) {
      case 1:
        dispatch(resetState());
        break;
      case 2:
        dispatch(setStep(1));
        break;
      default:
        break;
    }
  };

  const continueWithClientType = () => {
    dispatch(resetClient());
    dispatch(setStep(1));
  };

  const applyClient = () => {
    dispatch(setIdentity(true));
    dispatch(setStep(1));
  };

  const applyClientCard = () => {
    dispatch(setIdentity(true));
  };

  const rejectClient = () => {
    dispatch(resetClient());
  };

  const goToNextClient = () => {
    dispatch(resetState());
  };

  const getPaymentsTable = (product: Product, sum: number) => {
    const { financialProduct } = product;
    const { capitalizationPeriod, capitalizationToSameAccount, percent, period } = financialProduct;

    const paymentsTableNeeded =
      capitalizationToSameAccount === false && capitalizationPeriod !== depositCardConst.END_OF_THE_TERM;

    paymentsTableNeeded &&
      dispatch(
        getPayments({
          capitalizationPeriod,
          capitalizationToSameAccount,
          percent,
          period,
          sum
        })
      );
  };

  const setNewClient = (value: boolean) => dispatch(setIsNewClient(value));

  const setClientData = (client: ClientData) => dispatch(setClient(client));

  return {
    step,
    identity,
    client,
    error,
    clientStateError,
    clientPassport,
    isSearchingClient,
    isNewClient,
    isLoadingPayments,
    payments,

    resetState: () => dispatch(resetState()),
    setPassport: (passport: string) => {
      dispatch(setPassport(passport));
      dispatch(resetError());
    },
    clearPayments: () => dispatch(clearPayments()),

    searchClient: (passport: string) => dispatch(searchClient(passport)),
    getPaymentsTable,

    undoStep,
    continueWithClientType,
    applyClient,
    applyClientCard,
    rejectClient,
    goToNextClient,
    setClientData,
    setNewClient
  };
};
