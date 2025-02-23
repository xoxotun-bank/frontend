import React from 'react';

import { FormControl, Stack } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

import { analyticsPageConst } from 'src/shared/constants';
import { useAnalyticsState } from 'src/store/hooks/useAnalyticsState';
import { shortYearPeriodDateFormat } from 'src/utils/Formats';

const { PERIOD } = analyticsPageConst;

export const CustomPeriodPicker = () => {
  const { setStartDate, setEndDate, dictionaries, params } = useAnalyticsState();

  if (!dictionaries) return;

  const handleStartDateChange = (newValue: Dayjs | null) => {
    newValue ? setStartDate(newValue.format(shortYearPeriodDateFormat)) : setStartDate(null);
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    newValue ? setEndDate(newValue.format(shortYearPeriodDateFormat)) : setStartDate(null);
  };

  const firstPickerMinDate = dayjs(dictionaries.startDate, shortYearPeriodDateFormat);
  const firstPickerMaxDate = dayjs().subtract(2, 'day');

  const secondPickerMinDate = params?.startDate
    ? dayjs(params.startDate, shortYearPeriodDateFormat).add(2, 'days')
    : undefined;

  const secondPickerMaxDate = dayjs();

  return (
    <Stack direction="row">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <FormControl>
          <Stack direction="row" gap="24px">
            <DatePicker
              label={PERIOD.START_DATE}
              onChange={handleStartDateChange}
              minDate={firstPickerMinDate}
              maxDate={firstPickerMaxDate}
            />
            <DatePicker
              label={PERIOD.END_DATE}
              onChange={handleEndDateChange}
              disabled={!params?.startDate}
              minDate={secondPickerMinDate}
              maxDate={secondPickerMaxDate}
            />
          </Stack>
        </FormControl>
      </LocalizationProvider>
    </Stack>
  );
};

export default CustomPeriodPicker;
