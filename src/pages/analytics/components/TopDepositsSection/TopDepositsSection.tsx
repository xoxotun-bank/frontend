import React from 'react';

import { Paper, Stack, Typography } from '@mui/material';

import { analyticsPageConst } from 'src/shared/constants';

import { DepositItem } from './DepositItem/DepositItem';

export interface DepositListItem {
  name: string;
  avgAmount: number;
  avgPeriod: number;
}

interface Props {
  deposits: DepositListItem[];
}

export const TopDepositsSection = ({ deposits }: Props) => {
  return (
    <Paper sx={{ p: '24px', pr: '10px', height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: '700' }} mb={2}>
        {analyticsPageConst.SECTION_TITLES.TOP_DEPOSITS}
      </Typography>

      <div style={{ maxHeight: 'calc(100% - 48px)', overflowY: 'auto', paddingRight: '10px' }}>
        <Stack spacing={2}>
          {deposits.map((item) => (
            <DepositItem deposit={item} key={item.name} />
          ))}
        </Stack>
      </div>
    </Paper>
  );
};
