/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';

import { Button, Dialog, DialogActions, DialogTitle, Stack } from '@mui/material';

import { ProductsPageConstants } from 'src/shared/constants';
import { useProductState } from 'src/store/hooks/useProductState';

import Calculator from './Calculator';
import DepositList from './deposits/DepositList';

const refreshPage = () => window.location.reload();

const CalculatorPage = () => {
  const { dictionariesError, getDictionaries, clearErrors } = useProductState();

  useEffect(() => {
    getDictionaries();
  }, []);

  return (
    <Stack direction="row" spacing={3} width="100%" p="20px 0px" height="100%">
      <Dialog
        open={dictionariesError}
        onClose={clearErrors}
        PaperProps={{
          sx: {
            display: 'flex',
            alignItems: 'center',
            borderRadius: '10px'
          }
        }}
      >
        <DialogTitle variant="subtitle1">{ProductsPageConstants.DICTIONARIES_ERROR}</DialogTitle>
        <DialogActions>
          <Stack direction="row" spacing={3}>
            <Button onClick={refreshPage} type="submit" variant="contained">
              {ProductsPageConstants.REFRESH}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <Calculator />
      <DepositList />
    </Stack>
  );
};
export default CalculatorPage;
