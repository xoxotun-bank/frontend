import React from 'react';
import { Navigate } from 'react-router-dom';

import { Stack } from '@mui/material';
import ClientCard from 'pages/products/confirmation/ClientCard';
import ClientNotAuthCard from 'pages/products/confirmation/ClientNotAuthCard';
import DepositCard from 'pages/products/confirmation/DepositCard';
import { useAppSelector } from 'src/store/store';

import { AppRoutes } from 'shared/constants';

const ConfirmationPage = () => {
  const client = useAppSelector((store) => store.client.client);
  const identity = useAppSelector((store) => store.client.identity);
  const product = useAppSelector((store) => store.deposit.product);
  if (!product) return <Navigate to={AppRoutes.PRODUCTS} />;

  return (
    <Stack direction="row" spacing={3}>
      {identity && client ? <ClientCard client={client} /> : <ClientNotAuthCard />}
      <DepositCard product={product} />
    </Stack>
  );
};

export default ConfirmationPage;
