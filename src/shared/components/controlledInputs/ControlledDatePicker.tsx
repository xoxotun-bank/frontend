import React, { FC } from 'react';
import { Control, FieldValues, useController, UseFormSetError } from 'react-hook-form';

import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { ValidationConst } from 'src/shared/constants';

interface Props<T extends FieldValues> extends Omit<DatePickerProps<dayjs.Dayjs, boolean>, 'name'> {
  name: string;
  control: Control<T>;
  setError: UseFormSetError<T>;
}

export const ControlledDatePicker: FC<Props<any>> = ({ name, control, setError, ...datePickerProps }) => {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control
  });

  const maxDate = dayjs().subtract(14, 'year');

  const shouldDisableDate = (date: dayjs.Dayjs) => date.isAfter(maxDate);

  const handleChange = (date: dayjs.Dayjs | null) => {
    if (!date) return setError(name, { type: 'manual', message: ValidationConst.REQUIRED_FIELD });
    field.onChange(date);
    if (date && shouldDisableDate(date)) setError(name, { type: 'manual', message: ValidationConst.TOO_YOUNG });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <DatePicker
        {...datePickerProps}
        {...field}
        onChange={handleChange}
        maxDate={maxDate}
        shouldDisableDate={shouldDisableDate}
        slotProps={{
          textField: {
            error: !!error,
            helperText: error?.message
          }
        }}
      />
    </LocalizationProvider>
  );
};
