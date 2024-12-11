import React, { FC } from 'react';
import { Control, useController } from 'react-hook-form';

import { Add } from '@mui/icons-material';
import { Button, ButtonProps } from '@mui/material';

interface Props extends Omit<ButtonProps, 'name'> {
  name: string;
  control: Control<any>;
  label: string;
}

export const ControlledCheckboxButton: FC<Props> = ({ name, control, label, ...buttonProps }) => {
  const { field } = useController({
    name,
    control
  });

  const buttonColor = () => (field.value ? 'primary' : 'secondary');
  const buttonIcon = () => (field.value ? '' : <Add />);

  return (
    <Button
      {...field}
      {...buttonProps}
      onClick={() => field.onChange(!field.value)}
      color={buttonColor()}
      startIcon={buttonIcon()}
    >
      {label}
    </Button>
  );
};
