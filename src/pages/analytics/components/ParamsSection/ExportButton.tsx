import React, { useState } from 'react';

import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import { getAnalyticsCSV } from 'src/api/AnalyticsService';

import { analyticsPageConst } from 'src/shared/constants';
import { useAnalyticsState } from 'src/store/hooks/useAnalyticsState';
import { useNotification } from 'src/store/hooks/useNotification';
import { createAnalyticsQuery } from 'src/utils';

export const ExportButton = () => {
  const { displayNotification } = useNotification();
  const { params } = useAnalyticsState();

  const [disabled, setDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleGetCSV = () => {
    setDisabled(true);
    setCountdown(3);

    if (!params) return setDisabled(true);

    const { city, currency, endDate, period, startDate } = params;

    const query = createAnalyticsQuery({ city, currency, endDate, period, startDate });

    getAnalyticsCSV(query)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'analytics.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 500) {
          displayNotification({ type: 'error', message: analyticsPageConst.EXPORT_ERROR });
        } else {
          displayNotification({ type: 'warning', message: analyticsPageConst.NO_DATA_FOUND });
        }
      })
      .finally(() => {
        const intervalId = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(intervalId);
              setDisabled(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      });
  };

  const isCustomPeriod = params?.period === analyticsPageConst.PERIOD.CUSTOM;

  const noCustomDatesSet = isCustomPeriod && (!params?.startDate || !params?.endDate);

  return (
    <Button variant="contained" sx={{ width: '120px' }} onClick={handleGetCSV} disabled={disabled || noCustomDatesSet}>
      {analyticsPageConst.EXPORT_ANALYTICS} {countdown > 0 && `(${countdown})`}
    </Button>
  );
};
