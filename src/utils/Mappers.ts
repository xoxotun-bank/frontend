import { ChangeEvent } from 'react';

import { UserData, UserRole } from 'src/types';
import { FinProductsRequest } from 'src/types/requests/FinProductsRequest';

import { analyticsPageConst, CalculatorConstants, UNDEFINED } from 'src/shared/constants/localeConstants';
import { leadingNumber, numberRegEx, thousandsSeparationRegEx } from 'src/shared/constants/regularExpressions';

type QueryObject = Record<string, string | number | boolean | undefined>;

export const getQueryParams = (paramsObj: QueryObject) => {
  const paramsString = Object.keys(paramsObj).reduce(
    (previousValue, currentValue) => previousValue + `${currentValue}=${paramsObj[currentValue]}&`,
    '?'
  );
  return paramsString.endsWith('&') ? paramsString.slice(0, paramsString.length - 1) : paramsString;
};

export const mapDaysToMonths = (data: number[]): string[] => {
  const converted = data.map((days) => `${mapDayToMonth(days)} ${CalculatorConstants.MONTH}`);
  return [CalculatorConstants.PERIOD_ANY, ...converted];
};

export const mapMonthToDays = (month: string, days: number[]): number => {
  const months = Number(month.match(leadingNumber));
  const res = days.filter((days) => months === mapDayToMonth(days));
  return res.length > 0 ? res[0] : 0;
};

export const formatDateString = (dateString: string): string => {
  const [year, month, day] = dateString.split(/[-\s.]+/);
  return `${day}.${month}.${year}`;
};

export const formatPassportNumber = (value: string): string => {
  const numbersOnly: string = value.replace(/\D/g, '');
  const part1: string = numbersOnly.substring(0, 4);
  const part2: string = numbersOnly.substring(4, 10);
  return numbersOnly.length <= 4 ? part1 : `${part1} ${part2}`;
};

export const removeSpaces = (input: string) => {
  return input.replace(/\s/g, '');
};

export const formatMoney = (amount: number) => amount.toFixed(2).replace(thousandsSeparationRegEx, ' ');

export const mapDayToMonth = (days: number) => Math.round(days / 30.44);

export const formatSum = (number: number) => {
  const stringValue = number.toString();
  const formattedValue = removeSpaces(stringValue);
  return formattedValue.replace(thousandsSeparationRegEx, ' ');
};

export const unformatSum = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const inputValue = event.target.value;
  return Number(inputValue.replace(/[^0-9]/g, ''));
};

export const checkOnlyNumbersInputted = (value: string) => numberRegEx.test(value);

export const createGetFinProductsQuery = (queryData: FinProductsRequest, allPeriods: number[]): string => {
  const {
    sum,
    currency,
    categories,
    canDeposit,
    canWithdrawal,
    capitalizationToSameAccount,
    periods,
    capitalizationPeriods
  } = queryData;

  const formatListQuery = (parameter: string, list: string[] | number[]): string =>
    list.map((value) => `${parameter}=${value}`).join('&');

  const formatUndefinedValues = (values: Record<string, boolean | string>) => {
    const res: Record<string, boolean | string | undefined> = {};
    Object.keys(values).map((key) => {
      values[key] !== UNDEFINED && values[key] !== undefined && (res[key] = values[key]);
    });
    return res;
  };

  const valuesToFormat = {
    canDeposit: canDeposit,
    canWithdrawal: canWithdrawal,
    capitalizationToSameAccount: capitalizationToSameAccount
  };

  const mappedPeriods = periods.map((month: string) => mapMonthToDays(month, allPeriods));

  const formattedValues = formatUndefinedValues(valuesToFormat);
  const formattedCategories = formatListQuery('categories', categories);

  const formattedPeriod =
    periods.includes(CalculatorConstants.PERIOD_ANY) || periods.length === 0
      ? ''
      : `&${formatListQuery('periods', mappedPeriods)}`;

  const formattedCapitalizationPeriod =
    capitalizationPeriods?.includes(CalculatorConstants.NOT_IMPORTANT) || capitalizationPeriods?.length === 0
      ? ''
      : `&${formatListQuery('capitalizationPeriods', capitalizationPeriods)}`;

  const result = {
    ...formattedValues,
    sum: sum,
    currency: currency
  };

  const query = getQueryParams(result) + '&' + formattedCategories + formattedPeriod + formattedCapitalizationPeriod;
  return query;
};

export const formatComparisonString = (growthValue: number, period: string): string => {
  const strBegining = growthValue > 0 ? '+' : '';

  const comparisonStrings: Record<string, string> = {
    [analyticsPageConst.PERIOD.YEAR]: analyticsPageConst.COMPARISON_STRING.YEAR,
    [analyticsPageConst.PERIOD.MONTH]: analyticsPageConst.COMPARISON_STRING.MONTH,
    [analyticsPageConst.PERIOD.QUARTER]: analyticsPageConst.COMPARISON_STRING.QUARTER
  };

  const strEnding = comparisonStrings[period] || analyticsPageConst.COMPARISON_STRING.PERIOD;

  return `${strBegining}${growthValue}% ${strEnding}`;
};

export const formatLongNumberWithSuffix = (value: number, mark: string): string => {
  const { BILLION, MILLION, THOUSAND } = analyticsPageConst.CASH_CUT_STRING;

  let formattedValue;

  if (value >= 1_000_000_000) {
    formattedValue = (value / 1_000_000_000).toFixed(3).replace(/\.?0+$/, '') + ` ${BILLION}`;
  } else if (value >= 1_000_000) {
    formattedValue = (value / 1_000_000).toFixed(3).replace(/\.?0+$/, '') + ` ${MILLION}`;
  } else if (value >= 1_000) {
    formattedValue = (value / 1_000).toFixed(3).replace(/\.?0+$/, '') + ` ${THOUSAND}`;
  } else {
    formattedValue = value.toString();
  }

  if (mark === '%') {
    return `${formattedValue}${mark}`;
  } else if (mark === '₽') {
    return `${mark} ${formattedValue}`;
  } else {
    return `${formattedValue} ${mark}`;
  }
};

export const getUserRole = (user: UserData | null): UserRole => {
  return user && user.userRoles?.includes(UserRole.ADMIN) ? UserRole.ADMIN : UserRole.OPERATOR;
};

export const truncateChartDataArray = (arr: number[]): number[] => {
  const maxLength = 40;
  const minLength = 20;

  if (arr.length <= maxLength) {
    return arr;
  }

  let periodSize = Math.ceil(arr.length / maxLength);
  while (periodSize * minLength > arr.length) {
    periodSize++;
  }

  const trimmedLength = Math.floor(arr.length / periodSize) * periodSize;
  const trimmedArr = arr.slice(0, trimmedLength);

  const result: number[] = [];
  for (let i = 0; i < trimmedArr.length; i += periodSize) {
    const period = trimmedArr.slice(i, i + periodSize);
    result.push(period.reduce((sum, num) => sum + num, 0));
  }

  return result;
};

export const truncateDateArray = (arr: string[]): string[] => {
  const maxLength = 40;
  const minLength = 20;

  if (arr.length <= maxLength) {
    return arr;
  }

  let periodSize = Math.ceil(arr.length / maxLength);
  while (periodSize * minLength > arr.length) {
    periodSize++;
  }

  const trimmedLength = Math.floor(arr.length / periodSize) * periodSize;
  const trimmedArr = arr.slice(0, trimmedLength);

  const result: string[] = [];
  for (let i = 0; i < trimmedArr.length; i += periodSize) {
    const period = trimmedArr.slice(i, i + periodSize);
    const startDate = period[0];
    const endDate = period[period.length - 1];
    result.push(`${startDate} - ${endDate}`);
  }

  return result;
};

export const cleanDepositName = (depositName: string): string => {
  return depositName.replace(/АТБ\.?|[«»]/g, '').trim();
};

export const getShortDateFromPeriod = (period: string): string => {
  const year = period.substring(2, 4);
  const month = period.substring(5, 7);
  const day = period.substring(8, 10);

  return `${day}.${month}.${year}`;
};

export const formatAnalyticsPeriod = (period: string) => {
  if (period.length === 10) return getShortDateFromPeriod(period);
  const [start, end] = period.split(' - ');
  return `${getShortDateFromPeriod(start)} - ${getShortDateFromPeriod(end)}`;
};

export const getDayLabel = (count: number): string => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return analyticsPageConst.PERIOD_DECLENSIONS.DAY[0];
  }

  switch (lastDigit) {
    case 1:
      return analyticsPageConst.PERIOD_DECLENSIONS.DAY[0];
    case 2:
    case 3:
    case 4:
      return analyticsPageConst.PERIOD_DECLENSIONS.DAY[1];
    default:
      return analyticsPageConst.PERIOD_DECLENSIONS.DAY[2];
  }
};

export const getCurrentDateFormatted = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const createQueryAllRequired = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    queryParams.append(key, String(value));
  }

  return queryParams.toString();
};

export const getCurrencySymbol = (currency?: string): string => {
  switch (currency) {
    case 'CNY':
      return '¥';
    case 'RUB':
      return '₽';
    default:
      return '';
  }
};
