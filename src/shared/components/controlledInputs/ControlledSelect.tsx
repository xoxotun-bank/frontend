import React, { FC, useId } from 'react';
import { Control, useController } from 'react-hook-form';

import { FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';

interface Props extends Omit<SelectProps, 'name'> {
  name: string;
  control: Control<any>;
  options: string[];
}

export const ControlledSelect: FC<Props> = ({ name, control, options, ...selectProps }) => {
  const keyBase = useId();
  const { field } = useController({
    name,
    control
  });
  return (
    <FormControl fullWidth>
      <InputLabel>{selectProps.label}</InputLabel>
      <Select {...field} {...selectProps}>
        {options.map((option, i) => (
          <MenuItem key={`${keyBase}-${i}-${option}`} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
