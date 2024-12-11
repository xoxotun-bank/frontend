import React, { FC } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Fab, Step, StepLabel, Stepper } from '@mui/material';
import { ConfirmedDeposit } from 'src/types/requests/ConfirmedDeposit';

import { productsPageNavigation } from 'src/shared/constants';
import { useAnalyticsState } from 'src/store/hooks/useAnalyticsState';
import { useClientState } from 'src/store/hooks/useClientState';
import { useProductState } from 'src/store/hooks/useProductState';
import { getCurrentDateFormatted } from 'src/utils';

import styles from './ProductsPageNavigation.module.css';

interface Props {
  step: number;
}

export const ProductsPageNavigation: FC<Props> = ({ step }) => {
  const { undoStep, client, isNewClient } = useClientState();
  const { postAnalytics } = useAnalyticsState();
  const { lastValidFilters, product, products, resetProduct } = useProductState();

  const handleReturn = () => {
    undoStep();
    if (step === 1) {
      // TODO - вынести для переиспользования
      const finProduct = product?.financialProduct ?? products?.products[0]?.financialProduct ?? null;
      const params: ConfirmedDeposit = {
        clientBirthDate: client?.birthDate,
        financialProduct: finProduct,
        isNewClient: isNewClient,
        isSuccessfullySelected: false,
        createdAt: getCurrentDateFormatted(),
        amount: lastValidFilters?.sum
      };
      resetProduct();
      postAnalytics(params);
    }
  };

  return (
    <Box className={styles.wrapper}>
      {step !== 0 && (
        <Fab variant="extended" color="primary" sx={{ position: 'absolute', left: 0 }} onClick={handleReturn}>
          <ArrowBackIcon sx={{ mr: 1 }} />
          {productsPageNavigation.BACK}
        </Fab>
      )}
      <Stepper
        activeStep={step}
        sx={{
          width: '900px'
        }}
      >
        {productsPageNavigation.STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
