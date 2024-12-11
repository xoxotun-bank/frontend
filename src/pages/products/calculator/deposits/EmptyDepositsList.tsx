import React from 'react';

import { ErrorOutline } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

import { CalculatorConstants, errorConst } from 'src/shared/constants';
import { useProductState } from 'src/store/hooks/useProductState';

export const EmptyDepositsList = () => {
  const { clearErrors } = useProductState();
  return (
    <Stack height="100%" width="100%" justifyContent="center" alignItems="center" spacing={2}>
      <Stack spacing={2} direction="row">
        <ErrorOutline color="error" />
        <Typography>{errorConst.CALCULATOR_404}</Typography>
      </Stack>
      <Button variant="outlined" onClick={clearErrors}>
        {CalculatorConstants.TO_PREVIOUS_FILTERS}
      </Button>
    </Stack>
  );
};
