import React from 'react';

import { Button, Grid, Skeleton, Stack } from '@mui/material';
import CalculatorOption from 'src/pages/products/calculator/CalculatorOption';

import { CalculatorConstants } from 'src/shared/constants';

import styles from 'src/pages/products/calculator/Calculator.module.css';

export const CalculatorPreloader = () => (
  <form className={styles.form}>
    <Stack spacing={3} justifyContent="space-between">
      <CalculatorOption label={CalculatorConstants.DEPOSIT_SUM}>
        <Grid container direction="row" columns={17} justifyContent="space-between">
          <Grid item xs={12}>
            <Skeleton height="80px" />
          </Grid>
          <Grid item xs={4}>
            <Skeleton height="80px" />
          </Grid>
          <Grid item xs={17}>
            <Skeleton height="80px" />
          </Grid>
        </Grid>
      </CalculatorOption>
      <CalculatorOption label={CalculatorConstants.CAPITALIZATION_ABILITY}>
        <Stack gap={0}>
          <Skeleton height="60px" />
          <Skeleton height="80px" />
        </Stack>
      </CalculatorOption>
      <CalculatorOption label={CalculatorConstants.DEPOSIT_ABILITY}>
        <Skeleton height="60px" />
      </CalculatorOption>
      <CalculatorOption label={CalculatorConstants.WITHDRAWAL_ABILITY}>
        <Skeleton height="60px" />
      </CalculatorOption>
    </Stack>
    <Button fullWidth variant="contained" size="medium" disabled>
      {CalculatorConstants.CALCULATE}
    </Button>
  </form>
);
