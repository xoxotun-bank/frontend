import React, { FC } from 'react';
import { shallowEqual } from 'react-redux';

import { Settings } from '@mui/icons-material';
import { Box } from '@mui/material';
import TitledContainer from 'src/shared/layouts/TitledContainer';
import { useAppSelector } from 'src/store';

import { CalculatorPreloader } from 'src/shared/components';

import { ProductsPageConstants } from 'src/shared/constants';

import CalculatorContent from './CalculatorContent';

const Calculator: FC = () => {
  const isParamsLoading = useAppSelector((state) => state.deposit.isParamsLoading, shallowEqual);
  return (
    <Box className="filters">
      <TitledContainer
        icon={<Settings />}
        label={ProductsPageConstants.DEPOSIT_PARAMS}
        sx={{ width: '420px', height: '100%', backgroundColor: 'white' }}
      >
        {!isParamsLoading ? <CalculatorContent /> : <CalculatorPreloader />}
      </TitledContainer>
    </Box>
  );
};

export default Calculator;
