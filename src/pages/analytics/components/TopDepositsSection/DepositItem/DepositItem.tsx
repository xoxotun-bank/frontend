import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { analyticsPageConst } from 'src/shared/constants';
import { formatMoney, getDayLabel } from 'src/utils/Mappers';

import { DepositListItem } from '../TopDepositsSection';

interface Props {
  deposit: DepositListItem;
}

export const DepositItem = ({ deposit: { avgAmount, avgPeriod, name } }: Props) => {
  const avgSumStr = formatMoney(avgAmount) + ' ' + analyticsPageConst.RUB_CUT;
  const avgTermStr = avgPeriod + ' ' + getDayLabel(avgPeriod);

  return (
    <Stack
      spacing={1}
      sx={{ borderRadius: '10px', marginBottom: '25px', border: '1px solid lightgray', padding: '12px' }}
    >
      <Typography color="primary" variant="subtitle1">
        {name}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>
          <span style={{ color: 'gray' }}>{analyticsPageConst.AVG_SUM}</span> {avgSumStr}
        </Typography>
        <Typography>
          <span style={{ color: 'gray' }}>{analyticsPageConst.AVG_PERIOD} </span>
          {avgTermStr}
        </Typography>
      </Box>
    </Stack>
  );
};
