import React from 'react';

import { Box, Skeleton } from '@mui/material';

import styles from '../AnalyticsContent.module.css';

export const AnalyticsSkeleton = () => {
  return (
    <Box className={styles.content}>
      <Box className={styles.contentLeft}>
        <Skeleton variant="rectangular" className={styles.lineChart} />
        <Skeleton variant="rectangular" className={styles.barChart} />
      </Box>

      <Box className={styles.contentRight}>
        <Skeleton variant="rectangular" className={styles.topDeposits} height={670} />
        <Skeleton variant="rectangular" className={styles.pieChart} />
      </Box>
    </Box>
  );
};
