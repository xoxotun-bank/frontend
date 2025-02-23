import React, { ChangeEvent, FC, useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';

import { AccountCircle } from '@mui/icons-material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { Box, Button, FormLabel, InputAdornment, Stack } from '@mui/material';
import { Dayjs } from 'dayjs';
import TitledContainer from 'src/shared/layouts/TitledContainer';
import { ClientCategory, ClientData } from 'src/types';

import {
  clientCardConst,
  clientNotAuthCardConst,
  IdentifyClientConstants,
  rusLettersRegEx
} from 'src/shared/constants';
import { useClientState } from 'src/store/hooks/useClientState';
import { fullYearDashedFormat } from 'src/utils/dateFormatters';
import { checkOnlyNumbersInputted, formatPassportNumber, removeSpaces } from 'src/utils/Mappers';
import { validateFIO, validatePassport } from 'src/utils/Validation';

import { ControlledDatePicker } from '../controlledInputs/ControlledDatePicker';
import { ControlledTextField } from '../controlledInputs/ControlledTextField';

interface NewClient extends ClientData {
  date?: Dayjs;
}

const defaultValues: NewClient = {
  name: '',
  passport: '',
  categories: [ClientCategory.CLIENT],
  date: undefined
};

const unformatPassport = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const inputValue = event.target.value;
  const numbersOnly = inputValue.replace(/\D/g, '').substring(0, 10);
  return removeSpaces(numbersOnly);
};

const capitalizeWords = (str: string): string =>
  str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const formatFIO = (fio: string) => fio.replace(rusLettersRegEx, '');

interface Props {
  handleClose: () => void;
}

export const NewClientModal: FC<Props> = ({ handleClose }) => {
  const { applyClientCard, setClientData, setNewClient } = useClientState();

  const { control, handleSubmit, setValue, getValues, watch, setError } = useForm<NewClient>({
    mode: 'onChange',
    defaultValues
  });

  const { errors } = useFormState({ control });

  const onClear = (name: 'name' | 'passport') => setValue(name, '');

  const onSubmit = () => {
    const { categories, name, passport, date } = getValues();
    const formattedDate = date?.format(fullYearDashedFormat).toString();
    const data: ClientData = {
      categories: categories,
      name: capitalizeWords(name),
      passport: passport,
      birthDate: formattedDate
    };
    setNewClient(true);
    setClientData(data);
    applyClientCard();
    handleClose();
  };

  const nameValue = watch('name');
  const passportValue = watch('passport');
  const dateValue = watch('date');

  useEffect(() => {
    if ((checkOnlyNumbersInputted(passportValue) && passportValue.length <= 10) || passportValue === '')
      setValue('passport', passportValue);
  }, [passportValue]);

  const isDisabled =
    !errors.name?.message && !errors.passport?.message && dateValue?.isValid() && nameValue && passportValue;

  return (
    <TitledContainer label={clientNotAuthCardConst.NEW_CLIENT} icon={<AccountCircle />}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1}>
          <FormLabel />
          <ControlledTextField
            name="name"
            control={control}
            fullWidth
            format={formatFIO}
            label={clientCardConst.CLIENT_NAME}
            rules={validateFIO}
            InputProps={{
              endAdornment: nameValue && (
                <InputAdornment position="end">
                  <CancelRoundedIcon onClick={() => onClear('name')} style={{ cursor: 'pointer' }} />
                </InputAdornment>
              )
            }}
          />
          <ControlledTextField
            name="passport"
            control={control}
            fullWidth
            label={IdentifyClientConstants.PASSPORT_NUMBER}
            rules={validatePassport}
            format={formatPassportNumber}
            unformat={unformatPassport}
            InputProps={{
              endAdornment: passportValue && (
                <InputAdornment position="end">
                  <CancelRoundedIcon onClick={() => onClear('passport')} style={{ cursor: 'pointer' }} />
                </InputAdornment>
              )
            }}
          />
          <Box sx={{ paddingBottom: 2, width: '100%' }}>
            <ControlledDatePicker
              name="date"
              control={control}
              setError={setError}
              label={clientCardConst.BIRTH_DATE}
              sx={{ width: '100%' }}
            />
          </Box>
          <Button fullWidth type="submit" variant="contained" size="large" disabled={!isDisabled}>
            {IdentifyClientConstants.CONTINUE}
          </Button>
        </Stack>
      </form>
    </TitledContainer>
  );
};
