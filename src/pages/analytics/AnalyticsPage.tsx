import React, { useEffect } from 'react';

import { Box } from '@mui/material';

import { ParamsSection } from './components/ParamsSection/ParamsSection';

import { analyticsPageConst } from 'src/shared/constants';
import { useAnalyticsState } from 'src/store/hooks/useAnalyticsState';

import { AnalyticsContent } from './AnalyticsContent/AnalyticsContent';
import styles from './AnalyticsPage.module.css';

const { PERIOD } = analyticsPageConst;

const AnalyticsPage = () => {
  const { getAnalytics, getDictionaries, params } = useAnalyticsState();

  useEffect(() => {
    getDictionaries();
  }, []);

  useEffect(() => {
    if (!params) return;
    const { period, startDate, endDate } = params;
    const ableToFetch = period !== PERIOD.CUSTOM || (startDate && endDate);
    ableToFetch && getAnalytics(params);
  }, [params]);

  return (
    <Box className={styles.wrapper}>
      <ParamsSection />
      <AnalyticsContent />
    </Box>
  );
};

export default AnalyticsPage;
