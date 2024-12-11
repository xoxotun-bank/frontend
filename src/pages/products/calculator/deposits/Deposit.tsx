import React, { FC, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { Star, StarBorder } from '@mui/icons-material';
import { Box, Button, Card, CardContent, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import allMatchingIcon from 'src/assets/allMatchingIcon.png';
import notAllMatchingIcon from 'src/assets/notAllMatchingIcon.png';
import { setStep, useAppSelector } from 'src/store';
import { setProduct } from 'src/store/slices/productSlice';
import { Product } from 'src/types';

import { DepositOptions, LabeledText } from 'src/shared/components';

import { CalculatorConstants, depositParamsConst, ProductsPageConstants } from 'src/shared/constants/localeConstants';
import { formatMoney, mapDayToMonth } from 'src/utils/Mappers';

import './Deposit.css';

const checkIsAllMatches = (matchingParameters: Record<string, boolean>): boolean =>
  Object.keys(matchingParameters).every((key) => matchingParameters[key]);

interface Props extends Product {
  onToggleSelect: () => void;
  isSelected: boolean;
}

const Deposit: FC<Props> = ({
  financialProduct,
  profit,
  profitInPercent,
  matchesParameters,
  onToggleSelect,
  isSelected
}) => {
  const dispatch = useDispatch();

  const {
    name,
    percent,
    period,
    currency,
    canDeposit,
    canWithdrawal,
    capitalizationToSameAccount,
    capitalizationPeriod
  } = financialProduct;
  const isAllMatches = useMemo(() => checkIsAllMatches(matchesParameters), [matchesParameters]);
  const roundedProfit = useMemo(() => formatMoney(profit), [profit]);
  const roundedProfitInPercent = useMemo(() => formatMoney(profitInPercent), [profitInPercent]);
  const formattedPeriod = useMemo(() => `${mapDayToMonth(period)}`, [period]);
  const type: string[] | undefined = useAppSelector((store) => store.client.client?.categories);

  const handleClick = useCallback(() => {
    dispatch(setProduct({ financialProduct, profit: roundedProfit, profitInPercent: roundedProfitInPercent }));
    dispatch(setStep(2));
  }, [type, dispatch, financialProduct, roundedProfit, roundedProfitInPercent]);

  const options = useMemo(
    () => ({
      [depositParamsConst.CAPITALIZATION]: capitalizationToSameAccount,
      [depositParamsConst.DEPOSIT]: canDeposit,
      [depositParamsConst.WITHDRAWAL]: canWithdrawal
    }),
    [capitalizationToSameAccount, canWithdrawal, canDeposit]
  );

  const setIcon = useMemo(() => (isSelected ? <Star color="primary" /> : <StarBorder />), [isSelected]);

  return (
    <Card
      elevation={0}
      sx={{ borderRadius: '10px', marginBottom: '25px', border: '1px solid lightgray' }}
      className="card"
    >
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              {isAllMatches ? (
                <Tooltip title={ProductsPageConstants.ALL_MATCHES} placement="top" arrow>
                  <Box>
                    <img src={allMatchingIcon} />
                  </Box>
                </Tooltip>
              ) : (
                <Tooltip title={ProductsPageConstants.NOT_ALL_MATCHES} placement="top" arrow>
                  <Box>
                    <img src={notAllMatchingIcon} />
                  </Box>
                </Tooltip>
              )}
              <Typography variant="h6">{name}</Typography>
            </Stack>
            <IconButton onClick={onToggleSelect}>{setIcon}</IconButton>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <LabeledText label={depositParamsConst.PROFIT} text={roundedProfit.toString()} symbol={` ${currency}`} />
            <LabeledText
              label={depositParamsConst.PERCENT_PROFIT}
              text={roundedProfitInPercent.toString()}
              symbol="%"
            />
            <LabeledText label={depositParamsConst.PERCENT} text={percent.toString()} symbol="%" />
            <LabeledText label={depositParamsConst.PAYMENT_PERIOD} text={capitalizationPeriod} />
            <LabeledText
              label={depositParamsConst.PERIOD}
              text={formattedPeriod}
              symbol={` ${CalculatorConstants.MONTH}`}
            />
            <Button onClick={handleClick} variant="contained" color="primary" className="hoverButton">
              {depositParamsConst.PICK}
            </Button>
          </Stack>
          <DepositOptions options={options} />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Deposit;
