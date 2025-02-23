import React from 'react';

import { Box } from '@mui/material';

import { BarsChartSection } from '../components/BarsChartSection/BarsChartSection';
import { ChartsSection } from '../components/ChartsSection/ChartsSection';
import { PieChartSection } from '../components/PieChartSection/PieChartSection';
import { Stats } from '../components/StatsSection/StatsSection';
import { TopDepositsSection } from '../components/TopDepositsSection/TopDepositsSection';

import { useAnalyticsState } from 'src/store/hooks/useAnalyticsState';

import styles from './AnalyticsContent.module.css';
import { AnalyticsNotFound } from './AnalyticsNotFound/AnalyticsNotFound';
import { AnalyticsSkeleton } from './AnalyticsSkeleton/AnalyticsSkeleton';

export const AnalyticsContent = () => {
  const { data, isLoadingAnalytics, analyticsError, dictionariesError, params } = useAnalyticsState();

  if (isLoadingAnalytics) return <AnalyticsSkeleton />;

  if (analyticsError || dictionariesError || !data || !params) return <AnalyticsNotFound />;

  return (
    <Box className={styles.wrapper}>
      <Stats period={params.period} stats={data.statistics} />

      <Box className={styles.content}>
        <Box className={styles.contentLeft}>
          <Box className={styles.lineChart}>
            <ChartsSection charts={data.lineChart.lines} periodData={data.lineChart.xAxis} />
          </Box>
          <Box className={styles.barChart}>
            <BarsChartSection barsData={data.barChart} />
          </Box>
        </Box>

        <Box className={styles.contentRight}>
          <Box className={styles.topDeposits}>
            <TopDepositsSection deposits={data.products} />
          </Box>

          <Box className={styles.pieChart}>
            <PieChartSection pieData={data.pieChart} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
