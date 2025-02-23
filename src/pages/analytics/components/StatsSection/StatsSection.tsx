import React from 'react';

import { Grid } from '@mui/material';
import { StatsItem as StatsItemType } from 'src/types/Analytics';

import { StatsItem } from './StatsItem/StatsItem';

interface Props {
  stats: StatsItemType[];
  period: string;
}

export const Stats = ({ stats, period }: Props) => {
  return (
    <Grid container spacing={2}>
      {stats.map((statsItem) => (
        <Grid item xs={12} md={3} key={statsItem.name}>
          <StatsItem statsItem={statsItem} period={period} />
        </Grid>
      ))}
    </Grid>
  );
};
