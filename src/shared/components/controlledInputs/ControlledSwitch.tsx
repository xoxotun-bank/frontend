import React, { FC } from 'react';
import { Control, useController } from 'react-hook-form';

import { FormControlLabel, Switch, SwitchProps } from '@mui/material';

interface Props extends Omit<SwitchProps, 'name'> {
  name: string;
  control: Control<any>;
  label?: string;
}

export const ControlledSwitch: FC<Props> = ({ name, control, label, ...switchProps }) => {
  const { field } = useController({
    name,
    control
  });
  return <FormControlLabel label={label} control={<Switch {...field} {...switchProps} checked={field.value} />} />;
};
