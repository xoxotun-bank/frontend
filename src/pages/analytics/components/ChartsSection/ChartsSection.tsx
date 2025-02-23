import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { Box, Checkbox, FormControlLabel, FormGroup, Paper, Stack, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { ChartItem } from 'src/types/Analytics';

import {
  formatAnalyticsPeriod,
  getShortDateFromPeriod,
  truncateChartDataArray,
  truncateDateArray
} from 'src/utils/Mappers';

interface Props {
  charts: ChartItem[];
  periodData: string[];
}

export const ChartsSection = ({ charts, periodData }: Props) => {
  const theme = useTheme();

  const [investedFundsChecked, setInvestedFundsChecked] = useState(true);
  const [selectedDepositsChecked, setSelectedDepositsChecked] = useState(true);
  const [numberOfClientsChecked, setNumberOfClientsChecked] = useState(true);

  const handleCheckboxChange =
    (setter: Dispatch<SetStateAction<boolean>>) => (event: ChangeEvent<HTMLInputElement>) => {
      setter(event.target.checked);
    };

  const series = [
    selectedDepositsChecked && {
      data: truncateChartDataArray(charts[0].values),
      color: theme.palette.secondary.main,
      label: charts[0].label,
      showMark: false
    },
    investedFundsChecked && {
      data: truncateChartDataArray(charts[1].values),
      color: theme.palette.primary.main,
      label: charts[1].label,
      showMark: false
    },
    numberOfClientsChecked && {
      data: truncateChartDataArray(charts[2].values),
      color: theme.palette.info.main,
      label: charts[2].label,
      showMark: false
    }
  ].filter(Boolean);

  return (
    <Paper sx={{ height: '100%', p: '24px', flexGrow: 1 }}>
      <Stack sx={{ height: '100%' }}>
        <FormGroup>
          <Box sx={{ width: '100%', mb: '-50px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <FormControlLabel
              control={
                <Checkbox checked={investedFundsChecked} onChange={handleCheckboxChange(setInvestedFundsChecked)} />
              }
              label={charts[1].label}
              sx={{ color: investedFundsChecked ? theme.palette.primary.main : theme.palette.text.disabled }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={numberOfClientsChecked}
                  onChange={handleCheckboxChange(setNumberOfClientsChecked)}
                  color="info"
                />
              }
              label={charts[2].label}
              sx={{
                color: numberOfClientsChecked ? theme.palette.info.main : theme.palette.text.disabled
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={selectedDepositsChecked}
                  onChange={handleCheckboxChange(setSelectedDepositsChecked)}
                />
              }
              label={charts[0].label}
              sx={{
                color: selectedDepositsChecked ? theme.palette.secondary.main : theme.palette.text.disabled,
                zIndex: 999
              }}
            />
          </Box>
        </FormGroup>

        <LineChart
          series={series}
          xAxis={[
            {
              scaleType: 'band',
              data: truncateDateArray(periodData),
              valueFormatter: (value, context) =>
                context.location === 'tick' ? getShortDateFromPeriod(value) : formatAnalyticsPeriod(value)
            }
          ]}
          sx={{
            '& .MuiChartsLegend-root': {
              display: 'none'
            }
          }}
        />
      </Stack>
    </Paper>
  );
};
