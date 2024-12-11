/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Button, Grid, Stack } from '@mui/material';
import { useAppSelector } from 'src/store';
import { ClientCategory, FilterParams } from 'src/types';
import { FinProductsRequest } from 'src/types/requests/FinProductsRequest';

import {
  ControlledMultiSelect,
  ControlledSelect,
  ControlledTextField,
  ControlledToggleButtonGroup
} from 'src/shared/components';
import { ClientInfo } from 'src/shared/components/calculator/ClientInfo';

import {
  CalculatorConstants,
  depositParamsConst,
  IdentifyClientConstants,
  tutorialConst,
  UNDEFINED
} from 'src/shared/constants';
import { useClientState } from 'src/store/hooks/useClientState';
import { useProductState } from 'src/store/hooks/useProductState';
import { validateSum } from 'src/utils';
import { createGetFinProductsQuery, formatSum, mapDaysToMonths, unformatSum } from 'src/utils/Mappers';

import styles from './Calculator.module.css';
import CalculatorOption from './CalculatorOption';

const defaultValues: FilterParams = {
  currency: 'RUB',
  sum: 100000,
  periods: [CalculatorConstants.PERIOD_ANY],
  capitalizationPeriods: [CalculatorConstants.NOT_IMPORTANT],
  canWithdrawal: UNDEFINED,
  capitalizationToSameAccount: UNDEFINED,
  canDeposit: UNDEFINED
};

const CalculatorContent: FC = () => {
  const { client } = useClientState();
  const { lastValidFilters, dictionaries, getFinProducts, setParams, productsError, isProductsLoading } =
    useProductState();
  const { isTutorMode } = useAppSelector(({ auth }) => auth);

  const capitalizationPeriods = useMemo(() => dictionaries?.capitalizationPeriods ?? [], [dictionaries]);
  const currencies = useMemo(() => dictionaries?.currencies ?? [], [dictionaries]);
  const periods = useMemo(() => dictionaries?.periods ?? [], [dictionaries]);
  const categories = useMemo(() => client?.categories ?? [ClientCategory.CLIENT], [client]);
  const clientName = useMemo(() => client?.name ?? IdentifyClientConstants.UNAUTH_CLIENT, [client]);

  const periodsList = useMemo(
    () => [CalculatorConstants.NOT_IMPORTANT, ...capitalizationPeriods],
    [capitalizationPeriods]
  );
  const durationList = useMemo(() => mapDaysToMonths(periods), [periods]);
  const currentValues = useMemo(() => lastValidFilters ?? defaultValues, [lastValidFilters]);

  const { control, getValues, handleSubmit, reset } = useForm<FilterParams>({
    defaultValues: currentValues
  });

  const onSubmit = () => {
    const values = getValues();
    const queryParams: FinProductsRequest = {
      ...values,
      categories
    };
    const query = createGetFinProductsQuery(queryParams, periods);
    getFinProducts(query);
    setParams(values);
  };

  useEffect(() => {
    onSubmit();
  }, []);

  useEffect(() => {
    if (!productsError) reset(currentValues);
  }, [productsError]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} justifyContent="space-between">
        <CalculatorOption
          label={CalculatorConstants.MAIN_PARAMS}
          tooltip={tutorialConst.MAIN_PARAMS_INFO}
          isTutorMode={isTutorMode}
        >
          <Grid container direction="row" columns={17} justifyContent="space-between">
            <Grid item xs={12}>
              <ControlledTextField
                name="sum"
                control={control}
                format={formatSum}
                unformat={unformatSum}
                fullWidth
                label={CalculatorConstants.DEPOSIT_SUM}
                rules={{ validate: validateSum }}
              />
            </Grid>
            <Grid item xs={4}>
              <ControlledSelect
                name="currency"
                label={depositParamsConst.CURRENCY}
                control={control}
                options={currencies}
                fullWidth
              />
            </Grid>
            <Grid item xs={17}>
              <ControlledMultiSelect
                name="periods"
                control={control}
                options={durationList}
                pickAllOption={CalculatorConstants.PERIOD_ANY}
                fullWidth
                multiple
                label={depositParamsConst.PERIOD}
              />
            </Grid>
          </Grid>
        </CalculatorOption>
        <CalculatorOption
          label={CalculatorConstants.CAPITALIZATION_ABILITY}
          tooltip={tutorialConst.CAPITALIZATION_INFO}
          isTutorMode={isTutorMode}
        >
          <Stack gap={2}>
            <ControlledToggleButtonGroup
              name="capitalizationToSameAccount"
              color="primary"
              control={control}
              exclusive
              fullWidth
            />
            <ControlledMultiSelect
              name="capitalizationPeriods"
              control={control}
              options={periodsList}
              pickAllOption={CalculatorConstants.NOT_IMPORTANT}
              fullWidth
              multiple
              label={depositParamsConst.PAYMENT_PERIOD}
            />
          </Stack>
        </CalculatorOption>
        <CalculatorOption
          label={CalculatorConstants.DEPOSIT_ABILITY}
          tooltip={tutorialConst.DEPOSIT_INFO}
          isTutorMode={isTutorMode}
        >
          <ControlledToggleButtonGroup name="canDeposit" control={control} color="primary" exclusive fullWidth />
        </CalculatorOption>
        <CalculatorOption
          label={CalculatorConstants.WITHDRAWAL_ABILITY}
          tooltip={tutorialConst.WITHDRAWAL_INFO}
          isTutorMode={isTutorMode}
        >
          <ControlledToggleButtonGroup name="canWithdrawal" control={control} color="primary" exclusive fullWidth />
        </CalculatorOption>
        <CalculatorOption label={IdentifyClientConstants.CLIENT}>
          <ClientInfo name={clientName} categories={categories} />
        </CalculatorOption>
      </Stack>
      <Button fullWidth variant="contained" size="medium" type="submit" disabled={isProductsLoading}>
        {CalculatorConstants.CALCULATE}
      </Button>
    </form>
  );
};

export default CalculatorContent;
