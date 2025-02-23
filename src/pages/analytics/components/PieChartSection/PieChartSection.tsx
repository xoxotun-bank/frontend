import React from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts';
import { PieChart as PieChartType } from 'src/types/Analytics';

import { analyticsPageConst } from 'src/shared/constants';

interface Props {
  pieData: PieChartType;
}

export const PieChartSection = ({ pieData }: Props) => {
  const theme = useTheme();

  const pieColors = [theme.palette.info.main, theme.palette.warning.main, theme.palette.primary.main];

  const formatedPieData = pieData.map((item, index) => ({
    ...item,
    value: item.values,
    color: pieColors[index] || theme.palette.primary.main
  }));

  const total = pieData.reduce((sum, item) => sum + item.values[0], 0);

  return (
    <Paper sx={{ p: '24px', height: '100%' }}>
      <Typography variant="h6" sx={{ fontWeight: '700' }} mb={2}>
        {analyticsPageConst.SECTION_TITLES.AGE_SECTION}
      </Typography>
      <Box sx={{ height: 'calc(100% - 48px)' }}>
        <PieChart
          series={[
            {
              arcLabel: (item) => {
                const percentage = Math.round((item.value / total) * 100);
                return percentage > 0 ? `${percentage} %` : '';
              },
              data: formatedPieData
            }
          ]}
          slotProps={{
            legend: { labelStyle: { fontWeight: 'normal' } },
            pieArcLabel: {
              style: {
                fill: 'white',
                fontSize: 16
              }
            }
          }}
        />
      </Box>
    </Paper>
  );
};
