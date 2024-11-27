import { ValidationConst } from 'shared/constants/localeConstants';

export const loginValidation = {
  required: ValidationConst.REQUIRED_FIELD,
  blur: (value: string) => {
    if (value === '') return ValidationConst.REQUIRED_FIELD;
    return true;
  }
};
