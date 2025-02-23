import React from 'react';

import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import { BarChart as BarChartType } from 'src/types/Analytics';

import { analyticsPageConst } from 'src/shared/constants';
import { cleanDepositName, formatLongNumberWithSuffix } from 'src/utils/Mappers';

const { TOTAL_FUNDS_AMOUNT } = analyticsPageConst;

interface Props {
  barsData: BarChartType;
}

export const BarsChartSection = ({ barsData: { bars, xAxis } }: Props) => {
  const theme = useTheme();

  const series = bars.map((bar, index) => {
    let color;
    switch (index) {
      case 0:
        color = theme.palette.info.main;
        break;
      case 1:
        color = theme.palette.warning.main;
        break;
      case 2:
        color = theme.palette.primary.main;
        break;
      default:
        color = theme.palette.primary.main;
    }

    return {
      data: bar.values,
      label: bar.label,
      id: `bar${index}`,
      stack: 'total',
      color
    };
  });

  return (
    <Paper sx={{ p: '24px' }}>
      <Typography variant="h6" sx={{ fontWeight: '700' }} mb={2}>
        {TOTAL_FUNDS_AMOUNT}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <BarChart
          height={400}
          width={650}
          series={series}
          slotProps={{ legend: { labelStyle: { fontWeight: 'normal' } } }}
          xAxis={[
            {
              data: xAxis,
              scaleType: 'band',
              valueFormatter: (value, context) =>
                context.location === 'tick' ? `${cleanDepositName(value).slice(0, 8)}...` : value
            }
          ]}
          yAxis={[
            {
              valueFormatter: (value) => formatLongNumberWithSuffix(value, ''),
              slotProps: { axisTickLabel: { style: { paddingLeft: '40px' } } }
            }
          ]}
        />
      </Box>
    </Paper>
  );
};
