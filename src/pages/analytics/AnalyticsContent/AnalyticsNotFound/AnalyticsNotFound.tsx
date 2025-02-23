import React from 'react';

import { Paper, Stack, Typography } from '@mui/material';
import notFoundImg from 'src/assets/not-found-woman.png';

import { analyticsPageConst } from 'src/shared/constants';

import styles from './AnalyticsNotFound.module.css';

export const AnalyticsNotFound = () => {
  return (
    <Paper className={styles.wrapper}>
      <Stack width="300px" alignItems="center">
        <img src={notFoundImg} alt="analytics not found" width="200px" />
        <Typography variant="h5">{analyticsPageConst.NOTHING_FOUND}</Typography>
        <Typography>{analyticsPageConst.TRY_LATER}</Typography>
      </Stack>
    </Paper>
  );
};
