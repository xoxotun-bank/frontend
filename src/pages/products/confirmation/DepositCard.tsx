import React, { FC, useEffect, useState } from 'react';

import { Box, Button, Dialog, Paper, Stack, Tab, Tabs } from '@mui/material';
import { Product } from 'src/types';
import { ConfirmedDeposit } from 'src/types/requests/ConfirmedDeposit';

import { depositCardConst, depositParamsConst } from 'shared/constants';
import { useAnalyticsState } from 'src/store/hooks/useAnalyticsState';
import { useClientState } from 'src/store/hooks/useClientState';
import { useProductState } from 'src/store/hooks/useProductState';
import { getCurrentDateFormatted, mapDayToMonth } from 'src/utils/Mappers';

import CompleteSelectionModal from './CompleteSelectionModal';
import styles from './Confirmation.module.css';
import { DepositInfoTab } from './DepositInfoTab';
import { PaymentsTableTab } from './PaymentsTableTab';

interface Props {
  product: Product;
}

const getAccessibilityProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const DepositCard: FC<Props> = ({ product }) => {
  const { client, identity, undoStep, getPaymentsTable, payments, clearPayments, isNewClient } = useClientState();
  const { clearProduct, lastValidFilters } = useProductState();
  const { postAnalytics } = useAnalyticsState();

  const params: ConfirmedDeposit = {
    clientBirthDate: client?.birthDate,
    financialProduct: product.financialProduct,
    isNewClient: isNewClient,
    createdAt: getCurrentDateFormatted(),
    amount: lastValidFilters?.sum,
    isSuccessfullySelected: true
  };

  const confirm = () => postAnalytics(params);

  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const { financialProduct, profit, profitInPercent } = product;
  const { capitalizationToSameAccount, canWithdrawal, canDeposit } = financialProduct;

  const depositTabConditions = {
    [depositParamsConst.CAPITALIZATION]: capitalizationToSameAccount,
    [depositParamsConst.DEPOSIT]: canDeposit,
    [depositParamsConst.WITHDRAWAL]: canWithdrawal
  };

  const depositTabOptions = {
    ...financialProduct,
    profit,
    profitInPercent,
    period: mapDayToMonth(financialProduct.period)
  };

  useEffect(() => {
    clearPayments();
    if (product && lastValidFilters) {
      getPaymentsTable(product, lastValidFilters.sum);
    }
  }, []);

  const handlePickMore = () => {
    undoStep();
    confirm();
    clearProduct();
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box className="depositCard">
      <Paper className={styles.wrapperDeposit}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
            <Tab label={depositCardConst.DEPOSIT_PARAMS} {...getAccessibilityProps(0)} />
            <Tab label={depositCardConst.PAYMENTS_TABLE} {...getAccessibilityProps(1)} disabled={!payments} />
          </Tabs>
        </Box>
        <Box sx={{ flex: 1, height: '523px' }}>
          {activeTab === 0 && (
            <DepositInfoTab depositConditions={depositTabConditions} depositOptions={depositTabOptions} />
          )}
          {activeTab === 1 && <PaymentsTableTab />}
        </Box>

        <Stack spacing={1}>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            onClick={() => setOpen(true)}
            disabled={!identity || !client}
          >
            {depositCardConst.BUTTON}
          </Button>
          <Button fullWidth variant="text" type="submit" onClick={handlePickMore} disabled={!identity || !client}>
            {depositCardConst.PICK_MORE}
          </Button>
        </Stack>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <CompleteSelectionModal params={params} />
        </Dialog>
      </Paper>
    </Box>
  );
};
export default DepositCard;
