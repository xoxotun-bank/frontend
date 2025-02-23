import React from 'react';

import { FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Skeleton, Stack } from '@mui/material';

import { analyticsPageConst } from 'src/shared/constants';
import { useAnalyticsState } from 'src/store/hooks/useAnalyticsState';

import { CustomPeriodPicker } from './CustomPeriodPicker';
import { ExportButton } from './ExportButton';

const { PARAMS, PERIOD } = analyticsPageConst;

export const ParamsSection = () => {
  const {
    setCity,
    setCurrency,
    setPeriod,
    params,
    isLoadingAnalytics,
    isLoadingDictionaries,
    dictionaries,
    dictionariesError
  } = useAnalyticsState();

  const handlePeriodChange = (event: SelectChangeEvent) => {
    setPeriod(event.target.value.toString());
  };

  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value.toString());
  };

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value.toString());
  };

  if (dictionariesError) return null;

  if (!dictionaries || isLoadingDictionaries) return <Skeleton height={104} variant="rectangular" />;

  const { periods, cities, currencies } = dictionaries;
  const periodsWithCustomOption = [...periods, PERIOD.CUSTOM];

  return (
    <Paper sx={{ p: '24px' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap="24px">
          <FormControl>
            <InputLabel>{PARAMS.TOWN}</InputLabel>
            <Select
              disabled={isLoadingAnalytics}
              label={PARAMS.TOWN}
              sx={{ width: '200px' }}
              defaultValue={cities[0]}
              value={params?.city}
              onChange={handleCityChange}
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>{PARAMS.CURRENCY}</InputLabel>
            <Select
              disabled={isLoadingAnalytics}
              label={PARAMS.CURRENCY}
              defaultValue={currencies[0]}
              value={params?.currency}
              onChange={handleCurrencyChange}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel>{PARAMS.PERIOD}</InputLabel>
            <Select
              disabled={isLoadingAnalytics}
              label={PARAMS.PERIOD}
              sx={{ width: '150px' }}
              value={params?.period}
              onChange={handlePeriodChange}
            >
              {periodsWithCustomOption.map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {params?.period === PERIOD.CUSTOM && <CustomPeriodPicker />}

        <ExportButton />
      </Stack>
    </Paper>
  );
};
