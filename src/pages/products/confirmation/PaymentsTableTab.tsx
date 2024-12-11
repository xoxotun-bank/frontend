import React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';

import { paymentsTableConst } from 'src/shared/constants';
import { useClientState } from 'src/store/hooks/useClientState';
import { useProductState } from 'src/store/hooks/useProductState';
import { getCurrencySymbol } from 'src/utils';
import { fullYearDashedFormat } from 'src/utils/dateFormatters';

const { PAYMENT_DATE, DAYS_COUNT, PAYMENT_PERCENT, PAYMENT_SUMM } = paymentsTableConst;

export const PaymentsTableTab = () => {
  const { payments } = useClientState();
  const { product } = useProductState();

  if (!payments) return null;

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '346px', overflow: 'auto' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>{PAYMENT_DATE}</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              {PAYMENT_SUMM}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              {PAYMENT_PERCENT}
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold' }} align="right">
              {DAYS_COUNT}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((row, i) => (
            <TableRow key={row.date} sx={{ backgroundColor: i % 2 === 0 ? 'rgba(250, 80, 0, 0.05)' : 'inherit' }}>
              <TableCell component="th" scope="row">
                {dayjs(row.date, fullYearDashedFormat).format('MM.DD.YY')}
              </TableCell>
              <TableCell align="right">
                {row.paymentAmount.toFixed(2)} {getCurrencySymbol(product?.financialProduct.currency)}
              </TableCell>
              <TableCell align="right">{row.percent.toFixed(2)}%</TableCell>
              <TableCell align="right">{row.daysAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
