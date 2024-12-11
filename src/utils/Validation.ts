import { uiErrorsConstants, ValidationConst } from 'shared/constants/localeConstants';
import { atLeastTwoWordsRegEx } from 'src/shared/constants';

import { checkOnlyNumbersInputted, removeSpaces } from './Mappers';

export const validateSum = (value: number) => {
  const stringValue = String(value);
  if (value <= 0) return uiErrorsConstants.POSITIVE_NUMBER_NEEDED;
  if (!checkOnlyNumbersInputted(stringValue)) return uiErrorsConstants.NUMBER_NEEDED;
  if (value > 1000000000) return uiErrorsConstants.MORE_THAN_BILLION;
  return undefined;
};

const passportValidation = (value: string) => {
  const formattedValue: string = removeSpaces(value);
  if (!checkOnlyNumbersInputted(formattedValue)) return ValidationConst.REQUIRED_FIELD;
  if (formattedValue.length !== 10) return ValidationConst.PASSPORT_LENGTH;
  return undefined;
};

const fioValidation = (value: string) =>
  !atLeastTwoWordsRegEx.test(value) ? ValidationConst.NAME_AND_SURNAME : undefined;

const blurValidation = (value: string) => (value === '' ? ValidationConst.REQUIRED_FIELD : undefined);

export const validateRequired = {
  required: ValidationConst.REQUIRED_FIELD,
  blur: blurValidation
};

export const validatePassport = {
  required: ValidationConst.REQUIRED_FIELD,
  blur: blurValidation,
  validate: passportValidation
};

export const validateFIO = {
  required: ValidationConst.REQUIRED_FIELD,
  blur: blurValidation,
  validate: fioValidation
};
