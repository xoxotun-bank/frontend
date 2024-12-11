import React from 'react';

import { Box, Grid, Stack, Typography } from '@mui/material';
import { depositOptions as depositOptionsData } from 'pages/products/confirmation/depositOptions';
import { FinancialProduct } from 'src/types';

import { DepositOptions } from 'src/shared/components';

import { cleanDepositName } from 'src/utils/Mappers';

import styles from './Confirmation.module.css';

interface Props {
  depositOptions: FinancialProduct & {
    profit: number;
    profitInPercent: number;
    period: number;
  };
  depositConditions: {
    [condition: string]: boolean;
  };
}

export const DepositInfoTab = ({ depositOptions, depositConditions }: Props) => {
  // TODO: типизировать в NPCA-408
  const depositOptionsWithType = depositOptionsData as { [key: string]: any };

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {depositOptions.name}
      </Typography>
      <Grid container spacing={2} pb={2}>
        {Object.entries(depositOptions).map(([key, value]) => {
          const option = depositOptionsWithType[key];
          if (!option) return null;

          if (key == 'profit') value += ` ${depositOptions.currency}`;
          if (key === 'name') value = `${cleanDepositName(value).slice(0, 10)}...`;

          return (
            <Grid item xs={6} key={key}>
              <Box className={styles.gridItem}>
                {option.icon}
                <Stack>
                  <Typography variant="body1">{value + option.unit}</Typography>
                  <Typography variant="body2" color="#999999">
                    {option.translation}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <DepositOptions options={depositConditions} />
    </Box>
  );
};
