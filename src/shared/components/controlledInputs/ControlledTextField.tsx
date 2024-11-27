import React, { ChangeEvent, FC } from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';

import { Box, TextField, TextFieldProps } from '@mui/material';

interface Props extends Omit<TextFieldProps, 'name'> {
  name: string;
  control: Control<any>;
  format?: (value: any) => string;
  unformat?: (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => any;
  icon?: React.JSX.Element;
  rules?: RegisterOptions;
}

export const ControlledTextField: FC<Props> = ({
  name,
  control,
  format = (value) => value,
  unformat = (value) => value,
  rules,
  ...textFieldProps
}) => {
  const {
    field: { onChange, value, onBlur },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules
  });

  return (
    <TextField
      {...textFieldProps}
      value={format(value)}
      onChange={(event) => onChange(unformat(event))}
      onBlur={onBlur}
      error={!!error}
      helperText={<Box minHeight="1.5em">{error?.message}</Box>}
      InputProps={textFieldProps.InputProps}
    />
  );
};
